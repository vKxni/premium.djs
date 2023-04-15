import { CommandInteraction } from "discord.js";

import config from "../../owner.json";
import emojis from "../styles/emojis";

export function ownerCheck(interaction: CommandInteraction) {
  if (!config.owners.includes(interaction.user.id)) {
    return interaction.reply({
      content: `${emojis.error} | You can't use this.`,
      ephemeral: true,
    });
  }
}
