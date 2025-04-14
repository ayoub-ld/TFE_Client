"use client";

import SearchBar from "@/components/search-bar/search-bar";
import SearchResultList from "@/components/search-result-list/search-result-list";
import { useState } from "react";

export default function Recherche() {
  const [results, setResults] = useState<Array<{
    id: string;
    content: string;
    author: string;
    profilePicture: string;
  }>>([]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Recherche</h1>
      <SearchBar setResults={setResults} />
      <SearchResultList results={results} />
    </div>
  );
}
