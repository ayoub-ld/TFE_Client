import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (token && token.sub) {
    try {
      // First check if user exists by email
      const checkResponse = await fetch(
        `${process.env.API_URL}/api/v1/user/email/${encodeURIComponent(
          token.email || ""
        )}`
      );

      if (checkResponse.status === 404) {
        // User doesn't exist, create new user
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

        const createResponse = await fetch(
          `${process.env.API_URL}/api/v1/user`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          }
        );

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData.error || "User creation failed");
        }
      } else if (checkResponse.ok) {
        // User exists, update Google ID if missing
        const existingUser = await checkResponse.json();
        if (!existingUser.data.google_id) {
          await fetch(
            `${process.env.API_URL}/api/v1/user/${existingUser.data.id_user}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ google_id: token.sub }),
            }
          );
        }
      }

      return Response.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Authentication error:", error);
      return Response.redirect(
        new URL(
          `/error?message=${encodeURIComponent(
            error instanceof Error ? error.message : "Authentication failed"
          )}`,
          request.url
        )
      );
    }
  }
  return Response.redirect(new URL("/login", request.url));
}
