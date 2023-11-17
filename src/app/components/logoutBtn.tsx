"use client";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <button
      className="relative mt-8 py-1 px-6 w-fit bg-red-500 rounded-xl "
      onClick={() => {
        signOut({ callbackUrl: "http://localhost:3000/" });
      }}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
