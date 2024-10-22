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
  password: "complex_password_at_least_32_characters_long",
  cookieName: "strapi-otp-app",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
