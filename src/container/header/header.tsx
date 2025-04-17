"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "../nav-link/nav-link";
import SignOut from "@/components/sign-out/sign-out";

export default function Header() {
  const { data: session, status } = useSession();

  console.log("Auth status:", status);
  console.log("Session data:", session);

  function getProfileImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return "/default-avatar.jpg";
    }
    
    // When profile picture is a complete URL (like from Google)
    if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
      return imageUrl;
    }
    
    // If the profile picture is a relative URL without a protocol
    if (imageUrl && !imageUrl.startsWith('/')) {
      return `/${imageUrl}`;
    }
    
    return imageUrl;
  }

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
          <Link href="/profile" className="flex items-center gap-2 hover:text-blue-400 transition-colors mr-5 text-xl">
            {session.user?.image && (
              <img
                src={getProfileImageUrl(session.user.image)}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover bg-gray-700"
                onError={(e) => {
                  console.log("Header profile image failed to load, using default");
                  (e.target as HTMLImageElement).src = "/default-avatar.jpg";
                }}
              />
            )}
            <span>My profile</span>
          </Link>
          <SignOut />
        </div>
      )}
    </header>
  );
}
