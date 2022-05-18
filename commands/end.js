const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour finir les Giveaway.');
    }

    if(!args[0]){
        return message.channel.send(':x: Vous devez spécifier un ID de message valide !');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);


    if(!giveaway){
        return message.channel.send('Impossible de trouver un Giveaway pour `'+ args.join(' ') + '`.');
    }


    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })

    .then(() => {

        message.channel.send('Le Giveaway se terminera dans moins de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway avec ID de message ${giveaway.messageID} est déjà terminé.`)){
            message.channel.send('Ce Giveaway est déjà terminé !');
        } else {
            console.error(e);
            message.channel.send('Une erreur s\'est produite...');
        }
    });

};