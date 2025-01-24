import connection from "@/shared/api/connection";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const sessions: Record<string, { userId: number; email: string }> = {}; // Временное хранилище для сессий

export async function POST(req: Request) {
  try {
    const { email, password } = await req?.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Почта и пароль обязательны" },
        { status: 400 }
      );
    }

    // проверка пользователя
    const [rows]: any = await connection.execute(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const user = rows[0];

    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    // создание сессии
    const sessionId = nanoid();
    sessions[sessionId] = { userId: user.id, email: user.email };

    const response = NextResponse.json({
      message: "Авторизация прошла успешно",
      user: { id: user.id, email: user.email, name: user.name },
    });

    // cookie для клиента
    response.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 день
      path: "/",
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
