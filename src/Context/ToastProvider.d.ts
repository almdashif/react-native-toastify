// ToastProvider.d.ts
import { ReactNode } from "react";

export interface ToastOptions {
    message: string;
    duration?: number;
    position?: "top" | "bottom" | "center";
}

export interface ToastContextType {
    showToast: (options: ToastOptions) => void;
}

export const ToastProvider: ({ children }: { children: ReactNode }) => JSX.Element;
export const useToast: () => ToastContextType;
