"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "./LoadingIcon";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (usernameRef.current) {
      setUsername(usernameRef.current.value);
    }
    if (passwordRef.current) {
      setPassword(passwordRef.current.value);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const signupRes = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!signupRes.ok) {
        const errorData = await signupRes.json().catch(() => null);
        const errorMessage = errorData?.message || "Signup failed";
        throw new Error(errorMessage);
      }

      const signinRes = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!signinRes.ok) {
        const errorData = await signinRes.json().catch(() => null);
        const errorMessage = errorData?.message || "Signin failed";
        throw new Error(errorMessage);
      }

      router.push("/home");
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm text-center space-y-4">
      <h2 className="text-2xl">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          ref={usernameRef}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button 
          className="themed-button h-10 p-2 grid"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingIcon />
          ) : "Sign Up"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
      <p className="text-sm text-gray-500">
        Have an Account?&nbsp;
        <a href="/signin" className="underline text-accent">
          Sign In
        </a>
      </p>
    </div>
  );
}