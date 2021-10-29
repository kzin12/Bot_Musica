const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "resume", 
  aliases: ["r", "resumir"], 

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
  if (queue.playing == true)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: A musica ja esta tocando")
        .setColor("RED")
    );
  queue.connection.dispatcher.resume();
  message.react("▶");
  queue.playing = true;
  return message.channel.send(
    new MessageEmbed()
    .setDescription("**a Musica voltou a Tocar :white_check_mark:**")
    .setColor("BLUE")
  );
}
}
