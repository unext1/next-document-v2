"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
