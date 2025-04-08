"use client";
import axios from "axios";
import { useState } from "react";

export default function SearchBar({
  setResults,
}: {
  setResults: (results: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  async function fetchData(value: string): Promise<void> {
    try {
      const response = await axios.get(`${API_URL}/search?q=${value}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(input);
  };

  return (
    <form onSubmit={handleSearch} className="mt-4">
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
