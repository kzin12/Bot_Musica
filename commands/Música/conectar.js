const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "conectar", 
  aliases: ["connect", "entrar"], 

  run: async(client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("Eu não tenho permissão para entrar no canal de voz");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("Eu não tenho permissão para falar no canal de voz");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Entrei no canal de voz <a:aCorreto:860242602146136064> **")
      .setColor("BLUE")
  );
}
}
