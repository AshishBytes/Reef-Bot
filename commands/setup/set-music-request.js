const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");
const Schema = require(`${process.cwd()}/structures/models/music-request`);

module.exports = {
  name: "set-music-request",
  aliases: [],
  description: "",
  category: "setup",
  cooldown: 0,
  userPermissions: "ADMINISTRATOR",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,
  premium: true,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      const channel = message.mentions.channels.first();
      if (!channel)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle(`${client.allEmojis.m} Music Request System`)
              .setColor(ee.mediancolor)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })

              .setDescription(`Please mention a channel!`),
          ],
        });

      Schema.findOne(
        {
          Guild: message.guild.id,
        },
        async (err, data) => {
          setTimeout(() => {
            if (data) {
              (data.Channel = channel.id), data.save();
            } else {
              new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
              }).save();
            }
          }, 5000);

          let MusicMenuOptions = [
            {
              label: "NCS | No Copyrighted Music",
              description: 'Play Playlist of "NCS"',
              value: "menu-music-song-1",
              emoji: "0️⃣",
            },
            {
              label: "Pop",
              description: 'Play Playlist of "Pop"',
              value: "menu-music-song-2",
              emoji: "1️⃣",
            },
            {
              label: "Default",
              description: 'Play Playlist of "Default"',
              value: "menu-music-song-3",
              emoji: "2️⃣",
            },
            {
              label: "Rock",
              description: 'Play Playlist of "Rock"',
              value: "menu-music-song-4",
              emoji: "3️⃣",
            },
            {
              label: "Old Gaming",
              description: 'Play Playlist of "Old Gaming"',
              value: "menu-music-song-5",
              emoji: "4️⃣",
            },
            {
              label: "Gaming",
              description: 'Play Playlist of "Gaming"',
              value: "menu-music-song-6",
              emoji: "5️⃣",
            },
            {
              label: "Charts",
              description: 'Play Playlist of "Charts"',
              value: "menu-music-song-7",
              emoji: "6️⃣",
            },
            {
              label: "Chill",
              description: 'Play Playlist of "Chill"',
              value: "menu-music-song-8",
              emoji: "7️⃣",
            },
            {
              label: "Jazz",
              description: 'Play Playlist of "Jazz"',
              value: "menu-music-song-9",
              emoji: "8️⃣",
            },
            {
              label: "Blues",
              description: 'Play Playlist of "Blues"',
              value: "menu-music-song-10",
              emoji: "9️⃣",
            },
            {
              label: "Strange Fruits",
              description: 'Play Playlist of "Strange Fruits"',
              value: "menu-music-song-11",
              emoji: "🔟",
            },
            {
              label: "Magic Release",
              description: 'Play Playlist of "Magic Release"',
              value: "menu-music-song-12",
              emoji: "🔢",
            },
            {
              label: "Metal",
              description: 'Play Playlist of "Metal"',
              value: "menu-music-song-13",
              emoji: "🔢",
            },
          ];

          let MusicMenuSelection = new MessageSelectMenu()
            .setCustomId("Music-Menu-System")
            .setPlaceholder("Click me to Choose the Music Playlist")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(MusicMenuOptions.filter(Boolean));

          const MusicButtons = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("music-skip")
              .setEmoji(client.allEmojis.musicButtons.skip)
              .setLabel("Skip")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("music-pause")
              .setEmoji(client.allEmojis.musicButtons.pause)
              .setLabel("Pause")
              .setStyle("SECONDARY"),
            new MessageButton()
              .setCustomId("music-resume")
              .setEmoji(client.allEmojis.musicButtons.resume)
              .setLabel("Resume")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("music-stop")
              .setEmoji(client.allEmojis.musicButtons.stop)
              .setLabel("Stop")
              .setStyle("DANGER"),
            new MessageButton()
              .setCustomId("music-queue")
              .setEmoji(client.allEmojis.musicButtons.queue)
              .setLabel("Queue")
              .setStyle("PRIMARY")
          );

          const MusicButtons2 = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("music-shuffle")
              .setEmoji(client.allEmojis.musicButtons.shuffle)
              .setLabel("Shuffle")
              .setStyle("SECONDARY"),
            new MessageButton()
              .setCustomId("music-autoplay")
              .setEmoji(client.allEmojis.musicButtons.autoplay)
              .setLabel("Autoplay")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("music-10s-less")
              .setEmoji(client.allEmojis.musicButtons.less10Sec)
              .setLabel("- 10 Sec")
              .setStyle("DANGER"),
            new MessageButton()
              .setCustomId("music-10s-more")
              .setEmoji(client.allEmojis.musicButtons.forward10Sec)
              .setLabel("+ 10 Sec")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("music-lyrics")
              .setEmoji(client.allEmojis.musicButtons.lyrics)
              .setLabel("Lyrics")
              .setStyle("PRIMARY")
          );

          const MusicButtons3 = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("music-loop")
              .setEmoji(client.allEmojis.musicButtons.loop)
              .setLabel("Loop")
              .setStyle("SUCCESS"),
            new MessageButton()
              .setCustomId("music-volume-negative")
              .setEmoji(client.allEmojis.musicButtons.negative10vol)
              .setLabel("- 10 Vol")
              .setStyle("DANGER"),
            new MessageButton()
              .setCustomId("music-volume-plus")
              .setEmoji(client.allEmojis.musicButtons.plus10vol)
              .setLabel("+ 10 Vol")
              .setStyle("SUCCESS")
          );

          const embed = new MessageEmbed()
            .setAuthor({
              name: `Start Listening Your Favourite Music's`,
              iconURL: client.user.displayAvatarURL({
                dynamic: true,
              }),
            })
            .setTitle(`Avaliable Playlists:`)
            .setThumbnail(
              message.guild.iconURL({
                dynamic: true,
              })
            )
            .setFooter({
              text: message.guild.name,
              iconURL: message.guild.iconURL({
                dynamic: true,
              }),
            })
            .setImage(
              message.guild.banner
                ? message.guild.bannerURL({
                    size: 4096,
                    dynamic: true,
                  })
                : config.music.musicRequestImage
            )
            .setColor(ee.color)
            .addFields([
              {
                name: "Playlist 1",
                value: `NCS`,
                inline: true,
              },
              {
                name: "Playlist 2",
                value: `Pop`,
                inline: true,
              },
              {
                name: "Playlist 3",
                value: `Default`,
                inline: true,
              },
              {
                name: "Playlist 4",
                value: `Rock`,
                inline: true,
              },
              {
                name: "Playlist 5",
                value: `Old Gaming`,
                inline: true,
              },
              {
                name: "Playlist 6",
                value: `Gaming`,
                inline: true,
              },
              {
                name: "Playlist 7",
                value: `Charts`,
                inline: true,
              },
              {
                name: "Playlist 8",
                value: `Chill`,
                inline: true,
              },
              {
                name: "Playlist 9",
                value: `Jazz`,
                inline: true,
              },
              {
                name: "Playlist 10",
                value: `Blues`,
                inline: true,
              },
              {
                name: "Playlist 11",
                value: `Strange Fruits`,
                inline: true,
              },
              {
                name: "Playlist 12",
                value: `Magic Release`,
                inline: true,
              },
              {
                name: "Playlist 13",
                value: `Metal`,
                inline: true,
              },
            ]);

          const MusicMenus = new MessageActionRow().addComponents([
            MusicMenuSelection,
          ]);

          message.reply({
            embeds: [
              new MessageEmbed()
                .setTitle(`${client.allEmojis.y} Music Request System`)
                .setColor(ee.color)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon })

                .setDescription(
                  `${channel} has been set as the **Music Request Channel**`
                ),
            ],
          });

          channel.send({
            embeds: [embed],
            components: [
              MusicMenus,
              MusicButtons,
              MusicButtons2,
              MusicButtons3,
            ],
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
};
