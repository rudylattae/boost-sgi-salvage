"use strict";

var depot = require('depot');

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

TableRowIterator.prototype._currentRow = function _currentRow() {
    return this._el.find('tr:eq(' + this._cursor + ')');
};

TableRowIterator.prototype._serializeRowData = function _serializeRowData( row ) {
    var serialized = {},
        cells = row.find('td'),
        i = 0,
        max = this._columns.length;

    for (; i < max; i++) {
        serialized[this._columns[i]] = cells[i].innerText
    }
    return serialized;
};


function ItemRepository( localStorageWrapper ) {
    if ( typeof localStorageWrapper === 'undefined' ) throw new Error('You must provide a localStorageWrapper');
    this._ls = localStorageWrapper;
}

ItemRepository.prototype.add = function add( item ) {
    return this._ls.save( item );
};

ItemRepository.prototype.update = function update( item ) {
    return this._ls.update( item );
};

ItemRepository.prototype.remove = function remove( query ) {
    return this._ls.destroy( query );
};

ItemRepository.prototype.find = function find( query ) {
    return this._ls.find( query );
};

ItemRepository.prototype.get = function get( id ) {
    return this._ls.get( id );
};

ItemRepository.prototype.all = function all() {
    return this._ls.all();
};

ItemRepository.prototype.count = function count() {
    return this._ls.size();
};


function createRepo( namespace, options ) {
    return new ItemRepository( depot(namespace, options) );
}

module.exports = {
    TableRowIterator: TableRowIterator,
    createRepo: createRepo
}