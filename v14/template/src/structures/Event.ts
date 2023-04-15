import { ClientEvents } from "discord.js";
import { ExtendedClient } from "./Client";

export abstract class BaseEvent {
  constructor(private name: keyof ClientEvents) {}
  getName(): string {
    return this.name;
  }
  abstract run(client: ExtendedClient, ...args: any): void;
}
