import 'dotenv/config';
import { PrismaConfig } from 'prisma';
import { env } from 'prisma/config';

const config: PrismaConfig = {
  schema: 'prisma/schema/schema.prisma', // Path to your Prisma schema file
  migrations: {
    path: 'prisma/migrations'
  },
  datasource: {
    url: env('DATABASE_URL'), // Database URL from environment variables
  },
  // Other configurations like generators, cli options, etc.
};

export default config;