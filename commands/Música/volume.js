const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "volume", 
  aliases: ["vol"], 

  run: async(client, message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );

  let queue = message.client.queue.get(message.guild.id);

  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Controlador de volume",
          "https://img.icons8.com/color/2x/high-volume--v2.gif"
        )
        .setColor("BLUE")
        .setDescription("**Current volume is " + queue.volume + " **")
    );

  if (args[0] > 100)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Erro de volume",
          "https://img.icons8.com/color/2x/high-volume--v2.gif"
        )
        .setColor("RED")
        .setDescription("**O volume não pode exceder 100 :x: **")
    );

  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  queue.volume = args[0];
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Controlador de volume",
        "https://img.icons8.com/color/2x/high-volume--v2.gif"
      )
      .setColor("BLUE")
      .setDescription("**Volume definido para " + args[0] + " :white_check_mark:**")
  );
}
}
