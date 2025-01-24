import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Вы успешно вышли" });

  // удаление cookie сессии
  response.cookies.set("sessionId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  return response;
}
