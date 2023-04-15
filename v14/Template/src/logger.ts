import { green, yellow, red, magenta, cyan } from "chalk";

class Logger {
  public success = (message: string): void =>
    console.log(`${green("✔ Success:")} ${message}`);
  public error = (message: string): void =>
    console.log(`${red("✖ Error:")} ${message}`);
  public debug = (message: string): void =>
    console.log(`${magenta("◉ Debug:")} ${message}`);
  public warn = (message: string): void =>
    console.log(`${yellow("⚠ Warn:")} ${message}`);
  public info = (message: string): void =>
    console.log(`${cyan("ℹ Info:")} ${message}`);
}

export default Logger;