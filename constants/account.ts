import { SectionOptions } from "@/types/globals";
import { router } from "expo-router";

export const accountManagmentOptions: SectionOptions[] = [
  {
    action: () => router.push("/(account)/EditProfile"),
    iconName: "person-outline",
    title: "Edit Profile",
  },
  {
    action: () => router.push("/(account)/ChangePassword"),
    iconName: "lock-closed-outline",
    title: "Change Password",
  },
  {
    action: () => router.push("/(account)/Settings"),
    iconName: "settings-outline",
    title: "Settings",
  },
];

export const InfoOptions: SectionOptions[] = [
  {
    action: () => {},
    iconName: "information-circle-outline",
    title: "About App",
  },
];
