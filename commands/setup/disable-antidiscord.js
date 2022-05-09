const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require(`${process.cwd()}/structures/models/anti-inviteLink`);

module.exports = {
  name: "disable-antidiscord",
  aliases: [
    "remove-antidiscord",
    "disable-antidiscordlink",
    "remove-antidiscordlink",
  ],
  usage: "",
  description: "",
  category: "setup",
  cooldown: 0,
  userPermissions: "ADMINISTRATOR",
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
      Schema.findOneAndDelete(
        {
          Guild: message.guild.id,
        },
        async (err, data) => {
          if (!data)
            return message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle(`${client.allEmojis.x} Anti-Invite-Link System`)
                  .setColor(ee.wrongcolor)
                  .setFooter({ text: ee.footertext, iconURL: ee.footericon })

                  .setDescription(
                    `Anti-Invite-Link is Already **Disabled** in this server!`
                  ),
              ],
            });

          message.reply({
            embeds: [
              new MessageEmbed()
                .setTitle(`${client.allEmojis.y} Anti-Invite-Link System`)
                .setColor(ee.color)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon })

                .setDescription(`**Anti-Invite-Link** is now Disabled!`),
            ],
          });
        }
      );
    } catch (e) {
      console.log(String(e.stack).bgRed);
      const errorLogsChannel = client.channels.cache.get(
        config.botlogs.errorLogsChannel
      );
      if (!errorLogsChannel) return;
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
