require("dotenv").config();
const fs = require("fs");
const path = require("path");

const Discord = require("discord.js");
const client = new Discord.Client();

const Logger = require("./src/logger");
global.logger = new Logger();

const CooldownsManager = require("./src/Managers/CooldownManager");
client.cooldowns = new CooldownsManager();

const CommandManager = require("./src/Managers/CommandManager");
client.commands = new CommandManager();

let commandsFolder = path.join(__dirname, "./src/commands");
client.commands.load(commandsFolder);

const store = require("./src/database");
client.store = store;

let eventsFolder = "./src/events";
fs.readdir(eventsFolder, (err, files) => {
    const events = files.filter((f) => f.split(".").pop() === "js");

    events.forEach((file) => {
        let module = require(`${eventsFolder}/${file}`);
        let name = file.split(".").shift();

        client.on(name, module.bind(null, client));
    });

    logger.debug("cat=EVENTS", "loaded", events.length, "events");
});

client.login(process.env.BOT_TOKEN);
