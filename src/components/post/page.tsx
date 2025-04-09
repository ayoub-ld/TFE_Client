"use client";

import {
  HeartIcon,
  PresentationChartLineIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { PostData } from "@/@types/post";

export default function Post(props: PostData) {
  const handleComment = () => {
    console.log("Comment icon clicked");
  };
  const handleFav = () => {
    console.log("Favorite icon clicked");
  };
  const handleStats = () => {
    console.log("Stats icon clicked");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-85 w-200 py-2 bg-gray-800 border-2 border-gray-800 rounded-2xl text-white mb-1">
        <section className="flex flex-col items-start justify-start m-2 pl-45 w-full mb-50">
          <div className="...">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={props?.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{props?.author}</span>
            </div>
            <p>{props?.content}</p>
          </div>
        </section>
        <section className="flex flex-row mx-5 h-18 w-36 gap-5">
          <ChatBubbleLeftIcon
            onClick={handleComment}
            className="hover:text-blue-500 cursor-pointer"
          />
          <HeartIcon
            onClick={handleFav}
            className="hover:text-red-500 cursor-pointer"
          />
          <PresentationChartLineIcon
            onClick={handleStats}
            className="hover:text-amber-500 cursor-pointer"
          />
        </section>
      </div>
    </>
  );
}
