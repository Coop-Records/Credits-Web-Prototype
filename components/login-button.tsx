"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  const isLoggedIn = authenticated && ready;
  return (
    <button
      onClick={isLoggedIn ? logout : login}
      className={`mb-4 px-4 py-2 text-white rounded transition ${
        isLoggedIn
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
}
