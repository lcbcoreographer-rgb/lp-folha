"use client";
import { useFormModal } from "./FormModalContext";

interface FormTriggerButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function FormTriggerButton({
  className = "",
  children,
}: FormTriggerButtonProps) {
  const { openForm } = useFormModal();
  return (
    <button type="button" onClick={openForm} className={className}>
      {children}
    </button>
  );
}
