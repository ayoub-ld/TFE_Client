export interface PostType {
  id: string;
  content: string;
  author: string;
  profilePicture: string;
}

export interface PostData {
  id: string;
  content: string;
  author: string;
  profilePicture: string;
  createdAt?: string;
  likes?: number;
  isLiked?: boolean;
}

export type CreatePostProps = {
  onPostCreated?: () => void;
};