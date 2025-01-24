import { Icon } from "@/featured/iconComponent";
import { TSkills } from "@/shared/api/types";


export const SkillsCard = ({ name, description, color, icon }: TSkills) => {
  return (
    <>
      <div className="flex justify-center items-center rounded-2xl gap-2.5 w-[48px] h-[48px] bg-inherit bg-opacity-10">
        <Icon icon={icon} />
      </div>
      <div className="flex flex-col items-start">
        <h6 className="text-lg font-semibold color-inherit">{name}</h6>
        <p className="text-sm font-normal color-inherit opacity-60">{description}</p>
      </div>
    </>
  );
};
