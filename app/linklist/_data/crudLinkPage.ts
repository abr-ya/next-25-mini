"use server";

import { neon } from "@/db";
import { linkPagesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { IUpdateLinkPage } from "../_interfaces/link-page.interface";

export const createLinkPage = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) return false;

  const username = formData.get("username");

  // todo: add message for invalid username
  if (typeof username !== "string" || username.length === 0) return false;

  const existing = await neon
    .select()
    .from(linkPagesTable)
    .where(eq(linkPagesTable.url, username.toLowerCase()))
    .limit(1);

  // todo: add message for taken username
  if (existing.length > 0) return false;

  const newPage = await neon
    .insert(linkPagesTable)
    .values({
      userId,
      url: username.toLowerCase(),
      bgType: "color",
      bgColor: "#ffffff",
    })
    .returning();

  return newPage[0];
};

export const getLastLinkPage = async () => {
  const { userId } = await auth();

  if (!userId) return false; // add message?

  const pages = await neon
    .select({
      id: linkPagesTable.id,
      userId: linkPagesTable.userId,
      url: linkPagesTable.url,
      bgType: linkPagesTable.bgType,
      bgColor: linkPagesTable.bgColor,
      bgImage: linkPagesTable.bgImage,
      userImage: linkPagesTable.userImage,
      displayName: linkPagesTable.displayName,
      location: linkPagesTable.location,
      bio: linkPagesTable.bio,
      createdAt: linkPagesTable.createdAt,
    })
    .from(linkPagesTable)
    .where(eq(linkPagesTable.userId, userId))
    .orderBy(desc(linkPagesTable.createdAt))
    .limit(1);

  return pages[0];
};

export const updateLinkPage = async (id: number, data: IUpdateLinkPage) => {
  const { userId } = await auth();

  console.log("updateLinkPage", id, userId, data);

  // todo: messages should be handled in a better way
  if (!userId) return { error: true, message: "Unauthorized" };

  if (!id) return { error: true, message: "Page ID is required" };

  const [updatedPage] = await neon
    .update(linkPagesTable)
    .set(data)
    .where(and(eq(linkPagesTable.id, id), eq(linkPagesTable.userId, userId)))
    .returning();

  return { ...updatedPage, error: false };
};
