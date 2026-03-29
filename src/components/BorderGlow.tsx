import React, { useRef, useEffect } from "react";

interface BorderGlowProps {
  children: React.ReactNode;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  className?: string;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "white",
  borderRadius = 28,
  glowRadius = 150,
  glowIntensity = 0.5,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowRef.current.style.setProperty("--x", `${x}px`);
      glowRef.current.style.setProperty("--y", `${y}px`);

      // Calculate distance to nearest edge
      const distLeft = x;
      const distRight = rect.width - x;
      const distTop = y;
      const distBottom = rect.height - y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      if (minDist < edgeSensitivity) {
        glowRef.current.style.opacity = glowIntensity.toString();
      } else {
        glowRef.current.style.opacity = "0";
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [edgeSensitivity, glowIntensity]);

  // Create a gradient string from colors
  const gradient = colors.length > 1 
    ? `radial-gradient(${glowRadius}px circle at var(--x, 0px) var(--y, 0px), ${colors[0]} 0%, ${colors[1]} 50%, transparent 100%)`
    : `radial-gradient(${glowRadius}px circle at var(--x, 0px) var(--y, 0px), ${colors[0]} 0%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      className={`relative p-[1px] ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        backgroundColor: "transparent",
      }}
    >
      {/* Glow Layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: 0,
          borderRadius: `${borderRadius}px`,
          background: gradient,
          filter: "blur(10px)",
        } as React.CSSProperties}
      />
      
      {/* Inner Content Container */}
      <div
        className="relative z-10 w-full h-full"
        style={{ 
          borderRadius: `${borderRadius - 1}px`, 
          backgroundColor: backgroundColor 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
