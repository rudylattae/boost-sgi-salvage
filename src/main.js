var main = (function($) {
    "use strict";

    var repo,                       // "singleton" stash of all repos
        bidItemsDataSource,         // "singleton" stash of datasources
        bidItemsImporter;           // "singleton" stash of datasources




    function getItemSummariesFromTable( table ) {

        table.find('tbody tr').each(function(i, tableRow) { 
            // if (i >= 4) return;  // throttle for quick testing
            var summary = getItemSummaryFromRow( tableRow );
            items.save(summary);
            // updateItemRowWithThumbnail( tableRow, summary );
        });

    }


    function getItemSummaryFromRow( row ) {
        var rawUrl = $('td a', row).eq(1).attr('href'),
            detailsUrl = parseUrl(rawUrl),
            id = detailsUrl.params.stock_num;

        return {
            id: id,
            store: detailsUrl.params.store,
            detailsUrl: detailsUrl
        };
    }


    function updateItemRowWithThumbnail( row, summary ) {

        $.get(summary.detailsUrl, function( data ){
            var srcImage = $('img[name="image1"]', data),
                a = $('<a class="thumb" target="_blank"></a>')
                            .attr('href', summary.detailsUrl),
                img = $('<img alt="loading..."/>')
                            .attr('src', srcImage[0].src)
                            .attr('width', 245)
                            .appendTo(a);

            $('.js-controls', row).append(a);
        });
    }

    function mainOld() {
        var t = $('#bid_items');
        preparetableForThumbnails( t );
        getItemSummariesFromTable( t );
    }


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

        betterBidItems.init();
    }


    return { 
        main: main,
        createRepo: createRepo,
        getRepo: getRepo
    };

})(jQuery);

