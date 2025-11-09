import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast } from "@/components/ui";

type ToastType = "success" | "error";

const ToastContext = createContext<(msg: string, type?: ToastType) => void>(
  () => {}
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>("success");

  const showToast = (msg: string, toastType: ToastType = "success") => {
    setMessage(msg);
    setType(toastType);
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <Toast message={message} type={type} onClose={() => setMessage(null)} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
