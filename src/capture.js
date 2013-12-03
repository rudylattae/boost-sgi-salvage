var capture = (function() {
    function TableRowIterator( el ) {
        if ( typeof el === 'undefined' ) throw new Error('You must provide a table element');
        this._el = el;
        this._cursor = 1;
        this._columns = ['year', 'make', 'model', 'branch', 'location', 'stockNumber', 
                            'closingDate', 'reservePrice'];
    }

    TableRowIterator.prototype.hasNext = function hasNext() {
        return this._currentRow() ? this._currentRow().length > 0 : false;
    };

    TableRowIterator.prototype.next = function next() {
        if ( !this.hasNext() ) throw new Error('StopIteration');

        var data = this._serializeRowData(this._currentRow());
        this._cursor = this._cursor + 1;
        return data;
    };

    TableRowIterator.prototype._currentRow = function() {
        return this._el.find('tr:eq(' + this._cursor + ')');
    };

    TableRowIterator.prototype._serializeRowData = function( row ) {
        var serialized = {},
            cells = row.find('td'),
            i = 0,
            max = this._columns.length;

        for (; i < max; i++) {
            serialized[this._columns[i]] = cells[i].innerText
        }
        return serialized;
    };

    // export public api
    return {
        TableRowIterator: TableRowIterator
    };
})();