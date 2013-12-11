
// define public api
var api = {
    core: core,
    utils: utils,
    models: models,
    main: main
};

if (typeof root[name] === "undefined") {
    root[name] = api;
}