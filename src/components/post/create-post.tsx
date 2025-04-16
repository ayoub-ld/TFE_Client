"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { CreatePostProps } from "@/@types/post";

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!session?.user?.id) throw new Error("User not authenticated");

      await axios.post(`${API_URL}/post`, {
        content,
        author_id: session.user.id,
      });

      setContent("");

      // Call the onPostCreated callback to trigger a refresh
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row text-white p-5 mb-20 w-160 max-h-50 min-h-50"
    >
      <textarea
        className="w-full h-full p-5 border-2 border-black bg-gray-800 rounded-md max-h-50 min-h-50"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's up?"
        required
      />
      <button
        type="submit"
        className="ml-5 mt-15 p-4 border-1 rounded-2xl border-white hover:bg-gray-900 max-h-18 min-h-18 cursor-pointer"
      >
        Send
      </button>
    </form>
  );
}
