import { useContext } from "react";
import { ToastContext } from "./ToastContextObject";

export const useToast = () => useContext(ToastContext);
