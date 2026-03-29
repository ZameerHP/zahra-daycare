import React from "react";

interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  speed = 2,
  delay = 0,
  color = "inherit",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
}) => {
  if (disabled) return <span className={className}>{text}</span>;

  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;

  return (
    <span
      className={`shiny-text inline-block ${className} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      style={{
        "--shine-color": shineColor,
        "--animation-duration": animationDuration,
        "--animation-delay": animationDelay,
        "--direction": direction === "left" ? "1" : "-1",
        color: color === "inherit" ? "currentColor" : color,
        backgroundImage: `linear-gradient(120deg, transparent 30%, var(--shine-color) 50%, transparent 70%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: `shiny-text-animation var(--animation-duration) linear infinite var(--animation-delay)`,
        display: "inline-block",
      } as React.CSSProperties}
    >
      {text}
    </span>
  );
};

export default ShinyText;
