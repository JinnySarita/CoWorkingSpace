"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, redirect: true });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <h1>Sign In</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
