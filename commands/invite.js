const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    let prefix = config.prefix;
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let invite = new Discord.MessageEmbed()
    .setTitle("Discord Support !")
    .addField("Discord Support", "[Discord](https://discord.gg/gNbxw7zNS9)")
    //.addField("Support Server", "[Click to join support Server](https://discord.gg/REAW5VM)")
    .setTimestamp()
    .setFooter(`Demandé par ${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(invite);
}

module.exports.help = {
    name: "invite"
}
