export default function Recherche() {
  return (
    <>
      <h1>Recherche</h1>
      <form action="" className="mt-4">
        <label htmlFor="search-input"></label>
        <input
          type="text"
          id="search-input"
          name="search-input"
          title="Research input"
          placeholder="Find a post"
          className="border-white-100 border-1 p-1.5 rounded-md mx-2.5"
        />
        <button
          type="submit"
          className="border-1 hover:bg-violet-600 active:bg-violet-700 p-1.5 rounded-md mx-2.5"
        >
          Rechercher
        </button>
      </form>
    </>
  );
}
