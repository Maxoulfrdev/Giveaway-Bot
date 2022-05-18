module.exports = (client) => {
  console.log(
    `Prêt à servir dans ${client.channels.cache.size} salon sur ${client.guilds.cache.size} serveurs, pour un total de ${client.users.cache.size} utilisateurs.`
  );

  const activities = [`Cadeaux dans ${client.guilds.cache.size} serveur`,"+help",`terminé ${client.users.cache.size} utilisateurs!`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(`${client.users.cache.size} utilisateurs !`, { type: "WATCHING" });
  }, 20000);

};
