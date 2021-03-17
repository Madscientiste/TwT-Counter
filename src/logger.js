// Work In Progress

const chalk = require("chalk");

const isNode = typeof process === "object" && `${process}` === "[object process]";

const log = (...kwargs) => {
    const { format } = require("date-fns");
    console.log(chalk.gray(`[${format(new Date(), "Pp")}]`, "-"), ...kwargs);
};

class Logger {
    constructor(theme) {
        this.theme = {
            error: chalk.hex("#e3574d"),
            warn: chalk.hex("#e3cf4d"),
            debug: chalk.hex("#be4de3"),
            info: chalk.hex("#4d8ce3"),
        };
        if (theme) {
            this.theme = {
                ...this.theme,
                theme,
            };
        }
    }

    handleArgs(...args) {
        let logFilter = (el) => typeof el === "string" && el.split("=")[0] === "cat";
        let logCategory = args.filter(logFilter).shift() ?? "cat=APP";
        let extraction = logCategory.split("=").pop();

        let argsFilter = (el, index) => index !== args.indexOf(logCategory);
        let sanitized = args.filter(argsFilter);

        return { category: extraction, args: sanitized };
    }

    server() {
        let { info, warn, error, debug } = this.theme;

        return {
            log: (...kwargs) => {
                let { args, category } = this.handleArgs(...kwargs);
                let logType = info(`[INFO | ${category}]`, "-");

                log(logType, ...args);
            },

            warn: (...kwargs) => {
                let { args, category } = this.handleArgs(...kwargs);
                let logType = warn(`[WARN | ${category}]`, "-");

                log(logType, ...args);
            },

            debug: (...kwargs) => {
                let { args, category } = this.handleArgs(...kwargs);
                let logType = debug(`[DEBUG | ${category}]`, "-");

                log(logType, ...args);
            },
        };
    }

    info(...args) {
        let logType = isNode ? "server" : "browser";
        let logger = this[logType]();

        logger.log(...args);
    }

    debug(...args) {
        let logType = isNode ? "server" : "browser";
        let logger = this[logType]();

        logger.debug(...args);
    }

    warn(...args) {
        let logType = isNode ? "server" : "browser";
        let logger = this[logType]();

        logger.warn(...args);
    }

    error(...args) {
        let logType = isNode ? "server" : "browser";
        let logger = this[logType]();

        logger.error(...args);
    }
}

module.exports = Logger;
