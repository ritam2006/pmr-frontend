"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingIcon from "./LoadingIcon";

export default function SignOut() {
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });

    router.push("/signin");
  }


  return (
    <button 
      className="themed-button text-lg px-3 py-2 w-28 h-11 grid" 
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingIcon />
      ) : "Sign Out"}
    </button>
  );
}