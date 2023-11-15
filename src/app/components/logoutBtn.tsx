"use client";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <button
      className="relative mt-8 py-2 px-6 w-fit bg-blue-400 rounded-xl "
      onClick={() => {
        signOut({ callbackUrl: "http://localhost:3000/" });
      }}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
