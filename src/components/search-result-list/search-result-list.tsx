import SearchResult from "../search-result/search-result";

export default function SearchResultList({ results }: { results: string[] }) {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
}
