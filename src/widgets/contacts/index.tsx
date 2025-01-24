"use client";

import { TApplicationBody, TInformation } from "@/shared/api/types";
import { HeadLine } from "@/shared/lib/headline";
import { BechanceIcon, InstIcon, TwitterIcon } from "@/shared/lib/icons";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

const inputCustomColors = {
  input: "dark:bg-zinc-900  bg-zinc-100",
  innerWrapper: "dark:bg-zinc-900  bg-zinc-100",
  inputWrapper: "dark:bg-zinc-900  bg-zinc-100",
};

export const Contacts = () => {
  const [applications, setApplications] = useState<TApplicationBody>({
    name: "",
    email: "",
    message: "",
  });
  const [info, setInfo] = useState<TInformation | undefined>(undefined);

  const contactsIcons =
    "flex items-center p-2 dark:bg-zinc-800 rounded-full bg-zinc-200";

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("/api/data/about");
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Ошибка при загрузке навыков:", error);
      }
    };
    fetchInfo();
  }, []);

  const onSaveApplications = () => {
    if (applications) {
      fetch("/api/data/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applications),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.error) {
            alert(data?.error);
          } else {
            alert(data?.message);
            setApplications({ name: "", email: "", message: "" });
          }
        });
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setApplications((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[800px] gap-8">
      <div className="flex flex-col items-center w-full gap-4">
        <HeadLine title={"Оставить заявку"} />
        <p className="text-base font-normal opacity-40 text-center">
          У вас есть идея и вам нужна помощь в разработке дизайна? Обращайтесь
          прямо сейчас
        </p>
        <div
          className="flex h-7 pl-2 justify-center items-center rounded-3xl gap-1"
          style={{
            backgroundColor: `#22C55E1f`,
            color: "#22C55E",
          }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="flex justify-center items-center py-0 px-2">
            <p className="text-sm">Свободна для найма</p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4 flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4 rounded-[12px] dark:bg-zinc-900 bg-zinc-100">
          <p className="text-sm font-normal opacity-40">
            Подпишись на меня в соцсетях
          </p>
          <div className="flex justify-between h-5/6 items-end">
            <div className={contactsIcons}>
              <a href={`${info?.telegram}`} target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
            </div>
            <div className={contactsIcons}>
              <a
                href={`${info?.behance}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BechanceIcon />
              </a>
            </div>
            <div className={contactsIcons}>
              <a
                href={`${info?.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-3/4 gap-4">
          <div className="flex gap-4 w-full flex-col md:flex-row">
            <Input
              id="name"
              label="Имя"
              type="text"
              value={applications?.name ?? ""}
              className="text-sm w-full"
              classNames={inputCustomColors}
              onChange={(e) => onChangeInput(e)}
              required
            />
            <Input
              id="email"
              label="Почта"
              type="email"
              value={applications?.email ?? ""}
              className="text-sm w-full"
              classNames={inputCustomColors}
              onChange={(e) => onChangeInput(e)}
              required
            />
          </div>
          <div className="flex flex-col w-full gap-4">
            <Textarea
              id="message"
              label="Сообщение"
              value={applications?.message ?? ""}
              placeholder="Введите ваше сообщение"
              className="text-sm"
              classNames={inputCustomColors}
              onChange={(e) => onChangeInput(e)}
            />
            <Button
              color="primary"
              className="bg-[#3B82F6] shadow-custom"
              onClick={() => onSaveApplications()}
            >
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
