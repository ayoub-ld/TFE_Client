"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/post/page";
import { nanoid } from "nanoid";
import type { PostData } from "@/@types/post";
import { useSession } from "next-auth/react";

interface UserPostsProps {
  userId: string;
}

export default function UserPosts({ userId }: UserPostsProps) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      // Include current user ID as query parameter if user is authenticated
      const currentUserId = session?.user?.id;
      const endpoint = currentUserId 
        ? `${API_URL}/post/user/${userId}?currentUserId=${currentUserId}`
        : `${API_URL}/post/user/${userId}`;
        
      const response = await axios.get(endpoint);
      
      if (!response.data?.data) {
        throw new Error("Received empty response from API");
      }

      const fetchedPosts = response.data.data;
      const formattedPosts = fetchedPosts.map((post: any) => ({
        id: post.id_post,
        content: post.content,
        author: post.author?.username || "Unknown",
        profilePicture: post.author?.profile_picture ? `${API_URL}/${post.author.profile_picture}` : "/default-avatar.jpg",
        createdAt: post.created_at,
        likes: post.likes_count || 0,
        isLiked: post.is_liked || false
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserPosts();
    }
  }, [userId, session]); // Also refresh when session changes

  if (loading) {
    return <div className="loader py-5"></div>;
  }

  return (
    <div className="space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={nanoid()} {...post} />)
      ) : (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No posts yet</p>
        </div>
      )}
    </div>
  );
}