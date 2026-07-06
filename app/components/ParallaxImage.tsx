"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  strength?: number;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function ParallaxImage({
  src,
  alt,
  strength = 70,
  priority = false,
  className = "",
  children,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      const wrap = wrapRef.current;
      const imgWrap = imgRef.current;
      if (wrap && imgWrap) {
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2 - vh / 2;
        const progress = center / (vh + rect.height);
        imgWrap.style.transform = `translate3d(0, ${progress * -strength}px, 0)`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={imgRef}
        className="absolute left-0 right-0 -top-[12%] -bottom-[12%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {children}
    </div>
  );
}
