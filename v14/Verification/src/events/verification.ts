import { ExtendedClient } from "../structures/Client";
import { BaseEvent } from "../structures/Event";
import { ExtendedButtonInteraction } from "../typings/Command";

import GuildModel from "../models/guild/guild";

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super("interactionCreate");
  }
  async run(client: ExtendedClient, interaction: ExtendedButtonInteraction) {
    if (interaction.customId === "verification") {

      // find the guild in the db
      const guildQuery = await GuildModel.findOne({
        guildID: interaction.guild.id,
      });

      const member = interaction.member;
      const role = guildQuery.role;
      const active = guildQuery.active;

      // if no setup or if the verification is not active (set to false), dont do anything
      if (!guildQuery || !active) {
        return interaction.reply({
          content:
            "Verification is not active or properly setup yet. Please check back later",
          ephemeral: true,
        });
      }

      // if the user does not have the role, add it
      if (!member.roles.cache.has(role)) {
        await member.roles.add(role);
        interaction.reply({
          content: "You have been verified!",
          ephemeral: true,
        });
      }

      // if the user has the role already
      await interaction.reply({
        content: "You are already verified",
        ephemeral: true,
      });
    }
  }
}
