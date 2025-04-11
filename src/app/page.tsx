import PostList from "@/components/post/post-list";
import CreatePost from "@/components/post/create-post";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-screen min-h-screen py-2">
        <CreatePost />
        <PostList />
      </div>
    </>
  );
}
