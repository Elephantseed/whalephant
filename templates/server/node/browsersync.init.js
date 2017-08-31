const BS_PORT = 7000,
    PORT = 8080,
    bs = require("browser-sync").create(),
    reload = require("./reload"),
    cache = require("./cache");

bs.init(null, {
    "proxy": `http://docker.nginx.node.com:${PORT}`,
    "browser": "google chrome",
    "open": "local",
    "port": BS_PORT,
    "https": {
        "key": "./server/nginx/certs/docker.nginx.node.com.key",
        "cert": "./server/nginx/certs/docker.nginx.node.com.crt"
    },
    "watchOptions": {
        "ignoreInitial": true
    },
    "files": [
        "./app/index.html",
        "./app/stylesheets/*.css",
        {
            "match": ["./app/components"],
            "fn": (event, file) => {
              if (event === "change") {
                reload.app(event, file).then(() => bs.reload());
              }
            }
        },
        {
            "match": ["./app/stylesheets/**/*.scss"],
            "fn": (event, file) => {
                reload.css(event, file);
            }
        }
    ]
});
