"use client";

import { useState } from "react";
import Image from "next/image";

import { SectionBox, SubmitButton } from "..";
import { updateLinkPage } from "@linklist/_data/crudLinkPage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IPageSettingsFormProps {
  page: {
    id: number;
    bgType: "color" | "image";
    bgColor: string;
    bgImage: string | null;
    userImage: string | null;
    displayName: string | null;
    location: string | null;
    bio: string | null;
  };
}

export const PageSettingsForm = ({ page }: IPageSettingsFormProps) => {
  const router = useRouter();

  const [bgType] = useState<"color" | "image">(page.bgType);
  const [bgColor, setBgColor] = useState<string>(page.bgColor);
  const [bgImage] = useState<string | null>(page.bgImage);

  const saveBaseSettings = async (formData: FormData) => {
    const payload = Object.fromEntries(formData);
    const result = await updateLinkPage(page.id, payload);

    console.log("result", result);
    if (!result.error) {
      router.refresh();
      toast.success("LinkPage has been updated!"); // todo: Green theme!
    }
  };

  const avatar = page.userImage || "https://gravatar.com/avatar/?d=mp&f=y";

  return (
    <SectionBox>
      <form action={saveBaseSettings}>
        <div
          className="py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
          style={bgType === "color" ? { backgroundColor: bgColor } : { backgroundImage: `url(${bgImage})` }}
        >
          <div>
            {bgType === "color" && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                <div className="flex gap-2 justify-center">
                  <span>Background color:</span>
                  <input
                    type="color"
                    name="bgColor"
                    onChange={(ev) => setBgColor(ev.target.value)}
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}
            {bgType === "image" && <div className="flex justify-center">todo: image upload</div>}
          </div>
        </div>
        <div className="flex justify-center -mb-12">
          <div className="relative -top-8 w-[128px] h-[128px]">
            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
              <Image className="w-full h-full object-cover" src={avatar} alt={"avatar"} width={128} height={128} />
            </div>
          </div>
        </div>
        <div className="p-0">
          <label className="input-label" htmlFor="nameIn">
            Display name
          </label>
          <input
            type="text"
            id="nameIn"
            name="displayName"
            defaultValue={page.displayName || ""}
            placeholder="John Doe"
          />
          <label className="input-label" htmlFor="locationIn">
            Location
          </label>
          <input
            type="text"
            id="locationIn"
            name="location"
            defaultValue={page.location || ""}
            placeholder="Somewhere in the world"
          />
          <label className="input-label" htmlFor="bioIn">
            Bio
          </label>
          <textarea name="bio" defaultValue={page.bio || ""} id="bioIn" placeholder="Your bio goes here..." />
          <div className="max-w-[200px] mx-auto">
            <SubmitButton>Save Settings</SubmitButton>
          </div>
        </div>
      </form>
    </SectionBox>
  );
};
