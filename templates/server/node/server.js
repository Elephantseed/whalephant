const PORT = 8080,
    express = require("express"),
    logger = require("./logger"),
    morgan = require("morgan"),
    path = require("path"),
    server = express(),
    spdyFactory = require("./spdyFactory");


require("./browsersync.init");

// setup the logger
server.use(morgan("combined"));

server.use(express.static(
  path.join(__dirname, "../../app"))
);
server.use(express.static(
  path.join(__dirname, "../../app/jspm_packages/github"))
);
server.use(express.static(
  path.join(__dirname, "../../app/jspm_packages/npm"))
);

server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../app/index.html"));
});

const expressSPDY = spdyFactory.get(server);

// server.listen(PORT);

expressSPDY.listen(PORT, (error) => {
    if (error) {
        logger.error(error);
        return process.exit(1);
    } else {
        logger.info(`Node server listening to port ${PORT}`);
    }
});
