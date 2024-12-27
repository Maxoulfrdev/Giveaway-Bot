const Discord = require('discord.js');
const config = require('../config.json');
const { Support } = require('../config');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("Giveaway Bot")
      .setTitle("Liste de commandes et guide pour le bot")
      .setDescription("Vous trouverez ci-dessous les commandes que vous pouvez effectuer avec Bot. Pour le moment, seules 6 commandes sont disponibles. D'autres commandes seront bientôt ajoutées.")
      .addField("🎁 | Giveaway","%start [Salon] [Temps] [Nombre de Gagnant] [Prix]\n%reroll [Prix]\n%end [Prix]")
      .addField("🎯 | Exemples", "%start #giveaway 5m 1 Test\n%end Test\n%reroll Test")
      .addField("🧶 | Utilitaire", "%ping, %invite", true)
      .addField("📢 | Information", "%stats", true)
      .addField(`⚡ | **Serveur de Support:** ${Support}`)
      .setTimestamp()
      .setFooter(`Commande demandée par ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("**Envoyé les commandes dans les messages privé ! 💌, Regarde dans les messages privé !**");

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}
