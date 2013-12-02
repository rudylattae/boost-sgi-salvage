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

            expect( rows ).not.toBe( null );
        });

    });

    describe('iterating', function() {

        it('starts of with the first row', function() {
            loadFixtures('spec/fixtures/bid_items.html');
            console.log($('#jasmine-fixtures').html());
            console.log($('#bid_items').html());
            console.log($('#bid-items').html());
        });
    });
});