jasmine.getFixtures().fixturesPath = 'spec/fixtures';

describe('core.TableRowIterator', function() {

    describe('initializing', function() {

        it('requires a table element', function() {
            function createWithoutDomNode() {
                return new core.TableRowIterator();
            }

            expect( createWithoutDomNode ).toThrow('You must provide a table element');
        });

        it('initializes with table element', function() {
            var rows = new core.TableRowIterator({});

            expect( rows ).not.toEqual( null );
        });

        it('logs a warning to the logger if no rows detected in table element', function() {
            var emptyTable = sandbox().append('<table></table>').find('table'),
                logger = jasmine.createSpyObj('logger', ['log', 'warn']),
                rows = new core.TableRowIterator(emptyTable, logger);

            expect( logger.warn ).toHaveBeenCalledWith('The provided table does not have any rows');
        });
    });

    describe('iterating', function() {

        var rows;
        beforeEach(function() {
            loadFixtures('bid_items.html');
            rows = new core.TableRowIterator($('#bid_items'));
        });

        function callNext( times ) {
            var i = 1;
            return function() {
                for (; i <= times; i++) {
                    rows.next();
                }
            }
        }


        it('#hasNext, returns true when there are still items to process', function() {
            expect( rows.hasNext() ).toEqual( true );
        });

        it('#next, first call serializes first row', function() {
            var expectedItem =  {
                year : '2014', 
                make : 'TRAILERS ENCLOSED', 
                model : 'STEALTH ENCLOSED TRAILER', 
                branch : 'Regina',
                location: 'SREASTFENCE',
                stockNumber: 'R136465',
                closingDate: 'Dec 04 2013',
                reservePrice: '$3,650.00'
            };
            expect( rows.next() ).toEqual( expectedItem );
        });

        it('#next, second call serializes second row', function() {
            var expectedItemData = {
                year: '2013',
                make: 'HONDA',
                stockNumber: 'M132302'
            };
            rows.next();

            var actualItem = rows.next();

            expect( actualItem.stockNumber ).toEqual( expectedItemData.stockNumber );
            expect( actualItem.year ).toEqual( expectedItemData.year );
            expect( actualItem.make ).toEqual( expectedItemData.make );
        });


        it('#hasNext, returns false when there are no more items to process', function() {
            // go to sixth (last) row
            callNext(6)();
            expect( rows.hasNext() ).toEqual( false );
        });


        it('#next, throws and exception if there are no more items remaining', function() {
            expect( callNext(7) ).toThrow('StopIteration');
        });


        it('#reset, sets cursor back to beginning', function() {
            // go to sixth (last) row
            callNext(6)();

            rows.reset();
            var firstItem = rows.next();
            expect( rows.hasNext() ).toEqual( true );
            expect( firstItem.stockNumber ).toEqual( 'R136465' );
        });
    });
});