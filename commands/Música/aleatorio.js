const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "aleatorio", 
  aliases: ["shuffle", "embaralhar"], 

  run: async(client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Erro do controlador aleatório",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("**:x: Não há músicas na fila para embaralhar**")
        .setColor("RED")
    );
  let songs = queue.queue;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.queue = songs;
  message.client.queue.set(message.guild.id, queue);
  message.channel
    .send(
      new MessageEmbed()
        .setAuthor(
          "Controlador Shuffle",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("**:white_check_mark:   Ordem aleatória da fila**")
        .setColor("BLUE")
    )
    .catch(console.error);
}
}
