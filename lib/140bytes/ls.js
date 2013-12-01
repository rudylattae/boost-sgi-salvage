/**
 Wrap localStorage
 REF: https://gist.github.com/jed/966030 OR http://www.140byt.es/keywords/localstorage
 
  // set
  ls('foo', {
  key: 'value'
  });

  // get
  ls('foo'); // => { key: 'value' }
 */
function ls(
  a, // placeholder for storage object
  b  // placeholder for JSON
){
  return b
    ? {                 // if JSON is supported
      get: function(    // provide a getter function
        c               // that takes a key
      ){
        return a[c] &&  // and if the key exists
          b.parse(a[c]) // parses and returns it,
      },
      
      set: function(     // and a setter function
        c,               // that takes a key
        d                // and a value
      ){
        a[c] =           // and sets
          b.stringify(d) // its serialization.
      }
    }
    : {}                 // if JSON isn't supported, provide a shim.
}(
  localStorage // use native localStorage if available
  || {},            // or an object otherwise
  JSON              // use native JSON (required)
)