export default function CreatePost() {
  return (
    <>
      <form className="flex flex-row text-white p-5 mb-20 w-160 max-h-50 min-h-50">
        <textarea
          className="w-full h-full p-5 border-2 border-black bg-gray-800 rounded-md max-h-50 min-h-50"
          rows={4}
          cols={50}
          title="Add a new post"
          placeholder="What's up?"
        />
        <button
          type="button"
          className="ml-5 mt-15 p-4 border-1 rounded-2xl border-white hover:bg-gray-900 max-h-18 min-h-18 cursor-pointer"
        >
          Send
        </button>
      </form>
    </>
  );
}
