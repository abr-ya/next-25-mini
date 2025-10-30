"use client";

import { useFormStatus } from "react-dom";

interface ISubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const SubmitButton = ({ children, className = "" }: ISubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "bg-blue-500 disabled:bg-blue-400 text-white disabled:text-gray-200 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center " +
        className
      }
    >
      {pending && <span>Saving...</span>}
      {!pending && children}
    </button>
  );
};
