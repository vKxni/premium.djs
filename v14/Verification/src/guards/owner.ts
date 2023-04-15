import { CommandInteraction } from "discord.js";

import config from "../../owner.json";

export function ownerCheck(interaction: CommandInteraction) {
  if (!config.owners.includes(interaction.user.id)) {
    return interaction.reply({
      content: `You can't use this.`,
      ephemeral: true,
    });
  }
}
