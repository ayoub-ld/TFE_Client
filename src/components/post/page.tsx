"use client";

import {
  HeartIcon as HeartOutline,
  PresentationChartLineIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import type { PostData } from "@/@types/post";

export default function Post({ id, content, author, profilePicture, likes: initialLikes = 0, isLiked: initialIsLiked = false }: PostData) {
  const { data: session } = useSession();
  const [imgError, setImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  // Debug likes on initialization
  useEffect(() => {
    console.log(`Post ${id} initialized with ${initialLikes} likes, isLiked: ${initialIsLiked}`);
  }, [id, initialLikes, initialIsLiked]);

  const handleComment = () => {
    console.log("Comment icon clicked");
  };
  
  const handleFav = async () => {
    if (!session?.user?.id || !id) {
      console.log("User not authenticated or post ID missing", { userId: session?.user?.id, postId: id });
      return;
    }

    setIsLoading(true);
    try {
      const postId = String(id);
      const userId = String(session.user.id);
      
      const endpoint = `${API_URL}/post/${postId}/like`;
      const method = isLiked ? 'delete' : 'post';
      
      console.log(`Sending ${method} request to ${endpoint}`, { 
        userId, 
        userIdType: typeof userId,
        postId,
        postIdType: typeof postId
      });
      
      const response = await axios({
        method,
        url: endpoint,
        data: { userId }
      });
      
      console.log('Like/unlike response:', response.data);

      // Update local state
      setIsLiked(!isLiked);
      setLikes(prevLikes => isLiked ? Math.max(0, prevLikes - 1) : prevLikes + 1);
    } catch (error) {
      console.error("Error toggling like:", error);
      if (axios.isAxiosError(error)) {
        console.error('Request details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStats = () => {
    console.log("Stats icon clicked");
  };

  // Ensure the profile picture has a valid URL
  const getProfilePicture = () => {
    if (imgError || !profilePicture) {
      return "/default-avatar.jpg";
    }

    // If the profile picture is a relative URL without a protocol
    if (profilePicture && !profilePicture.startsWith('http') && !profilePicture.startsWith('/')) {
      return `/${profilePicture}`;
    }

    return profilePicture;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-85 w-180 py-2 bg-gray-800 border-2 border-gray-800 rounded-2xl text-white mb-4">
        <section className="flex flex-col items-start justify-start m-2 pl-20 pt-5 w-full mb-50">
          <div className="...">
            <div className="flex items-center gap-2 mb-5">
              <img
                src={getProfilePicture()}
                alt={`${author}'s profile`}
                className="w-8 h-8 rounded-full object-cover bg-gray-700"
                onError={() => setImgError(true)}
              />
              <span className="font-medium">{author}</span>
            </div>
            <p>{content}</p>
          </div>
        </section>
        <section className="flex flex-row mx-5 h-24 w-32 gap-1">
          <ChatBubbleLeftIcon
            onClick={handleComment}
            className="hover:text-blue-500 cursor-pointer"
          />
            <PresentationChartLineIcon
              onClick={handleStats}
              className="hover:text-amber-500 cursor-pointer"
            />
          <div className="flex items-center gap-1">
            {isLiked ? (
              <HeartSolid
                onClick={isLoading ? undefined : handleFav}
                className={`text-red-500 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
              />
            ) : (
              <HeartOutline
                onClick={isLoading ? undefined : handleFav}
                className={`w-10 hover:text-red-500 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
              />
            )}
            <span className="text-sm">{likes}</span>
          </div>
        </section>
      </div>
    </>
  );
}
