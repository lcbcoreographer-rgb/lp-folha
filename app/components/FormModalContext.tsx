"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import FormModal from "./FormModal";

interface FormModalContextValue {
  openForm: () => void;
  closeForm: () => void;
}

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openForm, closeForm }), [openForm, closeForm]);

  return (
    <FormModalContext.Provider value={value}>
      {children}
      <FormModal open={open} onClose={closeForm} />
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) {
    throw new Error("useFormModal must be used within a FormModalProvider");
  }
  return ctx;
}
