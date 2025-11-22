import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import "dotenv/config";


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const db = new PrismaClient({ adapter });

db.$connect()
    .then(() => console.log("Connected Database Ok"))
    .catch((err) => console.error("Connect Database ERROR:", err))

export default db