declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        // see: next.config.mjs
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        SESSION_SECRET: string;
      }
    }
  }
}
