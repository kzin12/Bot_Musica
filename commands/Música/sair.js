const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "sair", 
  aliases: ["disconnect", "sai"], 

  run: async(client, message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Sai do canal de voz :white_check_mark: **")
      .setColor("BLUE")
  );
}
}
