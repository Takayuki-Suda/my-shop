import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const userId = 1; // IDを指定
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    return new Response(JSON.stringify(user), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
}
