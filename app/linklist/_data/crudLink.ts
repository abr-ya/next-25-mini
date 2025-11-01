"use server";

import { neon } from "@/db";
import { linkItemsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { IBaseLink, LinkOrderType } from "../_interfaces/link.interface";
import { sql } from "drizzle-orm";

export const createLink = async (linkData: IBaseLink, pageId: number) => {
  const { userId } = await auth();

  if (!userId) return { error: true, message: "Unauthorized" };

  const newLink = await neon
    .insert(linkItemsTable)
    .values({
      pageId,
      ...linkData,
    })
    .returning();

  return newLink[0];
};

export const updateLinksOrder = async (data: LinkOrderType[]) => {
  const { userId } = await auth();

  if (!userId) return { error: true, message: "Unauthorized" };
  if (data.length === 0) return { error: true, message: "No links to update" };

  // coerce incoming values to numbers to avoid integer = text errors
  const numericData = data.map((d) => ({ id: Number(d.id), order: Number(d.order) }));
  // build VALUES tuples and cast each value to int
  const tuples = numericData.map((d) => sql`(${d.id}::int, ${d.order}::int)`);
  const values = sql.join(tuples, sql`, `);

  // single UPDATE using FROM (VALUES ...) AS v(id, sort_order)
  // declare alias without types because we cast values in the tuples
  const query = sql`
    UPDATE link_items
    SET sort_order = v.sort_order
    FROM (VALUES ${values}) AS v(id, sort_order)
    WHERE link_items.id = v.id
  `;

  try {
    await neon.execute(query);
    return { error: false, message: "Links order updated" };
  } catch (err) {
    console.error("updateLinksOrder failed:", err);
    return { error: true, message: "Failed to update links order" };
  }
};
