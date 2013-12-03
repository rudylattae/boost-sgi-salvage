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
        it('prime', function() {
            loo = readFixtures('spec/fixtures/bid-items.html');
            // loadFixtures('spec/fixtures/bid-items.html');
        });

        it('starts of with the first row', function() {
            poo = readFixtures('spec/fixtures/bid-items.html');
            foo = sandbox(readFixtures('spec/fixtures/bid-items.html'));
            console.log('poo', poo);
            console.log(foo);
            console.log($('#jasmine-fixtures').html());
            console.log($('#bid_items').html());
        });
    });
});