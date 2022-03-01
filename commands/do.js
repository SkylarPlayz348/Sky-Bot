const Discord = require("discord.js");
const config = require("./../config.json");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args, connection) => {
    let yeahIChangedTheVariableSoThisIsNotStolenLol = args.join(" ");
    //let guild = client.guilds.get('serverID');
    //let member = guild.member(message.author);
    //let nickname = member ? member.displayName : null;
    if(yeahIChangedTheVariableSoThisIsNotStolenLol.length < 1) return message.channel.send("Please specify a message.").then(msg => msg.delete({timeout: 5000}));
    message.channel.send('*' + yeahIChangedTheVariableSoThisIsNotStolenLol + '*').then(msg => { // Send the message to the channel the command is entered in.
    });
};

module.exports.help = {
    name: "do", // The primary command name.
    category: 1, // The category for the command. See the below links.
    description: "Makes italics for you", // The command description. This is used in the help command.
}