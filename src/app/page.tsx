import PostList from "@/components/post/post-list";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-screen min-h-screen py-2">
        <PostList />
      </div>
    </>
  );
}
