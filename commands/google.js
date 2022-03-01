const Discord = require("discord.js");
const config = require("./../config.json");

module.exports.run = (bot, message) => {
    message.channel.send({
        embed: {
            color: 0xff2727,
            description: ⚠️ ${message.author.username}, You didn't give me anything to search. {.google \input`},
        }
    });

    google.resultsPerPage = 5;
    google(suffix, function (err, res) {
    if (err) message.channel.send({
        embed: {
            color: 0xff2727,
            description: warning ${message.author.username}, ${err},
            footer: {
                text: 'API Lantancy is ' + ${Date.now() - message.createdTimestamp} + ' ms',
            }
        }
    });
    for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        if (!link.href) {
            res.next;
        } else {
            let embed = new Discord.RichEmbed()
                .setColor(#ffffff)
                .setAuthor(Result for "${suffix}", )
                .setDescription(Link: [${link.title}](${link.href})\nDescription:\n${link.description})
                .setTimestamp()
                .setFooter('API Lantancy is ' + ${Date.now() - message.createdTimestamp} + ' ms', message.author.displayAvatarURL);
            return message.channel.send({
                embed: embed
            });
        } return message.react("ok_hand");
    }
}
module.exports.help = {
    name: "google",
    name2: "g",
    category: 6,
    perm: 1,
    description: "Google something",
}
