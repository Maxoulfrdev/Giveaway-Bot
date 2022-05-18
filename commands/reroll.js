const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour relancer giveaways.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Vous devez spécifier un ID de message valide !');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Impossible de trouver un giveaway pour `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Giveaway relancé !');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway avec ID de message ${giveaway.messageID} n'est pas terminé.`)){
            message.channel.send('Ce giveaway n\'est pas fini !');
        } else {
            console.error(e);
            message.channel.send('Une erreur s\'est produite...');
        }
    });

};