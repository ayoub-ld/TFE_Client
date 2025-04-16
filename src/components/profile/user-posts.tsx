"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  const fetchUserPosts = useCallback(async () => {
    if (!userId) {
      setError("User ID is required to fetch posts");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      // Include current user ID as query parameter if user is authenticated
      const currentUserId = session?.user?.id;
      
      // Make sure there's no path duplication and handle URL properly
      const endpoint = `${API_URL}/post/user/${userId}${currentUserId ? `?currentUserId=${currentUserId}` : ''}`;
        
      const response = await axios.get(endpoint);
      
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
          id: post.id_post,
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
      if (axios.isAxiosError(error)) {
        console.error("API Error details:", {
          status: error.response?.status,
          data: error.response?.data
        });
      }
      setError("Failed to load posts. Please try again later.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL, userId, session]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]); // Only need to add fetchUserPosts since userId is included in its dependencies

  return (
    <div className="space-y-6">
      {loading && (
        <div className="loader py-5">
          <p className="text-gray-400">Loading posts...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => fetchUserPosts()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div>
          {posts.length > 0 ? (
            posts.map((post) => <Post key={nanoid()} {...post} />)
          ) : (
            <div className="text-center py-10 bg-gray-800 rounded-lg">
              <p className="text-gray-400">No posts yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}