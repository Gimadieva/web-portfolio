"use client";

import { ThemeSwitch } from "@/featured/theme-switch";
import { LogoIcon } from "@/shared/lib/icons";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";


export const Authorization = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Авторизация прошла успешна");

      // Редирект на admin
      router.push("/admin");
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-[400px] w-full p-8 gap-8 border-2 dark:border-zinc-900 border-zinc-100 rounded-3xl">
      <ThemeSwitch />
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-center rounded-2xl w-[48px] h-[48px] bg-zinc-900">
          <LogoIcon />
        </div>
        <h2 className="text-2xl font-semibold">Авторизация</h2>
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        <Input
          value={email}
          placeholder="Логин"
          className="text-sm w-full"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          value={password}
          placeholder="Пароль"
          className="text-sm w-full"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        className="bg-[#3B82F6] shadow-custom text-white w-full"
        type="submit"
      >
        Войти
      </Button>
    </form>
  );
};