import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-row h-30 w-full bg-gray-900 border-t-2 border-gray-800 rounded-b-2xl text-white justify-center items-center">
      <p>
        This website was realised by{" "}
        <Link href="https://github.com/ayoub-ld/" className="hover:underline">
          Ayoub
        </Link>{" "}
        in April 2025
      </p>
    </div>
  );
}
