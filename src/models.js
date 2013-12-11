var models = (function() {
    "use strict";

    var branchNameToCode = {
            'Moose Jaw': 'MJ',
            'North Battleford': 'NB',
            'Regina': 'RE',
            'Saskatoon': 'SA',
            'Yorkton': 'YK'
        },
        basePath = '/lcgi/salvage_bid_site/results_details.cgi?stock_num={stockNumber}&store={branchCode}';


    function Item ( data ) {
        this.data = data;
    }

    Item.prototype.branchCode = function() {
        return branchNameToCode[ this.data.branch ];
    };

    Item.prototype.detailUrl = function() {
        return basePath
                    .replace( '{stockNumber}', this.data.stockNumber )
                    .replace( '{branchCode}', this.branchCode() );
    };

    Item.prototype.toJS = function() {
        return this.data;
    };


    return { Item: Item };
})();