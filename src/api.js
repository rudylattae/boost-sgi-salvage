
// define public api
var api = {
    core: core,
    utils: utils,
    main: main
};

if (typeof root[name] === "undefined") {
    root[name] = api;
}