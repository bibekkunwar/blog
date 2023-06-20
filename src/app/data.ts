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

export interface RegisterResponse {
  username: string;
  password : string;
  password2 : string;
  email: string;
  firstName: string;
  lastName: string;
}


export interface CreatePost {
  title: string;
  summary: string;
  description: string;
  image: string;
}
