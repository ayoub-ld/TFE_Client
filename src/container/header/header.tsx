"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import NavLink from "../nav-link/nav-link";
import SignOut from "@/components/sign-out/sign-out";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex flex-row box-border h-30 p-2.5 border-b-2 border-black bg-gray-900">
      <Image
        className="object-cover w-auto bg-white"
        src="/logo.png"
        alt="website logo"
        width={110}
        height={60}
        priority={true} // Add priority property for LCP optimization
      />
      <NavLink />

      {session?.user && (
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center gap-2">
            {session.user.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{session.user.name}</span>
          </div>
          <SignOut />
        </div>
      )}
    </header>
  );
}
