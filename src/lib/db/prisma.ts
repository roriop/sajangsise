// Phase 1 — Prisma 클라이언트 진입점.
// Phase 0에서는 사용하지 않는다. `npx prisma generate` 후 아래 블록을 활성화.
//
// import { PrismaClient } from '@prisma/client';
//
// declare global {
//   // eslint-disable-next-line no-var
//   var __prisma: PrismaClient | undefined;
// }
//
// export const prisma = globalThis.__prisma ?? new PrismaClient();
//
// if (process.env.NODE_ENV !== 'production') {
//   globalThis.__prisma = prisma;
// }

export {};
