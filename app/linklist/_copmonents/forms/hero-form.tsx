"use client";

import { useUser } from "@clerk/nextjs";
import { LoginButtons } from "..";
import { useRouter } from "next/navigation";

export const HeroForm = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector("input");
    if (input && input.value.length > 0) {
      const username = input.value;
      router.push(`/linklist/account?desiredUsername=${username}`);
    } else {
      alert("Please enter a username!");
    }
  };

  if (!isSignedIn)
    return (
      <div className="flex flex-col items-start">
        <span>Sign in to continue...</span>
        <LoginButtons />
      </div>
    );

  return (
    <form onSubmit={submitHandler} className="inline-flex items-center shadow-lg bg-white shadow-gray-500/20">
      <span className="bg-white py-4 pl-4">linklist.to/</span>
      <input
        type="text"
        className=""
        style={{ backgroundColor: "white", marginBottom: 0, paddingLeft: 0 }}
        placeholder="username"
      />
      <button type="submit" className="bg-blue-500 text-white py-4 px-6 whitespace-nowrap">
        Join for Free
      </button>
    </form>
  );
};
