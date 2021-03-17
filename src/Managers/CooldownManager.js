const { Collection } = require("discord.js");

class CooldownManager {
    constructor() {
        this.cache = new Collection();
    }

    getTimestamps(command) {
        return this.cache.get(command.name);
    }

    setTimestamps(command) {
        return this.cache.set(command.name, new Collection());
    }

    timestamps(command) {
        let hasCommand = this.cache.has(command.name, new Collection());

        if (hasCommand) {
            return this.getTimestamps(command);
        } else {
            return this.setTimestamps(command);
        }
    }

    add(command, userID) {
        const isOnCooldown = this.check(command, userID);
        if (isOnCooldown) return isOnCooldown;

        const currTime = Date.now();
        const timestamps = this.cache.get(command.name);
        const commandCooldown = command.cooldown * 1000;
        
        timestamps.set(userID, currTime);

        setTimeout(() => {
            timestamps.delete(userID);
        }, commandCooldown);
    }

    check(command, userID) {
        const timestamps = this.timestamps(command);
        const currTime = Date.now();
        const commandCooldown = command.cooldown * 1000;

        let expireTime = timestamps.get(userID);
        if (!expireTime) return false;

        expireTime += commandCooldown;

        if (currTime < expireTime) {
            const timeLeft = (expireTime - currTime) / 1000;
            return timeLeft;
        }
    }
}

module.exports = CooldownManager;
