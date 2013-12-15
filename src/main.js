var main = (function($) {
    "use strict";


    function preparetableForThumbnails( table ) {
        table.find('thead tr').prepend('<th class="header">&nbsp;</th>');
        table.find('tbody tr').each(function(i, row) {
            var me = $(row);
            if ( me.find('.thumb').length === 0 ) {
                me.prepend('<td class="js-controls"></td>');            
            }
        });
    }

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
        return new core.GenericRepository( depot(namespace, options), models.Item );
    }

    function main() {
        var dataSource = new core.TableRowIterator($('#bid_items'), console),
            repo = createRepo('boostSgiSalvage_items', {idAttribute:'stockNumber'}),
            importer = new core.ItemSummaryImporter( dataSource, repo );

        importer.run();

        var repo = importer._repo,
            item = repo.get('M132238'),
            item2 = repo.get('N101636');

        console.log(item.detailUrl());
        console.log(item2.detailUrl());
    }


    return { 
        main: main,
        createRepo: createRepo
    };

})(jQuery);

