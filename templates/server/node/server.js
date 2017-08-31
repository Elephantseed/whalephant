const PORT = 8080,
  chalk = require("chalk"),
  express = require("express"),
  fs = require("fs"),
  log = console.log,
  morgan = require("morgan"),
  path = require("path"),
  server = express(),
  spdy = require('spdy');

require("./browsersync.init");

// var httpLog = morgan({
//   "format": "default",
//   "stream": {
//     write: function(str) { log.debug(str); }
//   }
// });

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {flags: 'a'});

// setup the logger
server.use(morgan('combined', accessLogStream));

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

const options = {
  // Private key
  key: fs.readFileSync(path.join(__dirname + '/certs/docker.nginx.node.com.key')),

  // Fullchain file or cert file (prefer the former)
  cert: fs.readFileSync(path.join(__dirname + '/certs/docker.nginx.node.com.crt')),

  // **optional** SPDY-specific options
  spdy: {
    protocols: ['h2', 'spdy/3.1', 'http/1.1'],
    plain: false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    'x-forwarded-for': true,

    connection: {
      windowSize: 1024 * 1024, // Server's window size

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: false
    }
  }
};

const express_spdy = spdy.createServer(options, server);
express_spdy.listen(PORT, (error) => {
    if (error) {
      log(chalk.magenta("(づ ￣ ³￣)づ ") +
        chalk.red(error));
      return process.exit(1)
    } else {
      log(chalk.magenta("(づ ￣ ³￣)づ ") +
        chalk.blue(`Node server listening on *:${PORT}`));
    }
  });


