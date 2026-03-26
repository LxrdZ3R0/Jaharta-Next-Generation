"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastContextValue {
  showToast: (msg: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    msg: string;
    type: ToastType;
    id: number;
  } | null>(null);

  const showToast = useCallback(
    (msg: string, type: ToastType = "success") => {
      const id = Date.now();
      setToast({ msg, type, id });
      setTimeout(() => setToast((prev) => (prev?.id === id ? null : prev)), 4000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.35 }}
            className={cn(
              "fixed bottom-7 left-1/2 z-[9000] -translate-x-1/2 rounded-sm border bg-jaharta-dark px-7 py-3.5 font-heading text-[0.7rem] font-semibold tracking-[0.12em]",
              toast.type === "success" &&
                "border-emerald-400/50 text-emerald-400",
              toast.type === "error" && "border-red-400/50 text-red-400",
              toast.type === "info" && "border-cyan/50 text-cyan"
            )}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
