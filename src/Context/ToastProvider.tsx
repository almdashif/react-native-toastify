import React, { createContext, useRef, useContext, ReactNode } from "react";
import Toast from "../Components/Toast";

export interface ToastOptions {
    message: string;
    duration?: number;
    position?: "top" | "bottom" | "center";
    type?: "info" | "success" | "error";
    backgroundColor?: string;
    textColor?: string;
}

export interface ToastContextType {
    showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const toastRef = useRef<{ show: (options: ToastOptions) => void } | null>(null);

    const showToast = (options: ToastOptions) => {
        toastRef.current?.show(options);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast ref={toastRef} />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
