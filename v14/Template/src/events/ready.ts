import { ActivityType } from "discord.js";
import Logger from "../logger";
import { ExtendedClient } from "../structures/Client";
import { BaseEvent } from "../structures/Event";

const logger = new Logger();
export default class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client: ExtendedClient) {
    logger.success(`Logged in as ${client.user.tag}`);
    client.user.setActivity({
      name: "github.com/vKxni",
      type: ActivityType.Listening,
    });
    client.user.setStatus("dnd");
  }
}
