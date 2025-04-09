import Post from "../post/page";
import type { PostData } from "@/@types/post";

export default function SearchResult({ post }: { post: PostData }) {
  return <Post {...post} />;
}
