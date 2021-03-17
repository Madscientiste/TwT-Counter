const BaseCommand = require("../base/command");
const { MessageEmbed } = require("discord.js");

class Command extends BaseCommand {
    static name = "about";
    static aliases = [];
    static description = "Information about this bot";
    static path = __filename;
    static permissions = [];

    static run({ client, message, args }) {
        const embed = new MessageEmbed()
            .setColor("#46b1e3")
            .setTitle("Informations")
            .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
            .setFooter(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setDescription(`This bot is made randomly on a random idea that got randomly applied`)
            .addField("Github", "https://github.com/Madscientiste/TwT-Counter")
            .addField("Twitter", "https://twitter.com/njustn0")
            .addField("Discord", "https://discord.gg/mJVB5xE");

        message.channel.send(embed);
    }
}

module.exports = Command;
