"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import NavLink from "../nav-link/nav-link";
import SignOut from "@/components/sign-out/sign-out";

export default function Header() {
  const { data: session, status } = useSession();

  console.log("Auth status:", status);
  console.log("Session data:", session);

  return (
    <header className="flex flex-row justify-between items-center box-border h-30 p-2.5 border-b-2 border-black bg-gray-900">
      <div className="flex items-center">
        <Image
          className="object-cover w-auto bg-white"
          src="/logo.png"
          alt="website logo"
          width={110}
          height={60}
          priority={true}
        />
      </div>

      <div className="flex-grow flex justify-center">
        <NavLink />
      </div>

      {/* Simplified condition to check for authentication */}
      {status === "authenticated" && (
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center gap-2">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{session.user?.name || "User"}</span>
          </div>
          <SignOut />
        </div>
      )}
    </header>
  );
}
