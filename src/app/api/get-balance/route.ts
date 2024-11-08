// src/app/api/get-balance/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { id: 1 }, // ユーザーIDを固定して取得
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "ユーザーが見つかりません。" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ balance: user.balance }), {
      status: 200,
    });
  } catch (error) {
    console.error("所持金額の取得中にエラーが発生しました:", error);
    return new Response(JSON.stringify({ message: "サーバーエラー" }), {
      status: 500,
    });
  }
}
