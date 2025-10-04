import "server-only";

import { neon } from "@/db";
import { categoriesTable } from "@/db/schema";

export const getCategories = async () => {
  const categories = await neon.select().from(categoriesTable);
  return categories;
};
