const Discord = require('discord.js');
const config = require('../config.json');
const os = require('os');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let servercount = client.guilds.cache.size;
    let usercount = client.users.cache.size;
    let channelscount = client.channels.cache.size;
    let arch = os.arch();
    let platform = os.platform();
    let shard = client.ws.shards.size;
    let NodeVersion = process.version;
    let cores = os.cpus().length;

    let stats = new Discord.MessageEmbed()
    .setAuthor('Giveaway Bot')
    .setTitle(`Statistiques de ${client.user.username}`)
    .setColor('RED')
    .addField("Nombre de serveurs", `${servercount}`, true)
    .addField("Nombre d'utilisateurs", `${usercount}`, true)
    .addField("Nombre de salon", `${channelscount}`, true)
    .addField('Architecture', `${arch}`, true)
    .addField('Plateforme', `${platform}`, true)
    .addField('Node Version', `${NodeVersion}`, true)
    .addField('Shards', `${shard}`, true)
    .addField('Cores', `${cores}`, true)
    .setTimestamp()
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(stats);
};

module.exports.help = {
    name: "stats"
}
