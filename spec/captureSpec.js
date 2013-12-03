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

        it('#hasNext returns true when there are still items to process', function() {
            expect( rows.hasNext() ).toEqual( true );
        });

        it('#next starts off with the first row', function() {
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

        xit('#next, second call jumps to second row', function() {
            var expectedItem = {
                year: 2013
            };
            rows.next();

            expect( rows.next() ).toEqual( expectedItem );
        });
    });
});