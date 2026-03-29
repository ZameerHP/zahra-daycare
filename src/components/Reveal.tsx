import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "motion/react";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  key?: React.Key;
}

export const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0.2, 
  duration = 0.5,
  y = 75,
  x = 0,
  scale = 1
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y, x, scale },
          visible: { opacity: 1, y: 0, x: 0, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ 
          duration: duration * 1.5, 
          delay, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        style={{ translateZ: 0 }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};
