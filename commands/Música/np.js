const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "np", 
  aliases: ["now"], 

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
        .setColor("RED")
        .setDescription(":x: Não há músicas tocando neste servidor")
    );
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Tocando agora",
        "https://img.icons8.com/color/2x/audio-wave--v2.gif"
      )
      .setColor("BLUE")
      .setDescription(
        queue.queue[0].name +
          " Requerido por: " +
          "<@" +
          queue.queue[0].requested +
          ">"
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter("Existem " + queue.queue.length + " canções na fila")
  );
}
}
