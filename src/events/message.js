let search = /(TwT)/g;
module.exports = async (client, message) => {
    if (message.author.bot || !message.guild) return;

    let userST = await client.store.user(message.author.id, message.guild.id);
    message.author.store = userST;

    if (search.test(message.content)) {
        let all_TwT = message.content.match(search);

        let key = userST._id;
        let value = { $set: { twt_counter: userST.twt_counter + all_TwT.length } };

        await client.store.update(key, value).catch((err) => console.log(err));
    }

    const prefix = process.env.BOT_PREFIX;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command_name = args.shift().toLowerCase();

    logger.info("Running command:", command_name);

    try {
        client.commands.execute(command_name, { client, message, args });
    } catch (error) {
        console.log(error);
    }
};
