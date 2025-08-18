import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: "Learn Next.js" },
      { title: "Build Task Tracker" },
    ],
  });
}
main();
