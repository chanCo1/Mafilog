import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const createPrismaClient = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const basePrisma = new PrismaClient({ adapter });

  return basePrisma.$extends({
    query: {
      $allModels: {
        async create({ args, query }) {
          const now = new Date();
          const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

          // +9 시간으로 저장
          args.data = {
            ...args.data,
            createdAt: kstTime,
          };

          return query(args);
        },

        async update({ args, query }) {
          const now = new Date();
          const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

          args.data = {
            ...args.data,
            updatedAt: kstTime,
          };
          return query(args);
        },
      },
    },
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
