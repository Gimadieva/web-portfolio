"use client";

import TimeLine, { TimeLineItem } from "@/featured/timeline";
import { TEducation, TInformation, TJob } from "@/shared/api/types";
import { HeadLine } from "@/shared/lib/headline";
import { InfoIcon, OrderIcon, StudentIcon } from "@/shared/lib/icons";
import { Accordion, AccordionItem, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const Info = () => {
  const [info, setInfo] = useState<TInformation | undefined>(undefined);
  const [education, setEducation] = useState<TimeLineItem[] | undefined>(undefined);
  const [job, setJob] = useState<TimeLineItem[] | undefined>(undefined);

  const accordionCustomColors = {
    base: "dark:bg-zinc-900 bg-zinc-100",
    heading: "dark:bg-zinc-900 bg-zinc-100",
    trigger: "dark:bg-zinc-900 bg-zinc-100",
    content: "dark:bg-zinc-900 bg-zinc-100 dark:text-white text-zinc-950",
    item: "dark:bg-zinc-900 bg-zinc-100 border-b dark:border-zinc-800 border-zinc-200",
  };

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
    const fetchEducation = async () => {
      try {
        const response = await fetch("/api/data/education");
        const data = await response.json();
        setEducation(
          data?.map((item: TEducation) => ({
            title: item?.title,
            description: item?.place,
            startYear: item?.startYear,
            endYear: item?.endYear,
          }))
        );
      } catch (error) {
        console.error("Ошибка при загрузке данных об образовании:", error);
      }
    };

    const fetchJob = async () => {
      try {
        const response = await fetch("/api/data/job");
        const data = await response.json();
        setJob(
          data?.map((item: TJob) => ({
            title: item?.post,
            description: item?.place,
            startYear: item?.startYear,
            endYear: item?.endYear,
          }))
        );
      } catch (error) {
        console.error("Ошибка при загрузке данных о работе:", error);
      }
    };

    fetchInfo();
    fetchEducation();
    fetchJob();
  }, []);

  if (!info || !education) {
    return <Spinner color="primary" />;
  }

  return (
    <div className="flex flex-col items-center max-w-[1200px] gap-8 w-full">
      <HeadLine title={"Немного обо мне"} />
      <Accordion
        itemClasses={accordionCustomColors}
        className="max-w-[800px] w-full py-0 px-4 dark:bg-zinc-900 bg-zinc-100 rounded-2xl"
      >
        <AccordionItem startContent={<InfoIcon />} title="Обо мне">
          <p>{info?.aboutMe}</p>
        </AccordionItem>
        <AccordionItem startContent={<OrderIcon />} title="Опыт работы">
          <p>{info?.aboutJob}</p>
          <TimeLine items={job} />
        </AccordionItem>
        <AccordionItem startContent={<StudentIcon />} title="Образование">
          <TimeLine items={education} />
        </AccordionItem>
      </Accordion>
    </div>
  );
};
