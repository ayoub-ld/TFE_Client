"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/post/page";
import type { PostData } from "@/@types/post";
import { nanoid } from "nanoid";

export default function PostList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/post?limit=15`);
        const fetchedPosts = response.data?.data || [];

        // Map API response to PostData format
        const formattedPosts = fetchedPosts.map((post: any) => ({
          content: post.content,
          author: post.author?.username || "Unknown",
          profilePicture: post.author?.profilePicture || "/default-avatar.jpg",
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loader py-5"></div>;
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={nanoid()} {...post} />)
      ) : (
        <div className="text-center py-10">No posts found</div>
      )}
    </>
  );
}
