"use client";

import React, { createContext, useContext, useState } from "react";

interface DialogContextType {
  showDialog: (content: React.ReactNode) => void;
  hideDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const showDialog = (content: React.ReactNode) => {
    setDialogContent(content);
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      {isOpen && (
        <div className="flex justify-center items-center fixed z-10 inset-0">
          <div className="absolute z-11 inset-0 bg-black opacity-60"></div>
          <div className="relative inset-0 z-12">{dialogContent}</div>
        </div>
        // <div className="fixed inset-0">
        //   <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        //     <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        //     <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
        //       <Dialog.Close className="absolute top-2 right-2 cursor-pointer" onClick={hideDialog}>
        //         X
        //       </Dialog.Close>
        //       {dialogContent}
        //     </Dialog.Content>
        //   </Dialog.Root>
        // </div>
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
