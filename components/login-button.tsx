"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";

export default function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  const isLoggedIn = authenticated && ready;
  return (
    <Button
      variant={isLoggedIn ? "destructive" : "default"}
      className="px-5"
      onClick={isLoggedIn ? logout : login}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  );
}
