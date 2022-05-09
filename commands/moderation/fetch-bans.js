const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "fetch-bans",
  aliases: ["fetch-ban"],
  usage: "",
  description: "Display Banned Member!",
  category: "moderation",
  cooldown: 0,
  userPermissions: "BAN_MEMBERS",
  botPermissions: "BAN_MEMBERS",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      const fetchBans = message.guild.bans.fetch();
      const bannedMembers = (await fetchBans)
        .map((member) => `\`${member.user.tag}\``)
        .join("\n");
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: "Banned Members List",
              iconURL: message.guild.iconURL({
                dynamic: true,
              }),
            })
            .setThumbnail(
              message.guild.iconURL({
                dynamic: true,
              })
            )
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })

            .setDescription(bannedMembers),
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
