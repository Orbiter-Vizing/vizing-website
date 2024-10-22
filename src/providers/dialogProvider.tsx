"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";

// assets
import IconCloseButton from "@/assets/images/icon/close.svg";

interface DialogConfig {
  content: React.ReactNode;
  isShowClose: boolean;
  onClose?: () => void;
}

interface DialogContextType {
  showDialog: (config: DialogConfig) => void;
  hideDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [isShowClose, setIsShowClose] = useState(false);
  const closeFuncRef = useRef<() => void>();

  const showDialog = useCallback((config: DialogConfig) => {
    setDialogContent(config.content);
    setIsShowClose(config.isShowClose);
    closeFuncRef.current = config.onClose;
    setIsOpen(true);
  }, []);

  const hideDialog = useCallback(() => {
    setIsOpen(false);
    setDialogContent(null);
    if (closeFuncRef.current) {
      closeFuncRef.current();
      closeFuncRef.current = undefined;
    }
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      {isOpen && (
        <div className="fixed z-[10] inset-0 flex justify-center items-center">
          <div className="absolute z-[11] inset-0 bg-black opacity-60"></div>
          <div className="relative inset-0 z-[12]">
            {isShowClose && (
              <span className="absolute z-[12] top-[30px] right-[30px] inline-block h-[32px] w-[32px] hover:cursor-pointer">
                <IconCloseButton onClick={hideDialog} className="h-[32px] w-[32px]" />
              </span>
            )}
            {dialogContent}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
