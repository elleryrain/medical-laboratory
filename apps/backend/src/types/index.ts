declare module 'http' {
  interface IncomingMessage {
    user: {
      id: number;
    };
  }
}

export interface ITokenData {
  id: number;
}
