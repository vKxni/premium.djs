import { InteractionType } from "discord.js";
import { ExtendedClient } from "../structures/Client";
import { BaseEvent } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super("interactionCreate");
  }
  async run(client: ExtendedClient, interaction: ExtendedInteraction) {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const args: string[] = [];
      const command = client.commands.get(interaction.commandName);
      if (!command)
        return interaction.reply({
          content: "You have used a non existent command.",
          ephemeral: true,
        });
      command.run({
        args,
        client,
        interaction: interaction as ExtendedInteraction,
      });
    }
  }
}
