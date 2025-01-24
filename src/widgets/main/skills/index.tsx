"use client";

import { useEffect, useState } from "react";
import { SkillsCard } from "./card";
import { ExperienceTags } from "./tags";
import { HeadLine } from "@/shared/lib/headline";
import { TSkills, TTechnologies } from "@/shared/api/types";
import { Spinner } from "@nextui-org/react";

export const Skills = () => {
  const [skills, setSkills] = useState<TSkills[] | null>(null);
  const [technologies, setTechnologies] = useState<TTechnologies[] | null>(null);

  useEffect(() => {
      const fetchSkills = async () => {
        try {
          const response = await fetch("/api/data/skills");
          const data = await response.json();
          setSkills(data);
        } catch (error) {
          console.error("Ошибка при загрузке навыков:", error);
        }
      };
      const fetchTechnologies = async () => {
        try {
          const response = await fetch("/api/data/technologies");
          const data = await response.json();
          setTechnologies(data);
        } catch (error) {
          console.error("Ошибка при загрузке технологий:", error);
        }
      };
      fetchSkills();
      fetchTechnologies()
  }, []);

  if (!skills || !technologies) {
    return <Spinner color="primary" />;
  }
  
  return (
    <div className="flex flex-col items-center gap gap-8 max-w-[1200px]">
      <HeadLine title={"Навыки"} />
      <div className="flex flex-col items-center gap-6 self-stretch">
        <ul className="flex justify-center items-start content-start gap-4 flex-wrap">
          {skills?.map((item, index) => {
            return (
              <li
                key={index}
                className={`flex items-center py-3 pr-3 pl-5 rounded-3xl gap-3`}
                style={{
                  backgroundColor: `${item.color}1f`,
                  color: item.color,
                }}
              >
                <SkillsCard
                  name={item?.title}
                  description={item?.description}
                  color={item?.color}
                  icon={item?.icon}
                />
              </li>
            );
          })}
        </ul>
        <ul className="flex h-[24px] justify-center items-start content-start gap-8 flex-wrap">
          {technologies?.map((item, index) => {
            return (
              <li key={index} className="flex items-center gap-2">
                <ExperienceTags
                  name={item?.title}
                  experience={item?.experience}
                  icon={item?.icon}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
