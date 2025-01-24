'use client'

import { Avatar } from "@nextui-org/react";

export const PhotoName = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-[150px] h-[150px] rounded-[150px] object-cover" src="/images/profile.jpeg"/>
      <div className="opacity-40">
        Гыймадиева Лиана
      </div>
    </div>
  );
};
