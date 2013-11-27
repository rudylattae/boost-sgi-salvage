BOOST! SGI Salvage
===================

Simplify the process of looking at items on auction at SGI Salvage.

The small idea
---------------

I like checking out the SGI Salvage website a lot. Sometimes I feel it is a bit unwieldy to navigate. I don't have 
access to the source so I cannot improve it from the server side. This is my attempt to streamline the user experience 
on the client side (in the browser).


Features
---------

- See the primary photo of each item on the main page


Usage
-------

If you wish to give this a try. There is an early preview version (a proof of concept/functional prototype or minimum 
viable product if you will). It is implemented as a Javascript bookmarklet.

- create a bookmark in your browser with the release link below 
-- you may name it whatever, but it's a good idea to use "BOOST! SGI Salvage"
- go to the [SGI Salvage website](http://www.sgi.sk.ca/salvage_bid/index.html)
- select the branch you wish to browse and click "Search"
- after the page of available auction items has loaded, click the "BOOST! SGI Salvage" bookmarklet


Releases
---------

### v 0.0.1-a   Nov 26 2013

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://rawgithub.com/rudylattae/boost-sgi-salvage/0.0.1-a/boostSgiSalvage.js';})();
```

- First public alpha.
- Display primary images of items on the main screen


### Cutting edge (in-development and unstable)

If you like dancing on the cutting edge, you may use the bookmarklet below. You should probably call it "BOOST! SGI 
Salvage - dev". Be-warned, it's likely to be broken more times than a released version.

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://rawgithub.com/rudylattae/boost-sgi-salvage/master/boostSgiSalvage.js';})();
```


Environment and Dependencies
------------------------------

This project aims to augment the existing functionality and data that is available on the website. The 
idea is that it merely get's injected into the page rendered by the site. After that, it's all Javascript and ajaxy 
goodness! 

Because on of the above, it is heavily dependent on:

- the data and table structure presented by the website
- additional services provided by SGI (e.g. VIN lookup)

It also leverages the `jQuery` library used by the site. 


Roadmap
---------

Where this thing is headed. 

### In Progress

- Persist data to localStorage to increase responsiveness and reduce server load

### Next / Planned

- Local "catalogue" of the items listed on the website
- "Star" items you are interested in so you can keep an eye on them
- Draft architecture for fetching, stashing and presenting the items
- Design "star" UI + UX
- Design flow UI + UX
- Automate build + minify + package

### Backlog

- Fast access to the items you have starred for instant review
- Flow mode, for an album-like, big-picture view of items
- Quickly see additional details of your starred items
- Streamlined VIN lookup for vehicles



