"use client";

import { UserButton } from "@clerk/nextjs";
import { ChartColumnBigIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const router = useRouter();
  const goToDashboard = () => {
    router.push("/money/dashboard");
  };

  return (
    <UserButton
      showName
      appearance={{
        elements: { userButtonOuterIdentifier: { color: "white" } },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Action label="Dashboard" labelIcon={<ChartColumnBigIcon size={16} />} onClick={goToDashboard} />
      </UserButton.MenuItems>
    </UserButton>
  );
};
