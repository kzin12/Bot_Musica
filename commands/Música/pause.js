const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pause", 
  aliases: ["pare", "parar", "pausar"], 

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
  if (queue.playing == false)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: A musica ja esta pausada")
        .setColor("RED")
    );
  queue.connection.dispatcher.pause();
  message.react("⏸");
  queue.playing = false;
  return message.channel.send(
    new MessageEmbed()
    .setDescription("**a Musica foi pausada :white_check_mark:  **")
    .setColor("BLUE")
  );
}
}
