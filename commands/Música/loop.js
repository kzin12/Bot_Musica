const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "loop", 
  aliases: ["loo", "repeat", "repetir"], 

  run: async(client, message, args) => {

const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      ":x: Não há músicas tocando neste servidor"
    );

  queue.loop = !queue.loop;
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Controlador Loop",
        "https://img.icons8.com/color/2x/refresh--v2.gif"
      )
      .setColor("BLUE")
      .setTimestamp()
      .setDescription(
        "**Loop foi" +
          (queue.loop == true ? " Ativado " : " Desativado ") +
        "para a música atual :white_check_mark: **"
      )
  )
}
}
