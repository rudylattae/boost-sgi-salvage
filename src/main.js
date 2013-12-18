var main = (function($) {
    "use strict";

    var repo,                       // "singleton" stash of all repos
        bidItemsDataSource,         // "singleton" stash of datasources
        bidItemsImporter;           // "singleton" stash of datasources


    function createRepo( namespace, options ) {
        return new core.GenericRepository( depot(namespace, options), models.itemMapper );
    }

    function getBidItemsDataSource() {
        if ( !bidItemsDataSource ) bidItemsDataSource = new core.TableRowIterator($('#bid_items'), console);
        return bidItemsDataSource;
    }

    function getRepo() {
        if ( !repo ) repo = createRepo('boostSgiSalvage_items', {idAttribute:'stockNumber'});
        return repo;
    }

    function main() {
        // importer = new core.ItemSummaryImporter( dataSource, repo );
        // importer.run();

        ///

        photosAndStars.init();
    }


    return { 
        main: main,
        createRepo: createRepo,
        getRepo: getRepo
    };

})(jQuery);

