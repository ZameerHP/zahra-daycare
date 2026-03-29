import React, { useRef, useEffect, useState } from "react";

interface ElectricBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = "#7df9ff",
  speed = 1,
  chaos = 0.12,
  thickness = 2,
  borderRadius = 16,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative p-[1px] overflow-hidden ${className}`}
      style={{
        ...style,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* The Electric Effect Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            x={thickness / 2}
            y={thickness / 2}
            width={Math.max(0, dimensions.width - thickness)}
            height={Math.max(0, dimensions.height - thickness)}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray="20, 10, 40, 20"
            filter="url(#glow)"
            style={{
              opacity: 0.8,
              animation: `electric-dash ${4 / speed}s linear infinite`,
            }}
          />
          <rect
            x={thickness / 2}
            y={thickness / 2}
            width={Math.max(0, dimensions.width - thickness)}
            height={Math.max(0, dimensions.height - thickness)}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={color}
            strokeWidth={thickness * 1.5}
            strokeDasharray="10, 50, 20, 80"
            filter="url(#glow)"
            style={{
              opacity: 0.4,
              animation: `electric-dash ${6 / (speed * (1 + chaos))}s linear infinite reverse`,
            }}
          />
        </svg>
      </div>

      {/* Content Container */}
      <div
        className="relative z-10 h-full w-full"
        style={{ borderRadius: `${borderRadius - 1}px` }}
      >
        {children}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes electric-dash {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
};

export default ElectricBorder;
