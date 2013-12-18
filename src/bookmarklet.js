(function($){

    // dev
    var js = 'http://localhost:7357/dist/boost-sgi-salvage.v0.0.2-dev.js',
        css = 'http://localhost:7357/dist/boost-sgi-salvage.css';
        
    // live
    // var js = 'https://rawgithub.com/rudylattae/boost-sgi-salvage/master/boostSgiSalvage.js'
    //     css = '';

    main();

    function main() {
        if ( !isAvailable( js ) ) {
            toast(js, css, ready);
        } else {
            ready();
        }
    }

    function ready() {
        boostSgiSalvage.main.main();
    }

    function isAvailable( url ) {
        if ( /\.css[^\.]*$/.test( url ) )
            return linkExists( url );
        else 
            return scriptExists( url );
    }

    function linkExists( url ) {
        var els = document.getElementsByTagName('link');
        return hasElementWithAttributeValue(els, 'href', url);
    }

    function scriptExists( url ) {
        var els = document.getElementsByTagName('script');
        return hasElementWithAttributeValue(els, 'src', url);
    }

    function hasElementWithAttributeValue( elements, attr, value ) {
        if ( elements && elements.length > 0 ) {
            for(var i=0, max=elements.length; i<max; i++) {
                if ( elements[i][attr] == value ) {
                    return true;
                }
            }
        }
        return false;
    }

    /*
        toast, the simple resource loader

        Version     : 1.0.0
        Author      : Aurélien Delogu (dev@dreamysource.fr)
        Homepage    : https://github.com/pyrsmk/toast
        License     : MIT
    */
    function toast(){var e=document,t=e.getElementsByTagName("head")[0],n=this.setTimeout,r="createElement",i="appendChild",s="addEventListener",o="onreadystatechange",u="styleSheet",a=10,f=0,l=function(){--f},c,h=function(e,r,i,s){if(!t)n(function(){h(e)},a);else if(e.length){c=-1;while(i=e[++c]){if((s=typeof i)=="function"){r=function(){return i(),!0};break}if(s=="string")p(i);else if(i.pop){p(i[0]),r=i[1];break}}d(r,Array.prototype.slice.call(e,c+1))}},p=function(n,s){++f,/\.css[^\.]*$/.test(n)?(s=e[r]("link"),s.rel=u,s.href=n,t[i](s),v(s)):(s=e[r]("script"),s.src=n,t[i](s),s[o]===null?s[o]=m:s.onload=l)},d=function(e,t){if(!f)if(!e||e()){h(t);return}n(function(){d(e,t)},a)},v=function(e){if(e.sheet||e[u]){l();return}n(function(){v(e)},a)},m=function(){/ded|co/.test(this.readyState)&&l()};h(arguments)};

})(jQuery);