"use client";

import { Button } from "@nextui-org/button";
import { HeroHeadline } from "./heroHeadline";
import { PhotoName } from "./photo-name";
import { ThemeSwitch } from "@/featured/theme-switch";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center self-stretch gap p-12 gap-10 dark:bg-[#18181B] bg-[#F4F4F5] rounded-3xl">
      <div className="w-full flex felx-col justify-end self-stretch gap-2.5 p-0">
        <ThemeSwitch />
      </div>
      <div className="w-full flex felx-col justify-center self-stretch gap-2.5">
        <PhotoName />
      </div>
      <div className="w-full flex felx-col justify-center self-stretch gap-2.5">
        <HeroHeadline />
      </div>
      <div className="w-full flex felx-col justify-center self-stretch gap-2.5">
        <a href="#contacts">
          <Button color="primary" className="bg-[#3B82F6] shadow-custom">
            Оставить заявку
          </Button>
        </a>
      </div>
    </div>
  );
};
