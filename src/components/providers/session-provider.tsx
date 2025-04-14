"use client";

import { SessionProvider } from "next-auth/react";

export default function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

/*
This will wrap your entire application with the SessionProvider, allowing the useSession hook to work properly in your Header component and any other components that need access to the authentication session.

The error occurs because client components like your Header that use useSession need to be wrapped in a SessionProvider to access the authentication context. The SessionProvider manages the session state and makes it available to all components within its tree.
*/
