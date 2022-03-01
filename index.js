// Load up libraries and constant variables
const Discord = require("discord.js");
const bot = new Discord.Client();
const async = require("async");
const config = require("./config.json");
const ms = require("ms");
const guild_data = require("./guild.json");
const fs = require('fs');
var guild = JSON.parse(fs.readFileSync('./guild.json'));
int = guild_number = guild.number;
const mysql = require('mysql');
bot.commands = new Discord.Collection();
var connection;
const express = require("express"); 

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if(file.endsWith('.js')) {
			let comm = require(`./commands/${file}`);
			bot.commands.set(comm.help.name, comm);
			if (comm.help.name2 != null) bot.commands.set(comm.help.name2, comm);
			if(config["Common"].debug_mode) {
				console.log(`\x1b[93m[Debug] \x1b[0m/commands/${file} \x1b[32mloaded\x1b[0m.`)
			}
		}
	}); 
});

bot.on("ready", async () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started and is in ${guild.number} guild(s).`);
  bot.user.setPresence({ activity: { name: `${guild_number} servers`, type: config["Common"].presence }, status: config["Common"].status }).catch(console.error);
});

function doesUserHavePerms(message, lvl) {
	let ownerPermArray = config["admin_management"].owner_roles;
	let adminPermArray = config["admin_management"].admin_roles;
	let staffPermArray = config["admin_management"].staff_roles;
	if(lvl == 1) {
		if(message.member.roles.cache.some(r=>ownerPermArray.includes(r.id))) return true;
	} else if (lvl == 2) {
		if(message.member.roles.cache.some(r=>ownerPermArray.includes(r.id))) return true;
		if(message.member.roles.cache.some(r=>adminPermArray.includes(r.id))) return true;
	} else if (lvl == 3) {
		if(message.member.roles.cache.some(r=>ownerPermArray.includes(r.id))) return true;
		if(message.member.roles.cache.some(r=>adminPermArray.includes(r.id))) return true;
		if(message.member.roles.cache.some(r=>staffPermArray.includes(r.id))) return true;
	} else if (lvl == 4) {
		return true;
	}
	return false;
}

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  guild_number = guild_number + 1
  fs.writeFileSync('./guild.json', JSON.stringify(
    {
      "number" : guild_number
  }));
  var guild = JSON.parse(fs.readFileSync('./guild.json'));
  console.log(guild_number)
  bot.user.setPresence({ activity: { name: `${guild_number} servers`, type: config["Common"].presence }, status: config["Common"].status }).catch(console.error);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  guild_number = guild_number - 1
  fs.writeFileSync('./guild.json', JSON.stringify(
    {
      "number" : guild_number
    }
  ));
  console.log(guild.number)
  bot.user.setPresence({ activity: { name: `${guild_number} servers`, type: config["Common"].presence }, status: config["Common"].status }).catch(console.error);
});

bot.on('guildMemberADdd', (member) => {
  const channelId = ''
  console.log(member)

  const message = `Welcome to ${guild.nmae} <@${member.id}>`

   const channel = member.guild.channels.cache.get(channelId)
   channel.send(message)
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
let prefixPresent = false;
  let prefixes = config["Common"].prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
let args = messageArray.slice(1);
for(const aPrefix of prefixes) {
  if(message.content.startsWith(aPrefix)) prefixPresent = aPrefix;
}
if(!prefixPresent) return;
let commandfile = bot.commands.get(cmd.slice(prefixPresent.length));
message.delete({timeout: 500});
if(!commandfile) return
if(config["admin_management"].use_custom_perms && doesUserHavePerms(message, commandfile.help.perm) == false) return message.channel.send(`:x: Insufficient permissions to use this command (\`${cmd}\`).`).then(msg => msg.delete({timeout: 5000})).catch(console.error);
commandfile.run(bot, message, args, connection);	
if(config["Common"].debug_mode) console.log(`\x1b[93m[Debug] \x1b[0mCommand ran by ${message.author.tag} \x1b[37m(${cmd+' '+args})\x1b[0m`)
});
// Commands
/*
bot.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config["Common"].prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
});*/

bot.login(config["Common"].token);
