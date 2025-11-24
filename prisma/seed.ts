import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient, UserRole, UserStatus } from '@prisma/client';
import 'dotenv/config';
import { hashPassword } from "../src/utils/helper";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const userData: Prisma.UserCreateInput = {
  username: "kbufc",
  password: hashPassword('password1234'),
  role: 'ADMIN' as UserRole,
  status: 'ACTIVE' as UserStatus
};

async function main() {
  console.log(`Start seeding ...`);

  const user = await prisma.user.create({
    data: userData
  });
  console.log(`Created user with id: ${user.id}`);
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
