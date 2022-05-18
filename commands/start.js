const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour démarrer giveaways.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: Vous devez mentionner une chaîne valide !');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Vous devez spécifier une durée valide !');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Vous devez indiquer un nombre valide de gagnants !');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: Vous devez spécifier un prix valide !');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: parseInt(giveawayNumberWinners),
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Temps restant: **{duration}**!",
            inviteToParticipate: "Réagissez avec 🎉 pour participer !",
            winMessage: "Toutes nos félicitations, {winners}! Tu as gagné **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway annulé, pas de participations valables.",
            hostedBy: "Lancer par: {user}",
            winners: "gagnant(e)s",
            endedAt: "Terminé à",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway commencé dans ${giveawayChannel}!`);

};
