describe('core.GenericRepository', function() {

    function ItemModel( data ) {}
    ItemModel.prototype.toJS = function toJS() {};

    var simpleMapper = {
        toModel: function toModel( data ) { return new ItemModel( data ); },
        toJS: function toJS( model ) { }
    };


    describe('initializing', function() {

        it('requires a localStorageWrapper', function() {
            function createWithoutLocalStorageWrapper() {
                return new core.GenericRepository();
            }

            expect( createWithoutLocalStorageWrapper ).toThrow('You must provide a localStorageWrapper');
        });

        it('initializes with a localStorageWrapper', function() {
            var repo = new core.GenericRepository({});

            expect( repo ).not.toBe( null );
        });

        it('when initialized with a mapper, checks that it provides two-way conversion', function() {
            function createWithInvalidMapper() {
                return new core.GenericRepository({}, {});
            }

            expect( createWithInvalidMapper ).toThrow('Mapper must implement "toModel" and "toJS"');
        });

        it('initializes with a valid mapper', function() {
            var dummyMapper = {toModel:function(){}, toJS:function(){}};
            var repo = new core.GenericRepository({}, dummyMapper);

            expect( repo ).not.toBe( null );
        });
    });

    describe('working with entities', function() {
        var repo,
            localStorageWrapper,
            records = [
                {stockNumber: 'R123', year: '2014', make: 'HONDA'},
                {stockNumber: 'S234', year: '2013', make: 'NISSAN'},
                {stockNumber: 'Y556', year: '2013', make: 'KIA'},
                {stockNumber: 'M566', year: '2012', make: 'TOYOTA'}
            ];

        beforeEach(function() {
            localStorageWrapper = 
                jasmine.createSpyObj( 'localStorageWrapper', ['save', 'update', 'find', 'get', 'all'] );

            localStorageWrapper.get.andReturn( records[2] );
            localStorageWrapper.find.andReturn( records.slice(1,3) );
            localStorageWrapper.all.andReturn( records );

            repo = new core.GenericRepository( localStorageWrapper );
        });

        it('#get, returns found entity', function() {
            var entity = repo.get('ID');

            expect( entity ).toBe( records[2] );
        });

        it('#find, returns entities matching criteria', function() {
            var entities = repo.find( {some:'criteria'} );

            expect( entities[0] ).toBe( records[1] );
            expect( entities[1] ).toBe( records[2] );
        });

        it('#all, returns all entities', function() {
            var entities = repo.all();

            for (var i=0; i<entities.length; i++) {
                expect( entities[i] ).toBe( records[i] );                
            }
        });

        it('#add, persists the entity', function() {
            var entity = {stockNumber:'Y3534', year:'2014', make: 'AUDI'};

            repo.add( entity );
            
            expect( localStorageWrapper.save ).toHaveBeenCalledWith( entity );
        });

        it('#update, updates record based on the entity', function() {
            var entity = {stockNumber:'S7783', year:'2013', make: 'LEXUS'};

            repo.update( entity );
            
            expect( localStorageWrapper.update ).toHaveBeenCalledWith( entity );
        });
    });

    describe('working with models', function() {
        var repo,
            localStorageWrapper,
            records = [
                {stockNumber: 'R123', year: '2014', make: 'HONDA'},
                {stockNumber: 'S234', year: '2013', make: 'NISSAN'},
                {stockNumber: 'Y556', year: '2013', make: 'KIA'},
                {stockNumber: 'M566', year: '2012', make: 'TOYOTA'}
            ];

        beforeEach(function() {
            localStorageWrapper = 
                jasmine.createSpyObj('localStorageWrapper', ['save', 'update', 'find', 'get', 'all']);

            localStorageWrapper.get.andReturn( records[2] );
            localStorageWrapper.find.andReturn( records.slice(1,3) );
            localStorageWrapper.all.andReturn( records );

            repo = new core.GenericRepository(localStorageWrapper, simpleMapper);

            this.addMatchers({
                toBeAnInstanceOf: function ( expected ) {
                    return this.actual instanceof expected;
                }
            });
        });

        it('#get, returns a model for the entity', function() {
            var item = repo.get('ID');

            expect( item ).toBeAnInstanceOf( ItemModel );
        });

        it('#find, returns models for matching entities', function() {
            var items = repo.find( {some:'criteria'} );

            expect( items[0] ).toBeAnInstanceOf( ItemModel );
            expect( items[1] ).toBeAnInstanceOf( ItemModel );
        });

        it('#all, returns models for all entities', function() {
            var items = repo.all();

            for (var i=0; i<items.length; i++) {
                expect( items[i] ).toBeAnInstanceOf( ItemModel );                
            }
        });

        it('#add, persists the derived entity from the model', function() {
            var data = {stockNumber:'Y3534', year:'2014', make: 'AUDI'},
                model = new ItemModel;
            spyOn(simpleMapper, 'toJS').andReturn( data );

            repo.add( model );
            
            expect( simpleMapper.toJS ).toHaveBeenCalled();
            expect( localStorageWrapper.save ).toHaveBeenCalledWith( data );
        });

        it('#update, updates record based on the derived entity from the model', function() {
            var data = {stockNumber:'S7783', year:'2013', make: 'LEXUS'},
                model = new ItemModel;
            spyOn(simpleMapper, 'toJS').andReturn( data );

            repo.update( model );
            
            expect( simpleMapper.toJS ).toHaveBeenCalled();
            expect( localStorageWrapper.update ).toHaveBeenCalledWith( data );
        });
    });
});
        