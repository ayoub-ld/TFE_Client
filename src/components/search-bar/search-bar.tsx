"use client";
import axios from "axios";
import { useState } from "react";

export default function SearchBar({
  setResults,
}: {
  setResults: (
    results: Array<{
      id: any;
      content: any;
      author: any;
      profilePicture: any;
    }>
  ) => void;
}) {
  const [input, setInput] = useState("");
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  async function fetchData(value: string): Promise<void> {
    try {
      const response = await axios.get(`${API_URL}/post/search?q=${value}`);
      // Ensure we get proper post objects
      const results = response.data?.data || [];

      // Map to Post component expected format
      const posts = (Array.isArray(results) ? results : [results]).map(
        (post) => ({
          id: post.id,
          content: post.content,
          author: post.author?.username || "Unknown",
          profilePicture: post.author?.profilePicture || "/default-avatar.jpg",
        })
      );

      setResults(posts);
      console.log("Search results =>:", posts);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        setResults([
          {
            id: "error",
            content: "Error loading results",
            author: "System",
            profilePicture: "/error-icon.png",
          },
        ]);
      }
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(input);
  };

  return (
    <form onSubmit={handleSearch} className="my-5">
      <label htmlFor="search-input"></label>
      <input
        type="search"
        id="search-input"
        name="search-input"
        title="Research input"
        placeholder="Find a post"
        className="border-white-100 border-1 p-1.5 rounded-md mx-2.5"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="border-1 hover:bg-violet-600 active:bg-violet-700 p-1.5 rounded-md mx-2.5"
      >
        Rechercher
      </button>
    </form>
  );
}
