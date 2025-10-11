import type { IconType } from "react-icons";
import { FaEdit, FaTrashAlt, FaLock } from "react-icons/fa";

export interface MenuItem {
  label: string;
  icon: IconType;
  onClick: () => void;
}
export const postMenuItems: MenuItem[] = [
  { label: "Edit", icon: FaEdit, onClick: () => {} },
  { label: "Delete", icon: FaTrashAlt, onClick: () => {} },
];

export const profileMenuItems: MenuItem[] = [
  { label: "Edit profile", icon: FaEdit, onClick: () => {} },
  { label: "Change password", icon: FaLock, onClick: () => {} },
];
