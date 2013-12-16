var betterBidItems = (function( $ ) {
    "use strict";

    function Actions( el ) {
        var self = $.observable(this),
            b = $('<button class="js-show-thumbnails boost-action">Improve</button>');

        self.init = function() {
            el.append(b);
            el.on('click', '.js-show-thumbnails', function() {
                self.trigger('showThumbnails');
            })
        };
    }


    function ListOfItemsTable( el ) {
        var self = this;

        self.showThumbnails = function() {
            var stockNumberColumn;

            _introduceThumbnailColumn();
            _showThumbnailForEachRow( _findStockNumberColumn() );
        };

        function _introduceThumbnailColumn( ) {
            el.find('thead tr').prepend('<th class="header">&nbsp;</th>');
            el.find('tbody tr').each(function(i, row) {
                var me = $(row);
                if ( me.find('.thumb').length === 0 ) {
                    me.prepend('<td class="js-boosted"></td>');            
                }
            });
        }

        function _findStockNumberColumn() {
            var found = 0;

            el.find('thead tr th').each(function(i, cell) {
                console.log( i, cell.innerText );
                if ( cell.innerText == "Stock Number" ) {
                    found = i;
                    return false;
                }
            });
            return found;
        }

        function _showThumbnailForEachRow( stockNumberColumn ) {
            var thumbUrlTemplate = '/images/salvage_images/{stockNumber}/main/1.jpg',
                thumbnailTemplate = '<a class="thumb" target="_blank"><img alt="loading..." src="{src}" width="245"/></a>';

            el.find('tbody tr').each(function(i, row) {
                var stockNumber = $('td:eq(' + stockNumberColumn + ')', row).text(),
                    thumbUrl = thumbUrlTemplate.replace( '{stockNumber}', stockNumber ),
                    thumbnail = thumbnailTemplate.replace( '{src}', thumbUrl );

                $('.js-boosted', row).append( thumbnail ); 
            });
        }
    }


    function init() {
        var ctrl = new Actions( $('#searchedLocation') ),
            bidItemsTable = new ListOfItemsTable( $('#bid_items') ); 

        ctrl.init();
        ctrl.on('showThumbnails', function() {
            bidItemsTable.showThumbnails();
        })
    }

    return { 
        ListOfItemsTable: ListOfItemsTable,
        init: init
    };
})( jQuery );