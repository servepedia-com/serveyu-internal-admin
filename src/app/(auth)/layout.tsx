import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen justify-between">
      <div className="border-r flex-1 hidden md:block"></div>
      <div className="flex-1 m-auto flex items-center justify-center px-6">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
