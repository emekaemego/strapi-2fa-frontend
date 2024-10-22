"use client";

import { useActionState } from "react";
import { logout } from "../auth/actions";

export default function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [state, formAction] = useActionState(logout, null);

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <a className="text-3xl font-bold leading-none" href="/">
          Strapi 2FA
        </a>

        {isLoggedIn && <a href="/dashboard">Dashboard</a>}

        <div>
          {!isLoggedIn && (
            <>
              <a
                className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
                href="/auth/login"
              >
                Sign In
              </a>
              <a
                className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                href="/auth/register"
              >
                Sign up
              </a>
            </>
          )}
          {isLoggedIn && (
            <>
              <form action={formAction}>
                <button className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
                  Logout
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
