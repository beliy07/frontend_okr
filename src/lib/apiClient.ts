import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import WebApp from "@twa-dev/sdk";
import type {
  Avatar,
  GenerateRequest,
  GenerateResponse,
  Generation,
  Limits,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (WebApp.initData) {
    config.headers.Authorization = WebApp.initData;
  } else {
    config.headers.Authorization =
      "user=%7B%22id%22%3A1078933321%2C%22first_name%22%3A%22vladislav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22vlad_nny%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F7Q1BeZfVGVgR5MD3OE3XPEanf07pu_LX7-yFtUvcF0I.svg%22%7D&chat_instance=-487839019025649989&chat_type=private&auth_date=1765642428&signature=rqwqSY7iE8H2AuanRTmJr-YFjzwtykFvhXW2I7N0eNDOhsOPJPxCHwV1K1gVPa8OdIhKSLxyglfcHtjTjeH-Bg&hash=8b0a391996baf6be98eec7ac6cb1dc24db04e599bec8ab61252855465ff94fd6";
  }
  return config;
});

export const apiClient = {
  async getAvatars(): Promise<Avatar[]> {
    const response = await axiosInstance.get<Avatar[]>("/avatars");
    return response.data;
  },

  async generate(data: GenerateRequest) {
    const response = await axiosInstance.post<GenerateResponse>(
      "/generate",
      data
    );
    return response.data;
  },

  async getGenerations(): Promise<Generation[]> {
    const response = await axiosInstance.get<Generation[]>("/generations");
    return response.data;
  },

  async getGeneration(id: string): Promise<Generation | undefined> {
    try {
      const response = await axiosInstance.get<Generation>(
        `/generations/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return undefined;
      }
      throw error;
    }
  },

  async getLimits(): Promise<Limits> {
    const response = await axiosInstance.get<Limits>("/limits");
    return response.data;
  },
};
