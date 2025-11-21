import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";
import { env } from "prisma/config";


export default {
  schema: path.join("prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: 'ts-node prisma/seed.ts'
  },
  views: {
    path: path.join("prisma", "views"),
  },
  typedSql: {
    path: path.join("prisma", "queries"),
  },
  datasource: {
    url: env("DATABASE_URL")
  }
} satisfies PrismaConfig;