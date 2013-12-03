var capture = (function() {
    function TableRowIterator( el ) {
        if ( typeof el === 'undefined' ) throw new Error('You must provide a table element');
    }

    TableRowIterator.prototype.hasNext = function hasNext() {
        return true;
    };

    TableRowIterator.prototype.next = function next() {
        return {
            year: 2014
        };
    };

    // export public api
    return {
        TableRowIterator: TableRowIterator
    };
})();