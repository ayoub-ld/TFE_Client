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
  console.log("ProfilePage component rendering");
  
  const { data: session, status } = useSession() as { 
    data: CustomSession | null; 
    status: "loading" | "authenticated" | "unauthenticated" 
  };
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  console.log("Profile page initial state:", { 
    authStatus: status, 
    userId: session?.user?.id,
    apiUrl: API_URL
  });

  // Memoize fetchUserData to prevent infinite re-renders
  const fetchUserData = useCallback(async (userId: string) => {
    console.log("fetchUserData called with userId:", userId);
    
    if (!userId) {
      console.error("Attempted to fetch user data with empty userId");
      setError("User ID not available. Please try logging in again.");
      setIsLoading(false);
      return;
    }
    
    setError(null);
    setIsLoading(true);
    try {
      // Make sure there's no path duplication
      const userEndpoint = `${API_URL}/user/${userId}`;
      console.log(`Fetching user data from: ${userEndpoint}`);
      
      const response = await axios.get(userEndpoint);
      
      if (response.data && response.data.data) {
        console.log("User data received:", response.data.data);
        setUserData(response.data.data);
      } else {
        console.error("Invalid response format:", response.data);
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error details:", {
          status: error.response?.status,
          data: error.response?.data
        });
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          setError("Authentication error. Please login again.");
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
    console.log("Profile page useEffect running with status:", status);
    
    // Don't do anything if still loading
    if (status === "loading") {
      console.log("Auth is still loading, waiting...");
      return;
    }
    
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      console.log("User is not authenticated, redirecting to login");
      router.push("/login");
      return;
    }

    // Check for user id and fetch data
    const userId = session?.user?.id;
    console.log("User ID from session:", userId);
    
    if (!userId) {
      console.error("User ID not available in session:", session);
      setError("User ID not available. Please try logging in again.");
      setIsLoading(false);
      return;
    }
    
    // Only fetch if we haven't already loaded the data or if the user ID changed
    if (isLoading || !userData || userData.id_user.toString() !== userId.toString()) {
      fetchUserData(userId);
    }
  }, [status, session, router, fetchUserData, userData, isLoading]);

  const handleProfileUpdate = useCallback(() => {
    console.log("handleProfileUpdate called");
    const userId = session?.user?.id;
    if (userId) {
      setImgError(false); // Reset image error state on update
      fetchUserData(userId); // Refresh user data after update
    }
  }, [session, fetchUserData]);

  // Ensure the profile picture has a valid URL
  const getProfilePicture = () => {
    if (imgError || !userData?.profile_picture) {
      return "/default-avatar.jpg";
    }
    return userData.profile_picture;
  };

  console.log("Profile page rendering state:", { 
    isLoading, 
    hasError: !!error, 
    hasUserData: !!userData,
    userData: userData
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10 min-h-[300px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-gray-700 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-700 rounded"></div>
          <p className="mt-4 text-gray-400">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => {
            const userId = session?.user?.id;
            if (userId) fetchUserData(userId);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center p-10">
        <div className="text-center">
          <p className="text-red-500 mb-4">Could not load profile data</p>
          <div className="text-sm text-gray-400 mb-4">
            Debug info: Session status: {status}, User ID: {session?.user?.id || 'Not available'}
          </div>
          <button
            onClick={() => {
              const userId = session?.user?.id;
              if (userId) fetchUserData(userId);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile information section */}
        <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg">
          <div className="flex flex-col items-center">
            {/* Debug info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-900 p-2 mb-4 w-full text-xs">
                <p className="text-green-500">User ID: {userData.id_user}</p>
                <p className="text-green-500">Username: {userData.username}</p>
              </div>
            )}
            
            {/* Add error handling for profile image */}
            <div className="w-32 h-32 rounded-full mb-4 overflow-hidden bg-gray-700 relative">
              <img 
                src={getProfilePicture()} 
                alt={`${userData.username}'s profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("Profile image failed to load, using default");
                  setImgError(true);
                  (e.target as HTMLImageElement).src = "/default-avatar.jpg";
                }}
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{userData.username}</h1>
            <p className="text-gray-400 mb-4">{userData.email}</p>
            
            {/* Check if ProfileEditor is mounting */}
            <div className="w-full">
              <h3 className="text-sm text-gray-400 mb-1">Profile Editor Component:</h3>
              <ProfileEditor 
                userData={userData} 
                onProfileUpdated={handleProfileUpdate} 
              />
            </div>
          </div>
        </div>
        
        {/* User posts section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-6">My Posts</h2>
          {session?.user?.id ? (
            <>
              <div className="mb-4 p-2 bg-gray-800 rounded">
                <p className="text-sm text-gray-400">User Posts Component (ID: {session.user.id}):</p>
              </div>
              <UserPosts userId={session.user.id} />
            </>
          ) : (
            <p className="text-gray-400">User ID not available, cannot load posts</p>
          )}
        </div>
      </div>
    </div>
  );
}