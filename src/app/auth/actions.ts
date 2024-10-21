"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SessionData, defaultSession, sessionOptions } from "./lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const API_URL = "http://localhost:1337/api";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
  }

  return session;
}

export const register = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    return { message: json?.error?.message || "Something went wrong" };
  }

  redirect(`/auth/login`);
};

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };

  const res = await fetch(`${API_URL}/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    return { message: json?.error?.message || "Something went wrong" };
  }

  redirect(`/auth/verify-code?e=${json.email}&vt=${json.verifyType}`);
};

export const verifyCode = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    code: formData.get("code"),
    type: formData.get("type"),
  };

  if (!data.code) return { message: "'code' is required" };

  const res = await fetch(`${API_URL}/auth/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    return { message: json?.error?.message || "Something went wrong" };
  }

  const session = await getSession();

  session.username = json.user.username;
  session.isLoggedIn = true;
  session.jwt = json.jwt;

  await session.save();

  revalidatePath("/dashboard");

  redirect("/dashboard");
};

export async function logout() {
  const session = await getSession();
  session.destroy();
  revalidatePath("/dashboard");
}

export async function generateSecret() {
  const session = await getSession();

  const res = await fetch(`${API_URL}/auth/generate-totp-secret`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  const result = await res.json();

  return result;
}

export async function saveTotpSecret(prevState: any, formData: FormData) {
  const data = {
    code: formData.get("code"),
    secret: formData.get("secret"),
  };

  if (!data.code) return { message: "'code' is required" };

  const session = await getSession();

  const res = await fetch(`${API_URL}/auth/save-totp-secret`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwt}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    return { message: json?.error?.message || "Something went wrong" };
  }

  redirect("/auth/app-setup-success");
}

export async function checkTotpStatus() {
  const session = await getSession();

  const res = await fetch(`${API_URL}/auth/totp-enabled`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwt}`,
    },
  });

  const result: { enabled: boolean } = await res.json();

  return result;
}
