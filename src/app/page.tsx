import Post from "@/components/post/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-220 min-h-screen py-2 bg-gray-600 border-2 border-gray-800 rounded-2xl">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
}
