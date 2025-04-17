"use client";

import SearchBar from "@/components/search-bar/search-bar";
import SearchResultList from "@/components/search-result/search-result-list";
import { useState } from "react";

export default function Recherche() {
  const [results, setResults] = useState<Array<{
    id: string;
    content: string;
    author: string;
    profilePicture: string;
  }>>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResults = (searchResults: Array<{
    id: string;
    content: string;
    author: string;
    profilePicture: string;
  }>) => {
    setResults(searchResults);
    setHasSearched(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Recherche</h1>
      <SearchBar setResults={handleSearchResults} />
      <SearchResultList results={results} hasSearched={hasSearched} />
    </div>
  );
}
