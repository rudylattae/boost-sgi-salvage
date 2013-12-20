var photosAndStars = (function( $ ) {
    "use strict";


    var mainPhotoUrlTemplate = '/images/salvage_images/{stockNumber}/main/1.jpg',
        photoAndStarTemplate = 
            '<div class="enhancement--photo-and-star" target="_blank"> \
                <img alt="loading..." src="{src}" width="245"/> \
                <span class="js-star-item" data-stock-number="{stockNumber}" title="Star item #{stockNumber}">&#x02605;</span> \
            </div>';

    function Actions( el ) {
        var self = $.observable(this),
            showPhotosAndStars = $('<button class="boost--enable-feature js-show-photos-and-stars">Show Photos and Stars</button>');

        self.init = function() {
            el
                .append(showPhotosAndStars)
                .on('click', '.js-show-photos-and-stars', function() {
                    self.trigger('showPhotosAndStars');
                });
        };
    }


    function Booster( el ) {
        var self = $.observable(this);

        self.boost = function( enhancement ) {
            init();
            _boostEachRow( _findStockNumberColumn(), enhancement );
        };

        function init( ) {
            if ( el.attr('data-boost-ready') ) return;

            el.find('thead tr').prepend('<th class="header">&nbsp;</th>');
            el.find('tbody tr').each(function(i, row) {
                $(row).prepend('<td class="js-enhancements"></td>'); 
            });

            el.on('click', '.js-star-item', function() {
                console.log(' clicked ', this );
                self.trigger('starItem', $(this).attr('data-stock-number'));
            })

            el.attr('data-boost-ready', true);
        }

        function _boostEachRow( stockNumberColumn, enhancement ) {
            el.find('tbody tr').each(function(i, row) {
                var stockNumber = $('td:eq(' + stockNumberColumn + ')', row).text();
                enhancement.call( self, row, stockNumber );
            });
        }

        function _findStockNumberColumn() {
            var found = 0;

            el.find('thead tr th').each(function(i, cell) {
                if ( cell.innerText == "Stock Number" ) {
                    found = i;
                    return false;
                }
            });
            return found;
        }
    }


    var enhancements = {
        showPhotoAndStar: function showPhotoAndStar( row, stockNumber ) {
            if ( $('.js-enhancements .enhancement--photo-and-star', row).length > 0 ) return;

            var thumbUrl = mainPhotoUrlTemplate.replace( '{stockNumber}', stockNumber ),
                component = $.render( photoAndStarTemplate, { src: thumbUrl, stockNumber: stockNumber } );

            $('.js-enhancements', row).append( component ); 
        }
    };


    function init() {
        var ctrl = new Actions( $('#searchedLocation') ),
            booster = new Booster( $('#bid_items') ); 

        ctrl.init();
        ctrl.on('showPhotosAndStars', function() {
            booster.boost( enhancements.showPhotoAndStar );
        });

        booster.on('starItem', function( eh ) {
            console.log( 'starred!', eh );
        })
    }

    return { 
        Actions: Actions,
        Booster: Booster,
        enhancements: enhancements,
        init: init
    };
})( jQuery );