import { Icon } from "@/featured/iconComponent";
import { TTechnologies } from "@/shared/api/types";

export const ExperienceTags = ({ name, experience, icon }: TTechnologies) => {
  return (
    <>
      <div>
        <Icon icon={icon} />
      </div>
      <div className="flex items-center gap-1">
        <h6 className="text-lg font-semibold">{name}</h6>
        <span className="text-base font-semibold dark:text-neutral-50 text-zinc-950 opacity-40">
          •
        </span>
        <span className="text-base font-semibold  dark:text-neutral-50 text-zinc-950 opacity-40">
          {experience}/10
        </span>
      </div>
    </>
  );
};
