import { drizzle } from "drizzle-orm/neon-http";
const neon = drizzle(process.env.DATABASE_URL!);

export { neon };
