declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      GUILD_ID: string;
      ENV: "dev" | "prod" | "debug";
      MONGO_DB: string;
    }
  }
}

export {};
