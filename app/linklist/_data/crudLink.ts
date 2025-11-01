"use server";

import { neon } from "@/db";
import { linkItemsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
// import { and, desc, eq } from "drizzle-orm";
import { IBaseLink } from "../_interfaces/link.interface";

export const createLink = async (linkData: IBaseLink, pageId: number) => {
  const { userId } = await auth();

  if (!userId) return false;

  const newLink = await neon
    .insert(linkItemsTable)
    .values({
      pageId,
      ...linkData,
    })
    .returning();

  return newLink[0];
};
