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
    async jwt({ token, account, profile }) {
      // If this is the first sign in with this account
      if (account && profile) {
        try {
          console.log("Processing JWT callback for email:", token.email);
          console.log("API URL:", process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080");
          
          // First check if user exists by email
          const checkResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/user/email/${encodeURIComponent(
              token.email || ""
            )}`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            }
          );
          
          console.log("Email check response status:", checkResponse.status);

          if (checkResponse.status === 404) {
            // User doesn't exist, create new user
            console.log("User not found, creating new user");
            const userData = {
              google_id: token.sub,
              email: token.email,
              username: `user_${Date.now()}`,
              firstname: token.name?.split(" ")[0] || "User",
              lastname: token.name?.split(" ").slice(1).join(" ") || "Anonymous",
              profile_picture: token.picture || "/default-avatar.png",
              name: token.name || "",
              image: token.picture || "",
            };

            console.log("Creating user with data:", JSON.stringify(userData));

            const createResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/user`,
              {
                method: "POST",
                headers: { 
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userData),
              }
            );

            console.log("Create user response status:", createResponse.status);

            if (createResponse.ok) {
              const newUser = await createResponse.json();
              console.log("New user created:", newUser);
              token.user_id = newUser.data.id_user;
            } else {
              const errorText = await createResponse.text();
              console.error("Failed to create user:", errorText);
            }
          } else if (checkResponse.ok) {
            // User exists, update Google ID if missing
            const existingUser = await checkResponse.json();
            console.log("Found existing user:", existingUser);
            token.user_id = existingUser.data.id_user;
            
            if (!existingUser.data.google_id) {
              console.log("Updating missing Google ID");
              await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/user/${existingUser.data.id_user}`,
                {
                  method: "PUT",
                  headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                  },
                  credentials: 'include',
                  body: JSON.stringify({ google_id: token.sub }),
                }
              );
            }
          }
        } catch (error) {
          console.error("Error syncing user with database:", error);
        }
      }
      console.log("Final JWT token:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Get the database user ID from token
        session.user.id = (token.user_id as string) || "";
        console.log("Session user ID:", session.user.id); // Debug log
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
});
