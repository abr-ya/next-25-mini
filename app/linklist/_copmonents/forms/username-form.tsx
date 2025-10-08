"use client";

import { useState } from "react";

import { createLinkPage } from "@linklist/_data/crudLinkPage";
import { SubmitButton } from "..";

export const UsernameForm = ({ desiredUsername }: { desiredUsername: string }) => {
  const [taken, setTaken] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const result = await createLinkPage(formData);
    console.log(result);

    setTaken(result === false);
    if (result) console.log("redirecting..."); // redirect("/linklist/account");
  };

  return (
    <form action={handleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2">Grab your username</h1>
      <p className="text-center mb-6 text-gray-500">Choose your username</p>
      <div className="max-w-xs mx-auto">
        <input
          name="username"
          className="block p-2 mx-auto border w-full mb-2 text-center"
          defaultValue={desiredUsername}
          type="text"
          placeholder="username"
        />
        {taken && <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">This username is taken</div>}
        <SubmitButton>
          <span>Claim your username</span>
        </SubmitButton>
      </div>
    </form>
  );
};
