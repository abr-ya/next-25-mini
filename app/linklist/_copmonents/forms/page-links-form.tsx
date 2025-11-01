"use client";

import { useState } from "react";
import Link from "next/link";
import { ReactSortable } from "react-sortablejs";
import { toast } from "sonner";
import { CirclePlus, GripHorizontal, Save, Trash2 } from "lucide-react";

import { SectionBox } from "../layout/section-box";
import { SubmitButton } from "../buttons/SubmitButton";
import { IAppLink } from "@linklist/_interfaces/link.interface";
import { createLink, updateLinksOrder } from "@linklist/_data/crudLink";

interface IPageLinksFormProps {
  data: IAppLink[];
  pageId: number;
}

interface IFormLink extends IAppLink {
  isNew?: boolean;
}

export const PageLinksForm = ({ data, pageId }: IPageLinksFormProps) => {
  const [links, setLinks] = useState<IFormLink[]>(data || []);

  const dragHandler = (orderedLinks: IFormLink[]) => {
    console.log(orderedLinks);
    const newLinks = orderedLinks.map((link, index) => ({ ...link, order: index }));
    setLinks(newLinks);
  };

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
    const newLinks = links.filter((l) => l.isNew);
    const updatedLinks = links.filter((l) => !l.isNew).map(({ id, order }) => ({ id, order }));

    // Create new links
    console.log("New links to create:", newLinks);
    const result1 = await Promise.all(
      newLinks.map((link) =>
        createLink({ title: link.title, url: link.url, description: link.description, order: link.order }, pageId),
      ),
    );
    console.log(result1);
    setLinks((prev) => prev.map((l) => ({ ...l, isNew: false })));

    // Update existing links
    // todo: optimize to avoid updating links that didn't change order!
    console.log("Existing links to update:", updatedLinks);
    const result2 = await updateLinksOrder(updatedLinks);
    console.log(result2);

    if (!result2.error) {
      toast.success("LinkPage has been updated!"); // todo: Green theme!
    }
  };

  const removeLinkHandler = (id: number) => {
    console.log("remove", id);
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
          <ReactSortable handle={".handle"} list={links} setList={dragHandler}>
            {links.map((l) => (
              <div key={l.id} className="mt-2 md:flex gap-4 items-center">
                <div className="handle text-gray-500 cursor-move">
                  <GripHorizontal />
                </div>
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
                  </div>
                ) : (
                  <div className="grow">
                    <Link href={l.url} target="_blank" className="text-blue-500 underline">
                      {l.title}
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => removeLinkHandler(l.id)}
                  type="button"
                  className="bg-gray-300 px-3 h-full flex gap-2 items-center justify-center cursor-pointer rounded"
                >
                  <Trash2 size={18} />
                  <span>Remove this link</span>
                </button>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="max-w-[200px] mx-auto">
          <SubmitButton>
            <Save />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
};
