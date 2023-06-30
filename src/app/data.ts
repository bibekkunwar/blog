import { EmailValidator } from "@angular/forms";

export interface LoginResponse {
  access: string;
  refresh: string;
  user_email: string;
}

export interface BlogList {
  id: number;
  user_id: number;
  blog_title: string;
  blog_summary: string,
  blog_content: string,
  blog_header_image: string
}

export interface Blog {
  id: number;
  blog_title: string;
  blog_summary: string;
  blog_content: string;
  blog_header_image: string | null;
  user_id: number;
  user: number;
}

export interface BlogListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
}


export interface CreatePost {
  title: string;
  summary: string;
  description: string;
  image: string;
}
