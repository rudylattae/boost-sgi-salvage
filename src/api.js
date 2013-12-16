
// define public api
var api = {
    core: core,
    utils: utils,
    models: models,
    betterBidItems: betterBidItems,
    main: main
};

if (typeof root[name] === "undefined") {
    root[name] = api;
}