
// define public api
var api = {
    core: core,
    utils: utils,
    models: models,
    photosAndStars: photosAndStars,
    main: main
};

if (typeof root[name] === "undefined") {
    root[name] = api;
}