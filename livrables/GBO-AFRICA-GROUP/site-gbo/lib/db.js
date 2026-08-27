import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const globalForPrisma = globalThis;

// TURSO_DATABASE_URL carries the auth token as a query param (libsql://...?authToken=...) —
// the same single value works both here (runtime) and for `prisma migrate`/`db push` (CLI),
// so there's only one connection string to configure, in .env and on Vercel.
const libsql = createClient({ url: process.env.TURSO_DATABASE_URL });
const adapter = new PrismaLibSQL(libsql);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
