"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/post/page";
import type { PostData } from "@/@types/post";
import { nanoid } from "nanoid";

export default function PostList({ refreshTrigger = 0 }) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/post?limit=15`, {
        timeout: 5000,
      });

      // Add error boundary for empty responses
      if (!response.data?.data) {
        throw new Error("Received empty response from API");
      }

      const fetchedPosts = response.data.data;

      const formattedPosts = fetchedPosts.map((post: any) => {
        // Fix profile picture URL handling
        let profilePic = post.author?.profile_picture || "/default-avatar.jpg";
        
        // Keep original URL for http/https URLs (like from Google)
        if (profilePic && (profilePic.startsWith('http://') || profilePic.startsWith('https://'))) {
          // No change needed for complete URLs
        }
        // Add leading slash for relative URLs without one
        else if (profilePic && !profilePic.startsWith('/')) {
          profilePic = `/${profilePic}`;
        }
        
        return {
          id: post.id_post, // Make sure id is included
          content: post.content,
          author: post.author?.username || "Unknown",
          profilePicture: profilePic,
          createdAt: post.created_at,
          likes: post.likes_count || 0,
          isLiked: post.is_liked || false
        };
      });

      setPosts(formattedPosts);
    } catch (error) {
      console.error("API Error Details:", {
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
        config: error instanceof axios.AxiosError ? error.config : undefined,
        response:
          error instanceof axios.AxiosError ? error.response : undefined,
      });
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

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
