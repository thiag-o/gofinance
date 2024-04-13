declare global {
  namespace NodeJS {
    interface ProcessEnv {
      IOS_CLIENT_ID: string;
      WEB_CLIENT_ID: string;
    }
  }
}
export {};
