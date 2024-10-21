import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
  jwt?: string;
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: "woJQmspoZkcjpgbh7+0PvjCrHj/YC8n2jopnKFUyFYU=",
  cookieName: "strapi-otp-app",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

// export function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
