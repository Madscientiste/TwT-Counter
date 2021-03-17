module.exports = (client) => {
    let servers = client.guilds.cache.size;
    client.user.setPresence({ activity: { name: `Onichan Simulator`, type: 0 }, status: "online" });

    logger.info(`Logged in as ${client.user.tag}, watching ${servers} server.`);
};
