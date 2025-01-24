import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/admin"]; // список защищённого маршрута админки

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (protectedRoutes.includes(url.pathname)) {
    const sessionId = req.cookies.get("sessionId")?.value;

    if (!sessionId) {
      // если сессии нет, перенаправление на страницу авторизации
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

  }

  return NextResponse.next();
}
