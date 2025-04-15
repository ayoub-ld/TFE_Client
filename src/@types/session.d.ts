import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string & { __brand: 'uuid' };
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

export interface CustomSession {
  user?: {
    id: string & { __brand: 'uuid' };
    name?: string;
    email?: string;
    image?: string;
  };
}
