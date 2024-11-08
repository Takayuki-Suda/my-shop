// src/app/api/updateBalance/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    // リクエストからデータを取得
    const { userId, amount } = await request.json();

    // バリデーション: 必要なデータがあるかチェック
    if (
      !userId ||
      !amount ||
      typeof userId !== "number" ||
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return NextResponse.json(
        { message: "不正なデータが送信されました。" },
        { status: 400 }
      );
    }

    // ユーザーを検索
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "ユーザーが見つかりません。" },
        { status: 404 }
      );
    }

    // 所持金が足りているか確認
    if (user.balance < amount) {
      return NextResponse.json(
        { message: "所持金が不足しています。" },
        { status: 400 }
      );
    }

    // 所持金額の更新
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          decrement: amount, // 所持金を減らす
        },
      },
    });

    // 更新されたユーザー情報を返す
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating balance:", error); // エラー内容をコンソールに出力
    return NextResponse.json(
      { message: "更新に失敗しました。" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Prismaクライアントを確実に切断
  }
}
