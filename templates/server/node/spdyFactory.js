const fs = require("fs"),
    path = require("path"),
    spdy = require("spdy");

const options = {
  // Private key
    "key": fs.readFileSync(path.join(`${__dirname  }/certs/docker.nginx.node.com.key`)),

  // Fullchain file or cert file (prefer the former)
    "cert": fs.readFileSync(path.join(`${__dirname  }/certs/docker.nginx.node.com.crt`)),

  // **optional** SPDY-specific options
    "spdy": {
        "protocols": ["h2", "spdy/3.1", "http/1.1"],
        "plain": false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
        "x-forwarded-for": true,

        "connection": {
            "windowSize": 1024 * 1024,

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
            "autoSpdy31": false
        }
    }
};

const get = function app (server) {
    return spdy.createServer(options, server);
};

module.exports = {
    get
};
