import { Prisma, PrismaClient } from '@prisma/client';
import { hashPassword } from "../src/utils/helper";

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput = {
  username: "kbufc",
  password: hashPassword('password1234'),
  role: 'ADMIN',
  status: 'ACTIVE'
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
