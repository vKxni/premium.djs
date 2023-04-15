import { CommandType } from "../typings/Command";

export class Command {
  constructor(options: CommandType) {
    Object.assign(this, options);
  }
}