"use client";
import React, { CSSProperties, use, useEffect, useRef, useState } from "react";

export default function Silouette() {
   const containerRef = useRef<HTMLDivElement>(null);
   const defaultStyles = { "--mouse-x": 0, "--mouse-y": 0 } as CSSProperties;
   const [gradientStyles, setGradientStyle] = useState<CSSProperties>(defaultStyles);

   useEffect(() => {
      let intersectionObserver: IntersectionObserver;
      let scheduledAnimationFrame = false;

      const updateMousePosition = (e: any) => {
         if (containerRef.current) {
            const boundingRect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - boundingRect.left;
            const y = e.clientY - boundingRect.top;

            const styles = { "--mouse-x": x, "--mouse-y": y } as CSSProperties;
            setGradientStyle(styles);
         }
         scheduledAnimationFrame = false;
      };

      const handleMouseMovement = (e: any) => {
         if (scheduledAnimationFrame) return;

         scheduledAnimationFrame = true;
         requestAnimationFrame(() => updateMousePosition(e));
      };

      if (containerRef.current) {
         intersectionObserver = new IntersectionObserver(
            (entries) => {
               entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                     window.addEventListener("mousemove", handleMouseMovement);
                  } else {
                     window.removeEventListener("mousemove", handleMouseMovement);
                  }
               });
            },
            { rootMargin: "0px" }
         );

         intersectionObserver.observe(containerRef.current);
      }

      return () => {
         if (intersectionObserver) intersectionObserver.disconnect();
         window.removeEventListener("mousemove", handleMouseMovement);
      };
   }, [containerRef]);
   return (
      <div className='flex h-[inherit] w-full absolute top-0' ref={containerRef}>
         <div className='mask'>
            <div className='gradient' style={gradientStyles} />
         </div>
      </div>
   );
}
