import { Wand2, CircleUserRound } from "lucide-react";

export interface TabConfig {
  path: string;
  label: string;
  icon: React.ElementType;
}

export const tabs: TabConfig[] = [
  {
    path: "/",
    label: "Создать",
    icon: Wand2,
  },
  {
    path: "/profile",
    label: "Профиль",
    icon: CircleUserRound,
  },
];

