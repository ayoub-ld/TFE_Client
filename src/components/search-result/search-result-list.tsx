import SearchResult from "../search-result/search-result";
import { nanoid } from "nanoid";

export default function SearchResultList({
  results,
  hasSearched = false,
}: {
  results: Array<{
    id: string;
    content: string;
    author: string;
    profilePicture: string;
  }>;
  hasSearched?: boolean;
}) {
  return (
    <div className="results-list w-full max-w-2xl">
      {results.length > 0 ? (
        results.map((post) => <SearchResult key={nanoid()} post={post} />)
      ) : (
        hasSearched && <p className="pt-3">No result found</p>
      )}
    </div>
  );
}
