var capture = (function() {
    function TableRowIterator( el ) {
        if ( typeof el === 'undefined' ) throw new Error('You must provide a table element');
        this._el = el;
        this._cursor = 1;
        this._columns = ['year', 'make', 'model', 'branch', 'location', 'stockNumber', 
                            'closingDate', 'reservePrice'];
    }

    TableRowIterator.prototype.hasNext = function hasNext() {
        return true;
    };

    TableRowIterator.prototype.next = function next() {
        var row = this._el.find('tr:eq(' + this._cursor + ')'),
            cells = row.find('td'),
            data = {},
            i = 0,
            max = this._columns.length;

        for (; i < max; i++) {
            data[this._columns[i]] = cells[i].innerText
        }

        this._cursor = this._cursor + 1;
        return data;
    };

    // export public api
    return {
        TableRowIterator: TableRowIterator
    };
})();