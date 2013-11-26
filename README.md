BOOST! SGI Salvage
===================

Simplify the process of looking at items on auction at SGI Salvage.

I like checking out the SGI Salvage website a lot. Sometimes I feel it is a bit unwieldy to navigate. I don't have 
access to the source so I cannot improve it from the server side. This is my attempt to streamline the user experience 
on the client side (in the browser).


Features
---------

- [ ] Local "catalogue" of the items listed on the website
- [ ] "Star" items you are interested in so you can keep an eye on them
- [ ] Fast access to the items you have starred for instant review
- [ ] Flow mode, for an album-like, big-picture view of items
- [ ] Quickly see additional details of your starred items
- [ ] Streamlined VIN lookup for vehicles


Technical
------------

This project aims to augment the existing functionality and data that is available on the website. The 
idea is that it merely get's injected into the page rendered by the site. After that, it's all Javascript and ajaxy 
goodness! 

Because on of the above, it is heavily dependent on:

# the data and table structure presented by the website
# additional services provided by SGI (e.g. VIN lookup)

It also leverages the `jQuery` library used by the site. 


Development
------------

Get to specs asap.