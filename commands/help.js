const Discord = require("discord.js");
const config = require("./../config.json");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args, connection) => {
    let daPrefixo = config["Common"].prefix[0];
    var slide = 1;
    const embed = new Discord.MessageEmbed()
        .setColor(config["Common"].feature_color)
        .setTitle(`${bot.user.username} Help - Page 1`)
        .setThumbnail(bot.user.avatarURL({dynamic: true}))
        .setDescription(`${bot.user.username} is here to help you with whatever possible.\n**Name:** ${bot.user.tag}\n**Creation Date:** ${bot.user.createdAt.toLocaleString()}\n*Use the reactions below to go through commands.*`)
        .addFields(
            {name: `About ${message.guild.name}`, value: `${config["utility_module"].about}.`},
        )
        .setFooter(`Requested by ${message.author.username} | ${config["Common"].copyright}`, message.author.avatarURL());
    message.channel.send(embed).then(msg => {
        msg.react('⏪')
            .then(() => msg.react('⬅️'))
            .then(() => msg.react('➡️'))
            .then(() => msg.react('⏩'));

        const filterE = (reaction, user) => {
            return ['⬅️', '➡️', '⏪', '⏩'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        const collector = msg.createReactionCollector(filterE, {time: ms("1h")});

        collector.on('collect', reaction => {
            if (reaction.emoji.name === '⬅️') {
                UseSlideNumber(3);
            }
            if (reaction.emoji.name === '➡️') {
                UseSlideNumber(2);
            }
            if (reaction.emoji.name === '⏪') {
                UseSlideNumber(4);
            }
            if (reaction.emoji.name === '⏩') {
                UseSlideNumber(5);
            }

            if(UseSlideNumber(1) == 1) {
                const embed = new Discord.MessageEmbed()
                    .setColor(config["Common"].feature_color)
                    .setTitle(`${bot.user.username} Help - Page 1/6`)
                    .setThumbnail(bot.user.avatarURL({dynamic: true}))
                    .setDescription(`${bot.user.username} is here to help you with whatever possible.\n**Name:** ${bot.user.tag}\n**Creation Date:** ${bot.user.createdAt.toLocaleString()}\n*Use the reactions below to go through commands.*`)
                    .addFields(
                        {name: `About ${message.guild.name}`, value: `${config["utility_module"].about}.`},
                    )
                    .setFooter(`Requested by ${message.author.username} | ${config["Common"].copyright}`, message.author.avatarURL());
                msg.edit(embed)
            } else if (UseSlideNumber(1) == 2) {
                var tempString = ""
                var tempArray = []
                bot.commands.forEach(command => {
                    if(!tempArray.find(element => element == command.help.name)) {
                        tempArray.push(command.help.name)
                        if(command.help.category == 1) {
                            if(command.help.name2) {
                                tempString += `\`${daPrefixo+command.help.name}\`/\`${daPrefixo+command.help.name2}\`: ${command.help.description}\n`
                            } else {
                                tempString += `\`${daPrefixo+command.help.name}\`: ${command.help.description}\n`
                            }
                        }
                    }
                });
                const embed = new Discord.MessageEmbed()
                    .setTitle(`General Commands - Page 2/6`)
                    .setColor(config["Common"].feature_color)
                    .setThumbnail(bot.user.avatarURL({dynamic: true}))
                    .setDescription(tempString)
                    .setFooter(`.\nRequested by ${message.author.username} | ${config["Common"].copyright}`, message.author.avatarURL());
                msg.edit(embed)
            } else if (UseSlideNumber(1) == 3) {
                var tempString = ""
                var tempArray = []
                bot.commands.forEach(command => {
                    if(!tempArray.find(element => element == command.help.name)) {
                        tempArray.push(command.help.name)
                        if(command.help.category == 2) {
                            if(command.help.name2) {
                                tempString += `\`${daPrefixo+command.help.name}\`/\`${daPrefixo+command.help.name2}\`: ${command.help.description}\n`
                            } else {
                                tempString += `\`${daPrefixo+command.help.name}\`: ${command.help.description}\n`
                            }
                        }
                    }
                });
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Utility Commands - Page 3/6`)
                    .setColor(config["Common"].feature_color)
                    .setThumbnail(bot.user.avatarURL({dynamic: true}))
                    .setDescription(tempString)
                    .setFooter(`.\nRequested by ${message.author.username} | ${config["Common"].copyright}`, message.author.avatarURL());
                msg.edit(embed)
            } else if (UseSlideNumber(1) == 4) {
                var tempString = ""
                var tempArray = []
                bot.commands.forEach(command => {
                    if(!tempArray.find(element => element == command.help.name)) {
                        tempArray.push(command.help.name)
                        if(command.help.category == 3) {
                            if(command.help.name2) {
                                tempString += `\`${daPrefixo+command.help.name}\`/\`${daPrefixo+command.help.name2}\`: ${command.help.description}\n`
                            } else {
                                tempString += `\`${daPrefixo+command.help.name}\`: ${command.help.description}\n`
                            }
                        }
                    }
                });
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Support Commands - Page 4/6`)
                    .setColor(config["Common"].feature_color)
                    .setThumbnail(bot.user.avatarURL({dynamic: true}))
                    .setDescription(tempString)
                    .setFooter(`.\nRequested by ${message.author.username} | ${config["Common"].copyright}`, message.author.avatarURL());
                msg.edit(embed)
            } else if (UseSlideNumber(1) == 5) {
                var tempString = ""
                var tempArray = []
                bot.commands.forEach(command => {
                    if(!tempArray.find(element => element == command.help.name)) {
                        tempArray.push(command.help.name)
                        if(command.help.category == 4) {
                            if(command.help.name2) {
                                tempString += `\`${daPrefixo+command.help.name}\`/\`${daPrefixo+command.help.name2}\`: ${command.help.description}\n`
                            } else {
                                tempString += `\`${daPrefixo+command.help.name}\`: ${command.help.description}\n`
                            }
                        }
                    }
                });
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Moderation Commands - Page 5/6`)
                    .setColor(config["Common"].feature_color)
                    .setThumbnail(bot.user.avatarURL({dynamic: true}))
                    .setDescription(tempString)
                    .setFooter(`.\nRequested by ${message.author.username} | ${config["Common"].copyright}`, message.author.avatarURL());
                msg.edit(embed)
            } else if (UseSlideNumber(1) == 5) {
                var tempString = ""
                var tempArray = []
                bot.commands.forEach(command => {
                    if(!tempArray.find(element => element == command.help.name)) {
                        tempArray.push(command.help.name)
                        if(command.help.category == 4) {
                            if(command.help.name2) {
                                tempString += `\`${daPrefixo+command.help.name}\`/\`${daPrefixo+command.help.name2}\`: ${command.help.description}\n`
                            } else {
                                tempString += `\`${daPrefixo+command.help.name}\`: ${command.help.description}\n`
                            }
                        }
                    }
                });
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Moderation Commands - Page 6/6`)
                    .setColor(config["Common"].feature_color)
                    .setThumbnail(bot.user.avatarURL({dynamic: true}))
                    .setDescription(tempString)
                    .setFooter(`.\nRequested by ${message.author.username} | ${config["Common"].copyright}`, message.author.avatarURL());
                msg.edit(embed)
            }
            reaction.users.remove(message.author);
        });
        msg.delete({timeout: ms('5m')})
    }).catch(console.error);

    // 1 = return
    // 2 = add
    // 3 = minus
    // 4 = First page
    // 5 = Last page
    function UseSlideNumber(set) {
        if(set == 1) {
            return slide;
        }
        if(set == 2) {
            slide++;
            if(slide > 5) {
                slide = 5
            }
        }
        if(set == 3) {
            slide--;
            if(slide <= 0) {
                slide = 1
            }
        }
        if(set == 4) {
            slide = 1
        }
        if(set == 5) {
            slide = 5
        }
    }
};

module.exports.help = {
    name: "help",
    name2: "cmds",
    category: 2,
    perm: 4,
    description: "Show this message.",

}