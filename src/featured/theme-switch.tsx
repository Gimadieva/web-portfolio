"use client";

import { FC } from "react";
import { Switch, SwitchProps } from "@nextui-org/switch";
import { useTheme } from "next-themes";

import { SunFilledIcon, MoonFilledIcon } from "@/shared/lib/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = () => {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Switch
      color="default"
      className="group-data-[selected=true]:bg-default-500"
      size="lg"
      startContent={<SunFilledIcon size={22} />}
      endContent={<MoonFilledIcon size={22} />}
      onChange={onChange}
    />
  );
};
