const BaseCommand = require("../base/command");
const { MessageEmbed } = require("discord.js");

class Command extends BaseCommand {
    static name = "help";
    static aliases = [];
    static description = "Get a list of all available commands.";
    static path = __filename;
    static permissions = [];

    static run({ client, message }) {
        const embed = new MessageEmbed()
            .setColor("#32a852")
            .setTitle("Available Commands")
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }));

        client.commands.cache.forEach((command) => {
            let permissions = command.permissions.length ? command.permissions : "none";
            let aliases = command.aliases.length ? command.aliases : "none";

            let meta = [
                "```",
                `Aliases : ${aliases}`,
                `Required Permissions : ${permissions}`,
                `GuildOnly : ${command.isGuildOnly}`,
                `Enabled : ${command.isEnabled}`,
                `Description : ${command.description}`,
                "```",
            ];

            embed.addField(command.name, meta.join("\n"));
        });

        message.channel.send(embed);
    }
}

module.exports = Command;
