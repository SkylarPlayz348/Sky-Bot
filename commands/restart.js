const Discord = require("discord.js");
const config = require("./../config.json");

module.exports.run = async (bot, message, args, connection) => {
    const token = bot.token;
    message.channel.send(`Restarting...`);
    bot.destroy()
    bot.login(token);
    message.channel.send(`I've restarted.`);
};

module.exports.help = {
    name: "restart",
    category: 4,
    perm: 1,
    description: "Restart the bot",
    whitelistedChannels: [], // A string array of channels IDs to whitelist this command to only execute in.
    blacklistedChannels: [] // A string array of channels IDs to blacklist this command from executing in.
}