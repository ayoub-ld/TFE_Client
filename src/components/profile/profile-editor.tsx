"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { UserData } from "@/@types/user";

interface ProfileEditorProps {
  userData: UserData;
  onProfileUpdated: () => void;
}

export default function ProfileEditor({ userData, onProfileUpdated }: ProfileEditorProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(userData.username);
  const [profilePicture, setProfilePicture] = useState(userData.profile_picture);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!session?.user?.id) throw new Error("Not authenticated");

      await axios.put(`${API_URL}/user/${userData.id_user}`, {
        username,
        profile_picture: profilePicture,
      });

      onProfileUpdated();
      setIsEditing(false);
    } catch (error) {
        console.error("Error updating profile:", error);
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.error || 
            "Failed to update profile. Please try again."
          );
        } else {
          setError("Failed to update profile. Please try again.");
        }
      } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <button type="button"
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 border-2 border-gray-400 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Edit Profile
      </button>
    );
  }

  return (
    <div className="w-full mt-4">
      <h3 className="flex items-center justify-between text-lg font-medium text-white mb-3">Edit Profile : </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm text-gray-300">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="profilePicture" className="block text-sm text-gray-300">
            Profile Picture URL
          </label>
          <input
            id="profilePicture"
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <div className="flex space-x-3 mt-3 gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border-2 border-gray-400 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setUsername(userData.username);
              setProfilePicture(userData.profile_picture);
            }}
            className="px-4 py-2 border-2 border-gray-400 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}