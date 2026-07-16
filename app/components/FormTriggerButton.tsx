"use client";
import { useFormModal } from "./FormModalContext";
import { trackEvent } from "../lib/gtag";

interface FormTriggerButtonProps {
  className?: string;
  children: React.ReactNode;
  eventLabel?: string;
}

export default function FormTriggerButton({
  className = "",
  children,
  eventLabel = "cta_button",
}: FormTriggerButtonProps) {
  const { openForm } = useFormModal();
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("click_button", { button_label: eventLabel });
        openForm();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
