const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, Message, MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
  name: "leaderboard",
  aliases: [],
  usage: "",
  description: "Displays the servers top 5 leveled users!",
  category: "leveling",
  cooldown: 10,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);

      if (rawLeaderboard.length < 1)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setDescription(`Nobody's in leaderboard yet!`),
          ],
        });

      const leaderboard = await Levels.computeLeaderboard(
        client,
        rawLeaderboard,
        true
      );

      const lb = leaderboard.map(
        (e) =>
          `**${e.position}. ${e.username}#${e.discriminator}**\n📊 Level: ${
            e.level
          }\n♾️ XP: ${e.xp.toLocaleString()}`
      );

      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle(`📊 leaderboard for ${message.guild.name} 📊`)
            .setDescription(`${lb.join("\n\n")}`)
            .setColor(ee.color)
            .setThumbnail(
              message.guild.iconURL({
                dynamic: true,
              })
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })

            .setTimestamp(),
        ],
      });
    } catch (e) {
      console.log(String(e.stack).bgRed);
      const errorLogsChannel = client.channels.cache.get(
        config.botlogs.errorLogsChannel
      );
      return errorLogsChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setAuthor({
              name: message.guild.name,
              iconURL: message.guild.iconURL({
                dynamic: true,
              }),
            })
            .setTitle(`${client.allEmojis.x} Got a Error:`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            .setFooter({ text: `Having: ${message.guild.memberCount} Users` }),
        ],
      });
    }
  },
};
