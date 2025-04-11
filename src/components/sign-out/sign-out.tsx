"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="flex justify-center flex-row gap-2">
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/logged-out" })}
        className="flex gap-5 border-1 border-white rounded-full p-2 px-5 hover:bg-violet-900 cursor-pointer text-white"
      >
        Sign out
      </button>
    </div>
  );
}
