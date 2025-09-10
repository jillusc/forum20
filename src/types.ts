export interface Post {
  // required fields guaranteed by the backend/serializer:
  id: number; // id of post, auto-generated
  owner_id: number;
  owner: string; // username of post creator
  profile_id: number | null;
  profile_image: string | null;
  title: string;
  content: string;
  image: string; // URL
  is_private: boolean;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  // nullable fields (included in response but can have no value):
  artist_name: string | null;
  year_of_artwork: number | null;
  like_id: number | null;
  bookmark_id: number | null;
  is_owner: boolean | null;
  // nested arrays
  likes: Like[];
  comments: Comment[];
}

export interface User {
  pk: number;
  username: string;
  profile_id: number;
  profile_image?: string;
  email?: string; // optional
  first_name?: string; // optional
  last_name?: string; // optional
}

export interface Profile {
  id: number; // profile id
  owner: string; // username
  created_at: string;
  updated_at: string;
  name: string; // optional display name
  content: string; // optional profile bio
  image?: string | null; // optional avatar
  is_owner: boolean;
  following_id?: number | null;
  posts_count: number;
  followers_count: number;
  following_count: number;
}

export interface Like {
  owner_id: number;
  username: string;
}

export interface Comment {
  id: number;
  owner: string;
  is_owner: boolean;
  profile_id: number;
  profile_image: string | null;
  post: number;
  post_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Errors {
  image?: string;
  title?: string;
  content?: string;
  artist_name?: string;
  year_of_artwork?: string;
}
