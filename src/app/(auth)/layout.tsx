"use client";
import React, { useEffect, useState } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <div className="flex h-screen w-screen justify-between">
      <div className="border-r flex-1 hidden md:block"></div>
      <div className="flex-1 m-auto flex items-center justify-center px-6">
        {children}
      </div>
    </div>
  ) : null;
}

export default AuthLayout;
