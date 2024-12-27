const Discord = require('discord.js');
const config = require('../config.json');
const { Support } = require('../config');

module.exports.run = async (client, message, args) => {
    let prefix = config.prefix;
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let invite = new Discord.MessageEmbed()
    .setTitle("Discord Support !")
    .addField(`⚡ | **Serveur de Support:** ${Support}`)
    .setTimestamp()
    .setFooter(`Demandé par ${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(invite);
}

module.exports.help = {
    name: "invite"
}
