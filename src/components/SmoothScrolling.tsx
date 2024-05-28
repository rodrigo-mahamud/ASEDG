"use client";
import React, { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

interface ScrollProps {
   children: ReactNode;
}

export default function SmoothScrolling({ children }: ScrollProps) {
   return (
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
         {children}
      </ReactLenis>
   );
}
