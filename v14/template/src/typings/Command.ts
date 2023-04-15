import {
  ApplicationCommandData,
  ButtonInteraction,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from "discord.js";
import { ExtendedClient } from "../structures/Client";

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
  options: CommandInteractionOptionResolver;
}

export interface ExtendedButtonInteraction extends ButtonInteraction {
  member: GuildMember;
  fields: any;
}

interface RunOptions {
  client: ExtendedClient;
  interaction: ExtendedInteraction;
  args: string[];
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  userPermissions?: PermissionResolvable[];
  guildOnly?: Boolean;
  ownerOnly?: Boolean;
  directory?: string;
  description?: string;
  run: RunFunction;
} & ApplicationCommandData;
