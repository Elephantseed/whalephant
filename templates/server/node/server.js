const PORT = 8080,
  chalk = require("chalk"),
  express = require("express"),
  log = console.log,
  morgan = require("morgan"),
  path = require("path"),
  server = express(),
  spdyFactory = require('./spdyFactory');


require("./browsersync.init");

// setup the logger
server.use(morgan('combined'));

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

expressSPDY.listen(PORT, (error) => {
  if (error) {
    log(chalk.magenta("(づ ￣ ³￣)づ ") +
      chalk.red(error));
    return process.exit(1)
  } else {
    log(chalk.magenta("(づ ￣ ³￣)づ ") +
      chalk.blue(`Node server listening on *:${PORT}`));
  }
});
