import * as Discord from "discord.js";
import { CommandType } from "../typings/Command";
import { RegisterCommandOptions } from "../typings/Client";

import Logger from "../logger";
import { connect } from "../database";

import { glob } from "glob";
import { promisify } from "util";
const globPromise = promisify(glob);

import { lstat, readdir } from "fs/promises";
import { config } from "dotenv";
import path from "path";

const logger = new Logger();

config();
export class ExtendedClient extends Discord.Client {
  commands: Discord.Collection<string, CommandType> = new Discord.Collection();
  events: Discord.Collection<string, any> = new Discord.Collection();
  owners: string[] = [];
  constructor(options: Discord.ClientOptions) {
    super(options);
  }
  start() {
    this.registerModules();
    this.login(process.env.TOKEN);
    connect();
    this.registerEvents("../events");
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }
  async registerCommands({ commands, guildId }: RegisterCommandOptions) {
    client.application.commands.set(commands, guildId);
    console.log(`Registering commands locally`);
  }
  async registerModules() {
    // Commands
    const slashCommands: Discord.ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const splitted = filePath.split("/");
      const directory = splitted[splitted.length - 2];
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
      const properties = { directory, ...command };
      console.table([{ name: command.name, description: command.description }]);

      this.commands.set(command.name, properties);
      if (["MESSAGE", "USER"].includes(command.type as string | any))
        delete command.description;
      slashCommands.push(command);
    });
    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.GUILD_ID,
      });
    });
  }
  async registerEvents(dir: string) {
    const filePath = path.join(__dirname, dir);
    const files = await readdir(filePath);
    for (const file of files) {
      const stat = await lstat(path.join(filePath, file));
      if (stat.isDirectory()) this.registerEvents(path.join(dir, file));
      if (file.endsWith(".js") || file.endsWith(".ts")) {
        const { default: Event } = await import(path.join(dir, file));
        const event = new Event();
        this.events.set(event.getName(), event);
        this.on(event.getName(), event.run.bind(event, this));
      }
    }
  }
}
