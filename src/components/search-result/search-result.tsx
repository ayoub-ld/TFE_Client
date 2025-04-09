import Post from "../post/page";

export default function SearchResult({
  post
}: {
  post: {
    id: string;
    content: string;
    author: string;
    profilePicture: string;
  }
}) {
  return <Post postData={post} />;
}
