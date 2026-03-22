import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pg from "pg";
import { identities, users } from "../drizzle/schema";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const SHARED_PASSWORD = process.env.FOUNDER_PASSWORD || "test123";

const FOUNDERS = [
  {
    name: "Remy",
    handle: "remy",
    bio: "Co-founder of Sutaeru.",
    role: "admin" as const,
  },
  {
    name: "Donald",
    handle: "donald",
    bio: "Co-founder of Sutaeru.",
    role: "admin" as const,
  },
  {
    name: "William",
    handle: "william",
    bio: "Co-founder of Sutaeru.",
    role: "admin" as const,
  },
  {
    name: "Bash",
    handle: "bash",
    bio: "Co-founder of Sutaeru.",
    role: "admin" as const,
  },
  {
    name: "Mama Ida",
    handle: "mama_ida",
    bio: "Co-founder of Sutaeru.",
    role: "admin" as const,
  },
  {
    name: "Angel",
    handle: "angel",
    bio: "Co-founder of Sutaeru.",
    role: "admin" as const,
  },
  {
    name: "Owner",
    handle: "iownthis",
    bio: "Platform owner.",
    role: "admin" as const,
  },
];

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log("\nSeeding founder & owner accounts...\n");

  const passwordHash = await bcrypt.hash(SHARED_PASSWORD, 12);

  for (const founder of FOUNDERS) {
    const existing = await db
      .select()
      .from(identities)
      .where(eq(identities.handle, founder.handle))
      .limit(1);

    if (existing.length > 0) {
      console.log(`  @${founder.handle} already exists — skipping.`);
      continue;
    }

    const openId = `founder:${nanoid(21)}`;

    const [user] = await db.insert(users).values({
      openId,
      name: founder.name,
      email: null,
      loginMethod: "founder",
      role: founder.role,
      passwordHash,
      onboarded: true,
    }).returning();

    await db.insert(identities).values({
      userId: user.id,
      handle: founder.handle,
      displayName: founder.name,
      bio: founder.bio,
      primaryLanguage: "en",
    });

    console.log(`  Created @${founder.handle} (${founder.name}) — role: ${founder.role}`);
  }

  console.log("\nAll founder accounts ready.\n");
  console.log("Handles created:");
  for (const f of FOUNDERS) {
    console.log(`  @${f.handle}`);
  }
  console.log("\nPassword: same for all (set via FOUNDER_PASSWORD env or default)\n");

  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Founder seed failed:", err);
  process.exit(1);
});

