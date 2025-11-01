"use client";

import { CirclePlus, Save } from "lucide-react";
import { SectionBox } from "../layout/section-box";
import { SubmitButton } from "../buttons/SubmitButton";
import { IAppLink } from "@linklist/_interfaces/link.interface";
import { useState } from "react";
import { createLink } from "../../_data/crudLink";
import Link from "next/link";

interface IPageLinksFormProps {
  data: IAppLink[];
  pageId: number;
}

interface IFormLink extends IAppLink {
  isNew?: boolean;
} // Omit<ILink, "id">

export const PageLinksForm = ({ data, pageId }: IPageLinksFormProps) => {
  const [links, setLinks] = useState<IFormLink[]>(data || []);

  const newLinkHandler = () => {
    console.log("Add new link");
    setLinks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        url: "",
        description: "",
        order: prev.length,
        isNew: true,
      },
    ]);
  };

  const changeLink = (id: number, field: keyof IFormLink, value: string) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const saveLinksHandler = async () => {
    console.log("Saving links:", links);
    const newLinks = links.filter((l) => l.isNew);
    console.log("New links to create:", newLinks);

    // Create new links
    const createdLinks = await Promise.all(
      newLinks.map((link) =>
        createLink({ title: link.title, url: link.url, description: link.description, order: link.order }, pageId),
      ),
    );

    console.log(createdLinks);

    // Update existing links
  };

  return (
    <SectionBox>
      <form action={saveLinksHandler}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={newLinkHandler}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <CirclePlus />
          <span>Add new</span>
        </button>
        <div>
          {links.map((l) => (
            <div key={l.id} className="mt-2 md:flex gap-6 items-center">
              {l.isNew ? (
                <div className="grow">
                  <label className="input-label">Title:</label>
                  <input
                    value={l.title}
                    onChange={(ev) => changeLink(l.id, "title", ev.target.value)}
                    type="text"
                    placeholder="title"
                    required
                  />
                  <label className="input-label">Description:</label>
                  <input
                    value={l.description || ""}
                    onChange={(ev) => changeLink(l.id, "description", ev.target.value)}
                    type="text"
                    placeholder="description (optional)"
                  />
                  <div className="flex items-center gap-4">
                    <div className="grow">
                      <label className="input-label">URL:</label>
                      <input
                        value={l.url}
                        onChange={(ev) => changeLink(l.id, "url", ev.target.value)}
                        type="url"
                        placeholder="url"
                        required
                      />
                    </div>
                    <div>
                      <SubmitButton>
                        <Save />
                        <span>Save</span>
                      </SubmitButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grow">
                  <Link href={l.url} target="_blank" className="text-blue-500 underline">
                    {l.title}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="max-w-[200px] mx-auto">
          <SubmitButton>
            <Save />
            <span>Save (order?)</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};
