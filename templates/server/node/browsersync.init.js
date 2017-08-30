const BS_PORT = 7000,
    PORT = 8080,
    bs = require("browser-sync").create(),
    reload = require("./reload");

bs.init(null, {
    "proxy": `http://whalephant.com:${PORT}`,
    "browser": "google chrome",
    "open": "local",
    "port": BS_PORT,
    "https": {
        "key": "server/nginx/certs/whalephant.key",
        "cert": "server/nginx/certs/whalephant.crt"
    },
    "watchOptions": {
        "ignoreInitial": true
    },
    "files": [
        "app/index.html",
        "app/stylesheets/*.css",
        {
            "match": ["app/components"],
            "fn": (event, file) => {
                // TODO improve the number of files reloaded
                // making it smarter and using aritmetic jspm
                reload.app(event, file).then(() => bs.reload());
            }
        },
        {
            "match": ["app/stylesheets/**/*.scss"],
            "fn": (event, file) => {
                reload.css(event, file);
            }
        }
    ]
});
