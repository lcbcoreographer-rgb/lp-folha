import SmoothScrollProvider from "../components/SmoothScrollProvider";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { FormModalProvider } from "../components/FormModalContext";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScrollProvider>
      <ScrollProgressBar />
      <FormModalProvider>{children}</FormModalProvider>
    </SmoothScrollProvider>
  );
}
