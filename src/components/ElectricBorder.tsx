import React, { useRef, useEffect, useState, useId } from "react";

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
  const filterId = useId();

  useEffect(() => {
    if (!containerRef.current) return;

    // Use a single ResizeObserver callback, debounced via rAF
    let rafId: number;
    const resizeObserver = new ResizeObserver((entries) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        for (const entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  const w = Math.max(0, dimensions.width - thickness);
  const h = Math.max(0, dimensions.height - thickness);
  const halfT = thickness / 2;

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
        style={{ borderRadius: `${borderRadius}px` }}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id={filterId}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            x={halfT}
            y={halfT}
            width={w}
            height={h}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray="20, 10, 40, 20"
            filter={`url(#${filterId})`}
            className="electric-dash-1"
            style={{
              opacity: 0.8,
              animationDuration: `${4 / speed}s`,
            }}
          />
          <rect
            x={halfT}
            y={halfT}
            width={w}
            height={h}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={color}
            strokeWidth={thickness * 1.5}
            strokeDasharray="10, 50, 20, 80"
            filter={`url(#${filterId})`}
            className="electric-dash-2"
            style={{
              opacity: 0.4,
              animationDuration: `${6 / (speed * (1 + chaos))}s`,
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
    </div>
  );
};

export default ElectricBorder;
