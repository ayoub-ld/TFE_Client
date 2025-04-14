"use client";

import PostList from "@/components/post/post-list";
import CreatePost from "@/components/post/create-post";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    // Increment the refresh key to trigger a re-fetch in PostList
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-screen min-h-screen py-2">
        <CreatePost onPostCreated={handlePostCreated} />
        <PostList refreshTrigger={refreshKey} />
      </div>
    </>
  );
}
