import type { NavigateFunction } from "react-router-dom";
import type { IconType } from "react-icons";
import { FaEdit, FaTrashAlt, FaLock } from "react-icons/fa";

export interface MenuItem {
  label: string;
  icon: IconType;
  onClick: () => void;
}

export const postMenuItems = (
  onEdit: () => void,
  onDelete: () => void,
): MenuItem[] => [
  { label: "Edit", icon: FaEdit, onClick: onEdit },
  { label: "Delete", icon: FaTrashAlt, onClick: onDelete },
];

export const profileMenuItems = (
  navigate: NavigateFunction,
  id: string,
): MenuItem[] => [
  {
    label: "Edit profile",
    icon: FaEdit,
    onClick: () => navigate(`/profiles/${id}/edit`),
  },
  {
    label: "Change password",
    icon: FaLock,
    onClick: () => navigate(`/profiles/${id}/edit/password`),
  },
];

export const commentMenuItems = (
  onEdit: () => void,
  onDelete: () => void,
): MenuItem[] => postMenuItems(onEdit, onDelete);
