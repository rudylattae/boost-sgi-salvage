BOOST! SGI Salvage
===================

Simplify the process of looking at items on auction at SGI Salvage.

I like checking out the SGI Salvage website a lot. Sometimes I feel it is a bit unwieldy to navigate. I don't have 
access to the source so I cannot improve it from the server side. This is my attempt to streamline the user experience 
on the client side (in the browser).


Features
---------

- [ ] Visual and informative item list right on the front page
- [ ] Local "catalogue" of the items listed on the website
- [ ] "Star" items you are interested in so you can keep an eye on them
- [ ] Fast access to the items you have starred for instant review
- [ ] Flow mode, for an album-like, big-picture view of items
- [ ] Quickly see additional details of your starred items
- [ ] Streamlined VIN lookup for vehicles


Usage
-------

If you wish to give this a try. There is an early preview version (a proof of concept/functional prototype or minimum 
viable product if you will). It is implemented as a Javascript bookmarklet.

Drag the link below to your browser bookmarks bar.


Releases
---------

### v 0.0.1-a   Nov 26 2013

[BOOST! SGI Salvage](javascript:(function()%7Bjavascript%3A(function()%7Bdocument.body.appendChild(document.createElement('script')).src%3D'http%3A%2F%2Frawgithub.com%2Frudylattae%2Fboost-sgi-salvage%2F0.0.1-a%2FboostSgiSalvage.js'%3B%7D)()%7D)())

- First public alpha.
- Display primary images of items on the main screen


Technical
------------

This project aims to augment the existing functionality and data that is available on the website. The 
idea is that it merely get's injected into the page rendered by the site. After that, it's all Javascript and ajaxy 
goodness! 

Because on of the above, it is heavily dependent on:

- the data and table structure presented by the website
- additional services provided by SGI (e.g. VIN lookup)

It also leverages the `jQuery` library used by the site. 


Development
------------

If you like dancing on the cutting edge, you may use the bookmarklet below. Be-warned, it's more likely to be 
broken more times than a released version.

[BOOST! SGI Salvage - dev](javascript:(function()%7Bjavascript%3A(function()%7Bdocument.body.appendChild(document.createElement('script')).src%3D'http%3A%2F%2Frawgithub.com%2Frudylattae%2Fboost-sgi-salvage%2Fmaster%2FboostSgiSalvage.js'%3B%7D)()%7D)())
