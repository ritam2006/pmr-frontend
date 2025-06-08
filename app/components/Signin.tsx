"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingIcon from "./LoadingIcon";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(null);
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

    try {
      const res = await fetch("/api/signin", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.text();

      if (!res.ok) {
        let errorMessage = 'Login failed';

        try {
          const json = JSON.parse(data);
          errorMessage = json.message || errorMessage;
        } catch (_) {}
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
      <h2 className="text-2xl">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input 
          type="text" 
          placeholder="Username"
          value={username}
          ref={usernameRef}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          ref={passwordRef}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button 
          className="themed-button h-10 p-2 grid"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingIcon />
          ) : "Sign In"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
      <p className="text-sm text-gray-500">
        Don't Have an Account?&nbsp;
        <a href="/signup" className="underline text-accent">Sign Up</a>
      </p>
      <p className="text-xs">
        To keep this service running for free, the server will wind down after 15 minutes of inactivity.
        Signing in may take up to a minute during these times. Afterwards, the server will be active again.
      </p>
    </div>
  );
}