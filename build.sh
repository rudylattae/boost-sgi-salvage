#!/bin/sh

package_name=boostSgiSalvage

m rm dist/
m cat main.js lib/utils.js lib/LocalDB.js -d build/$package_name.js
m min build/$package_name.js
m min bookmarklet.js -d build/$package_name-bookmarklet.js

m cp build/$package_name.js -d dist/
m cp build/$package_name.min.js -d dist/
m cp build/$package_name-bookmarklet.js -d dist/