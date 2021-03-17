const fs = require("fs");
const { Collection } = require("discord.js");

class CommandManager {
    constructor() {
        this.cache = new Collection();
    }

    load(folderPath) {
        const files = fs.readdirSync(folderPath).filter((f) => f.split(".").pop() === "js");

        files.forEach((file) => {
            let module = require(`${folderPath}/${file}`);
            let name = file.split(".").shift();

            this.add(module);
            logger.debug("cat=COMMANDS", "loaded", name, "in cache");
        });
    }

    reload(command) {
        delete require.cache[require.resolve(command.path)];

        command = require(command.path);
        this.cache.set(command.name, command);

        logger.debug("cat=COMMANDS", `[${command.name}]`, "Reloaded");
        return command;
    }

    add(module) {
        const existing = this.cache.get(module.name);
        if (existing) return existing;

        this.cache.set(module.name, module);
    }

    execute(command_name, { client, message, args }) {
        let command = this.cache.get(command_name);
        if (!command) return console.log("command not found, skipped");

        let { isGuildOnly, isEnabled } = command;
        if (!message.guild && isGuildOnly) return console.log("Command is Guild only");
        if (!isEnabled) return console.log("Command is disabled");

        let isOnCooldown = client.cooldowns.check(command, message.author.id);
        if (isOnCooldown) return console.log("User on Cooldown", `${isOnCooldown.toFixed(1)}s`);

        command = this.reload(command);

        command.run({ client, message, args });
        client.cooldowns.add(command, message.author.id);
    }
}

module.exports = CommandManager;
