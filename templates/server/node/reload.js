const BUILDCSS = "npm run buildcss:nodesass",
    core = require("./core"),
    exec = require("./exec"),
    getBundleCommand = core.getBundleCommand,
    getDistFiles = core.getDistFiles,
    logger = require('./logger'),
    options = {"async": true};

const app = function app (event, file) {
        return new Promise((resolve) => {
            if (event === "change") {
                logger.info(` File event [${event}]`, file);
                getDistFiles()
                    .then((files) =>
                      exec(getBundleCommand(files.length), options))
                    .then(() => resolve());
            } else {
                return resolve();
            }
        });
    }, css = function css () {
        return new Promise(() => exec(BUILDCSS, options));
    };

module.exports = {
    app,
    css
};
