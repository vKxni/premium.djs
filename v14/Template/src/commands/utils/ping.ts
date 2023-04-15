import { PermissionFlagsBits } from "discord.js";
import { ownerCheck } from "../../guards/owner";
import { Command } from "../../structures/Command";

export default new Command({
  name: "ping",
  description: "Pong!",
  userPermissions: [PermissionFlagsBits.Administrator],
  run: async ({ interaction, client }) => {
    await ownerCheck(interaction);
    if (interaction.replied) return;

    interaction.reply({
      content: "Pong!" + ` ${client.ws.ping}ms`,
      ephemeral: true,
    });
  },
});
