const chalk = require("chalk"),
    log = console.log;

const info = function info (message, file) {
    log(chalk`{rgb(190,182,169) [}{blue Whalephant}{rgb(190,182,169) ] }{rgb(0,81,78) %s %s }{magenta %s}`, message, file ? ":" : "", file ? file : "");
};

const error = function error (err) {
    log(chalk`
      {rgb(190,182,169) [}{blue Whalephant}{rgb(190,182,169) ] }{red ${err}}
  `);
};

module.exports = {
    info,
    error
};
