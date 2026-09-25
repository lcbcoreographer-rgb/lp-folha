"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMeta } from "../lib/gtag";

/** O script do pixel conta a primeira página; a navegação interna do site não recarrega, então conta aqui. */
export default function MetaPageView() {
  const pathname = usePathname();
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);
  return null;
}
