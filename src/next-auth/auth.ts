import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Add type extensions
declare module "next-auth" {
  interface User {
    id?: string | undefined;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Get the database user ID from token or cookies
        session.user.id = (token.user_id as string) || "";
      }
      return session;
    },
  },
});
