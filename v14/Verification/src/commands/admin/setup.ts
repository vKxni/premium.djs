import {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
  ActionRowBuilder,
  Guild,
} from "discord.js";
import { ownerCheck } from "../../guards/owner";
import { Command } from "../../structures/Command";

import GuildModel from "../../models/guild/guild";

export default new Command({
  name: "setup",
  description: "Setup verification",
  userPermissions: [PermissionFlagsBits.Administrator],
  options: [
    {
      name: "role",
      description: "The role that the user should receive",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
    {
      name: "channel",
      description: "The channel to send the panel in",
      type: ApplicationCommandOptionType.Channel,
      required: false,
    },
    {
      name: "active",
      description: "Whether the verification is active or not",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
  ],
  run: async ({ interaction, client }) => {
    await ownerCheck(interaction);
    if (interaction.replied) return;

    // get the options of the command 
    const channel =
      interaction.options.getChannel("channel") || interaction.channel;
    const role = interaction.options.getRole("role");
    const active = interaction.options.getBoolean("active") || false;

    // find the guild in the db
    const guildQuery = await GuildModel.findOne({
      guildID: interaction.guild.id,
    });

    // if no data, create it
    if (!guildQuery) {
      await GuildModel.create({
        guildID: interaction.guild.id,
        role: role.id,
        active: active,
      });
    }

    const embed = new EmbedBuilder()
      .setDescription(
        "Verification, click on the button below to verify yourself"
      )
      .setColor("Random")
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setLabel("Verify")
        .setCustomId("verification")
        .setEmoji("✅")
    );

    // if there is data, update it to the new data
    await GuildModel.findOneAndUpdate(
      {
        guildID: interaction.guild.id,
      },
      {
        role: role.id,
        active: active,
      }
    );

    interaction.reply({
      content: `Setup successfully completed!\n\nChannel: ${channel}\nRole: ${role}\nActive: ${active}`,
      ephemeral: true,
    });

    // send the embed in the channel (with the button)
    await (channel as TextChannel).send({
      embeds: [embed],
      components: [row],
    });
  },
});
