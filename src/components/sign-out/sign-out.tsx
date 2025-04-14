"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/logged-out" })}
      className="flex gap-2 border border-white rounded-full p-2 px-4 hover:bg-violet-900 cursor-pointer text-white"
    >
      Sign out
    </button>
  );
}
