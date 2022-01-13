import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany({});
  await prisma.category.deleteMany({});

  for (let i = 0; i < 10; i++) {
    await prisma.category.create({
      data: {
        name: `category-${i}`,
      },
    });
  }

  const categoryId = await prisma.category.findMany();

  console.log(categoryId);

  await prisma.post.create({
    data: {
      title: "adsasdas",
      categories: {
        connect: [{ id: categoryId[5].id }],
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
