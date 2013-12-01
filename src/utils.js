/** 
 Utilities
 */

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

