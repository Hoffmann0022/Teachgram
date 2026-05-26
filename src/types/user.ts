export interface User {
  id: number;
  name: string;
  userName: string;
  phone: string;
  mail: string;
  profileLink: string;
  bio: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  name: string;
  userName: string;
  mail: string;
  phone?: string;
  password: string;
  profileLink?: string;
  bio?: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}