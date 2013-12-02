var capture = (function() {
    function TableRowIterator( el ) {
        if ( typeof el === 'undefined' ) throw new Error('You must provide a table element');
    }

    // export public api
    return {
        TableRowIterator: TableRowIterator
    };
})();