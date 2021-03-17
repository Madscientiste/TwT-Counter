const BaseCommand = require("../base/command");
const { MessageEmbed } = require("discord.js");

class Command extends BaseCommand {
    static name = "stats";
    static aliases = [];
    static description = "Retrive the self stats, or a mentionned user.";
    static path = __filename;
    static permissions = [];

    static async run({ client, message, args }) {
        let user = message.mentions.users.first() || message.author;
        let userST = await client.store.user(user.id, message.guild.id);

        const embed = new MessageEmbed()
            .setAuthor(`Current stats for ${user.username}`, user.avatarURL({ dynamic: true }))
            .setTitle(`Total TwT : ${userST.twt_counter}`)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            .setColor("#46b1e3");

        message.channel.send(embed);
    }
}

module.exports = Command;
