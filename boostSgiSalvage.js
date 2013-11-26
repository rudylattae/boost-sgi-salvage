function preparetableForThumbnails( table ) {
    table.find('thead tr').prepend('<th class="header">&nbsp;</th>');
    table.find('tbody tr').each(function(i, row) {
        var me = $(row);
        if ( me.find('.thumb').length == 0 ) {
            me.prepend('<td class="js-controls"></td>');            
        }
    });
}

function getItemSummariesFromTable( table ) {
    var itemSummaries = {};

    table.find('tbody tr').each(function(i, tableRow) { 
        if (i >= 30) return;
        var summary = getItemSummaryFromRow( tableRow );
        updateItemRowWithThumbnail( tableRow, summary );
        itemSummaries[summary.id] = summary;
    });

    return itemSummaries;
}


function getItemSummaryFromRow( row ) {
    var rawUrl = $('td a', row).eq(1).attr('href'),
        detailsUrl = parseUrl(rawUrl),
        id = detailsUrl.params.stock_num

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


var t = $('#bid_items');
preparetableForThumbnails( t );
var items = getItemSummariesFromTable( t );


// ====================
// Utilities
// ====================

// REF: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function splitUrlParams(queryPart) {
    if (typeof a === undefined ) return {};

    queryPart = queryPart.split('?') ? queryPart.split('?')[1] : queryPart;

    var a = queryPart.split('&'),
        b = {},
        i = 0;
        limit = a.length;

    for (; i < limit; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

// REF: http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
function parseUrl(url) {
    var result = {},
        anchor = document.createElement('a'),
        keys = 'protocol hostname host pathname port search hash href'.split(' ');

    anchor.href = url;
    for (k in keys) {
        var me = keys[k]; 
        result[me] = anchor[me];
    }

    result.toString = function() { return anchor.href; };
    result.requestUri = result.pathname + result.search;
    result.params = splitUrlParams( result.search );
    return result;
};