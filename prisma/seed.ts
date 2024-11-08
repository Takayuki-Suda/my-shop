// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // テストユーザーを作成（IDは自動生成）
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "testuser@example.com",
      balance: 10000, // 初期所持金額
    },
  });

  console.log("ユーザー作成完了:", user);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
