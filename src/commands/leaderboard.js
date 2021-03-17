const BaseCommand = require("../base/command");
const { MessageEmbed } = require("discord.js");

class Command extends BaseCommand {
    static name = "leaderboard";
    static aliases = ["ranking", "board"];
    static description = "Sends a ranking board (top 10)";
    static path = __filename;
    static permissions = [];

    static async run({ client, message, args }) {
        let users = await client.store.everyone(message.guild.id);

        users = users.map((store) => ({ ...client.users.cache.get(store.uid), store }));
        users = users.filter((user) => user);
        users = users.sort((a, b) => a.twt_counter - b.twt_counter);

        let currentRank = users.findIndex((user) => user.id === message.author.id);
        let top10 = users.slice(0, 10);

        let leaderboard = [
            "```md",
            "TOP 10 TwTs",
            "=========================",
            ``,
            `${top10.map((user, i) => `${i + 1}. ${user.username} - ${user.store.twt_counter} TwTs`).join("\n")}`,
            ``,
            `Your Current Ranking : #${currentRank + 1}`,
            "=========================",
            "```",
        ];

        const embed = new MessageEmbed()
            .setColor("#46b1e3")
            .setTitle("Top 10 TwTs")
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            .setDescription(leaderboard.join("\n"));

        message.channel.send(embed);
    }
}

module.exports = Command;
