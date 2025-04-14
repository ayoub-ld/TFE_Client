export interface PostType {
  id: string;
  content: string;
  author: string;
  profilePicture: string;
}

export interface PostData {
  content: string;
  author: string;
  profilePicture: string;
  createdAt?: string;
}

export type CreatePostProps = {
  onPostCreated?: () => void;
};