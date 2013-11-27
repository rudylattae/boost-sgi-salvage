#!/bin/sh

package_name=boostSgiSalvage

m cat main.js lib/utils.js lib/LocalDB.js -d build/$package_name.js
m min build/$package_name.js
m min bookmarklet.js -d build/$package_name-bookmarklet.js
