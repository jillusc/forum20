import { createContext } from "react";

export type ToastType = "success" | "error";

export const ToastContext = createContext<
  (msg: string, type?: ToastType) => void
>(() => {});
