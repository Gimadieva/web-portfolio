"use client";

import { HeadLine } from "@/shared/lib/headline";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { ServiceCards } from "./card";
import { TPortfolio } from "@/shared/api/types";
import { Spinner } from "@nextui-org/react";

type TTabs = {
  id?: string;
  label?: string;
  content?: string;
};

export const ListPortfolio = () => {
  const [skills, setSkills] = useState<TTabs[] | null>(null);
  const [portfolio, setPortfolio] = useState<TPortfolio[] | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const tabsCustomColors = {
    base: "dark:bg-zinc-900 bg-zinc-100",
    tabList: "dark:bg-zinc-900 bg-zinc-100",
    cursor: "darl:bg-zinc-500 bg-zinc-200",
    tab: "dark:text-white text-zinc-950",
    tabContent:
      "dark:group-data-[selected=true]:text-white group-data-[selected=true]:text-zinc-950",
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/data/skills");
        const data = await response.json();
        setSkills([
          {
            id: "all",
            label: "Все",
          },
          ...data?.map((item: any) => ({
            id: item.name,
            label: item.title,
          })),
        ]);
      } catch (error) {
        console.error("Ошибка при загрузке навыков:", error);
      }
    };

    const fetchPortfolio = async () => {
      try {
        const response = await fetch("/api/data/allPortfolio");
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error("Ошибка при загрузке навыков:", error);
      }
    };
    fetchSkills();
    fetchPortfolio();
  }, []);

  if (!skills || !portfolio) {
    return <Spinner color="primary" />;
  }

  return (
    <div className="flex flex-col items-center gap-4 max-w-[1200px]">
      <HeadLine title={"Портфолио"} />
      <Tabs
        className="sticky top-5 z-50 flex items-center h-12 p-1 gap-2 rounded-xl"
        classNames={tabsCustomColors}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        {skills?.map((item) => {
          return (
            <Tab key={item.id} title={item.label} className="">
              <ServiceCards tag={selectedTab} portfolio={portfolio} />
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};
