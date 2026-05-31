import api from "./api";
import type { LoginRequest, LoginResponse, SignupRequest, User } from "../types/user";

export const authService = {
  signup: (data: SignupRequest) =>
    api.post<User>("/users/signup", data).then((res) => res.data),
  
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/users/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", String(res.data.user.id));
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getAll: () =>
    api.get<User[]>("/users").then((res) => res.data),

  getById: (id: number) =>
    api.get<User>(`/users/${id}`).then((res) => res.data),

  update: (id: number, data: Partial<SignupRequest>) =>
    api.put<User>(`/users/${id}`, data).then((res) => res.data),

  delete: (id: number) =>
    api.delete(`/users/${id}`),
};