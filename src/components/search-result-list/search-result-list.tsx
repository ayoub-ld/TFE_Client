import SearchResult from "../search-result/search-result";
import { nanoid } from "nanoid";

export default function SearchResultList({
  results,
}: {
  results: Array<{
    id: string;
    content: string;
    author: string;
    profilePicture: string;
  }>;
}) {
  return (
    <div className="results-list w-full max-w-2xl">
      {results.map((post) => (
        <SearchResult key={nanoid()} post={post} />
      ))}
    </div>
  );
}
