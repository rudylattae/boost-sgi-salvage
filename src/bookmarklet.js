(function(){
    var dev = 'http://localhost:7357/dist/boost-sgi-salvage.v0.0.2-dev.js',
        live = 'https://rawgithub.com/rudylattae/boost-sgi-salvage/master/boostSgiSalvage.js';



    var doc=document,
        head=doc.getElementsByTagName('head')[0];

    function load( url, callback ) {
        var loading = 0,
            i = 0,
            max,
            doneLoading;

        if ( url instanceof Array) {
            max = url.length;
            loading = max;
            doneLoading = getGroupedCallback( callback, loading );
            for (; i < max; i++) {
                if ( !resourceIsAlreadyLoaded( url[i] ) ) loadResource( url[i], doneLoading );
            }
        } else 
            if ( !resourceIsAlreadyLoaded( url ) )  loadResource( url, callback );
    }

    function loadResource( url, callback ) {
        head.appendChild(getResourceLoader( url, callback )());
    }

    function resourceIsAlreadyLoaded( url ) {
        if (/\.css[^\.]*$/.test( url )){
            return linkExists( url );
        } else {
            return scriptExists( url );
        }
    }

    function linkExists( url ) {
        var els = doc.getElementsByTagName('link');
        return hasElementWithAttributeValue(els, 'href', url);
    }

    function scriptExists( url ) {
        var els = doc.getElementsByTagName('script');
        return hasElementWithAttributeValue(els, 'src', url);
    }

    function hasElementWithAttributeValue( elements, attr, value ) {
        console.log('searching: ', attr, value);
        console.table(elements);
        if ( elements && elements.length > 0 ) {
            for(var i=0, max=elements.length; i<max; i++) {
                console.log('found ', value);
                if ( elements[i][attr] == value ) return true;
            }
        }
        return false;
    }

    function getGroupedCallback( callback, loading ) {
        return function groupedCallback() {
            console.log('groupedCallback:before', loading);
            loading = loading - 1;
            if ( loading <= 0 ) callback();
            console.log('groupedCallback:after', loading);
        };
    }

    function getResourceLoader( url, callback ) {
        if (/\.css[^\.]*$/.test( url )){
            return createLinkLoader( url, callback );
        } else {
            return createScriptLoader( url, callback );
        }
    }

    function createScriptLoader( url, callback ) {
        var x = doc.createElement( 'script' );
        x.type = 'text/javascript';
        if ( callback ) trackResourceLoad( x, callback );
        return function fetch() {
            x.src = url;
            return x;
        };
    }

    function createLinkLoader( url, callback ) {
        var x = doc.createElement( 'link' );
        x.type = 'text/css';
        x.rel = 'stylesheet';
        if ( callback ) trackResourceLoad( x, callback );
        return function fetch() {
            x.href = url;
            return x;
        };
    }

    function trackResourceLoad( el, callback ) {
        var loaded = false;
        el.onload = el.onreadystatechange = function () {
            if ((el.readyState && el.readyState !== 'complete' && el.readyState !== 'loaded') || loaded) {
                return false;
            }
            el.onload = el.onreadystatechange = null;
            loaded = true;
            callback();
        };
        el.async = true;
    }
    
    var cb = function(){ console.log('loaded!'); } ,
        s = 'https://gist.github.com/aFarkas/936413/raw/472d2284314dca231b46443513114f47a73ea742/sssl.js',
        c = 'http://www.csszengarden.com/211/211.css?v=8may2013';

    load([c, s], cb);

})();