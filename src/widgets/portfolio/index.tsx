"use client";

import { Icon } from "@/featured/iconComponent";
import { TPortfolio } from "@/shared/api/types";
import { BackIcon, ClipIcon } from "@/shared/lib/icons";
import { Button, Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<TPortfolio | undefined>(undefined);
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/data/portfolio?id=${id}`);
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error("Ошибка при загрузке навыков:", error);
      }
    };
    fetchPortfolio();
  }, []);

  if (!portfolio) {
    return <Spinner color="primary" />;
  }

  const paragraphs = portfolio?.about?.split("\\n");

  return (
    <div className="w-full max-w-[800px]">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[10px] cursor-pointer">
            <Button variant="light" onClick={() => router.back()}>
              <BackIcon />
            </Button>
          </div>
          <h2 className="text-2xl font-semibold">{portfolio?.title}</h2>
          <div
            className="flex h-6 py-0 px-2 items-center gap-2 rounded w-fit"
            style={{
              backgroundColor: `${portfolio?.tags?.color}1f`,
              color: portfolio?.tags?.color,
            }}
          >
            <div className="flex justify-center items-center rounded gap-2"><Icon icon={portfolio?.tags?.icon} size={16}/></div>
            <p className="text-xs font-semibold color-inherit">
              {portfolio?.tags?.title}
            </p>
          </div>
        </div>
        <p>{portfolio?.description}</p>
          {paragraphs?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        <img
          src={portfolio?.image}
          className="w-full h-[500px] object-cover rounded-lg"
          alt={portfolio?.title}
        />
        <a href={portfolio?.url} target="_blank" rel="noopener noreferrer">
          <div className="flex gap-2 text-blue-500">
            <ClipIcon /> Ссылка на проект
          </div>
        </a>
      </div>
    </div>
  );
};
