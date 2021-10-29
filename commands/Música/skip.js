const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip", 
  aliases: ["pular", "pula", "proxima", "outra"], 

  run: async(client, message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Não há músicas tocando neste servidor")
        .setColor("RED")
    );
  queue.connection.dispatcher.end('skipped');
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Musica Pulada :white_check_mark: **")
      .setColor("BLUE")
  );
}
}
