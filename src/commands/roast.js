const BaseCommand = require("../base/command");

class Command extends BaseCommand {
    static name = "roast";
    static aliases = [];
    static description = "Roast someone or yourself";
    static path = __filename;
    static permissions = [];

    static run({ client, message, args }) {
        console.log("ayaya");
    }
}

module.exports = Command;
