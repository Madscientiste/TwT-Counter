class BaseCommand {
    static name = null;
    static aliases = [];
    static description = null;
    static usage = [];
    static examples = [];

    //
    static isGuildOnly = true;
    static isEnabled = true;
    static isHidden = false;
    static isAdmin = false;
    static isMod = false;

    static run() {}
}

module.exports = BaseCommand;
