jasmine.getFixtures().fixturesPath = 'spec/fixtures';

describe('TableRowIterator', function() {

    describe('initializing', function() {

        it('requires a table element', function() {
            function createWithoutDomNode() {
                return new capture.TableRowIterator();
            }

            expect( createWithoutDomNode ).toThrow("You must provide a table element");
        });

        it('initializes with table element', function() {
            var rows = new capture.TableRowIterator({});

            expect( rows ).not.toEqual( null );
        });

    });

    describe('iterating', function() {

        var rows;

        beforeEach(function() {
            loadFixtures('bid_items.html');
            rows = new capture.TableRowIterator($('#bid_items'));
        });

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
            rows.next();
            rows.next();
            rows.next();
            rows.next();
            rows.next();
            rows.next();
            expect( rows.hasNext() ).toEqual( false );
        });


        it('#next, throws and exception if there are no more items remaining', function() {
            function callNext( times ) {
                var i = 0;
                return function() {
                    for (; i <= times; i++) {
                        rows.next();
                    }
                }
            }

            expect( callNext(7) ).toThrow('StopIteration');
        });
    });
});