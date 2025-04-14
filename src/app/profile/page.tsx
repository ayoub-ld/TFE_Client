"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserPosts from "@/components/profile/user-posts";
import ProfileEditor from "@/components/profile/profile-editor";
import { UserData } from "@/@types/user";
import { CustomSession } from "@/@types/session";


export default function ProfilePage() {
  const { data: session, status } = useSession() as { 
    data: CustomSession | null; 
    status: "loading" | "authenticated" | "unauthenticated" 
  };
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  // Memoize fetchUserData to prevent infinite re-renders
  const fetchUserData = useCallback(async (userId: number) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      if (response.data && response.data.data) {
        setUserData(response.data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setError("Authentication error. Please login again.");
          // Redirect to login if it's an auth error
          router.push("/login");
        } else {
          setError(error.response?.data?.message || "Failed to load profile data. Please try again later.");
        }
      } else {
        setError("Failed to load profile data. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, router]); // Only API_URL and router need to be dependencies

  useEffect(() => {
    // Handle loading state
    if (status === "loading") return;
    
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Check for user id and fetch data
    const userId = session?.user?.id;
    if (userId) {
      fetchUserData(userId);
    }
  }, [session, status, router, fetchUserData]);

  const handleProfileUpdate = () => {
    const userId = session?.user?.id;
    if (userId) {
      fetchUserData(userId); // Refresh user data after update
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10 min-h-[300px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-gray-700 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center p-10 text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div className="flex justify-center p-10">Could not load profile data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile information section */}
        <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg">
          <div className="flex flex-col items-center">
            {/* Add error handling for profile image */}
            <div className="w-32 h-32 rounded-full mb-4 overflow-hidden bg-gray-700 relative">
              <img 
                src={userData.profile_picture || "/default-avatar.jpg"} 
                alt={`${userData.username}'s profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If image fails to load, replace with default
                  (e.target as HTMLImageElement).src = "/default-avatar.jpg";
                }}
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{userData.username}</h1>
            <p className="text-gray-400 mb-4">{userData.email}</p>
            <ProfileEditor 
              userData={userData} 
              onProfileUpdated={handleProfileUpdate} 
            />
          </div>
        </div>
        
        {/* User posts section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-6">My Posts</h2>
          <UserPosts userId={userData.id_user.toString()} />
        </div>
      </div>
    </div>
  );
}