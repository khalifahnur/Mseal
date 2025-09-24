"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type LoadingColor = "primary" | "secondary" | "accent" | "success" | "info" | "warning" | "error" | "neutral";
export type LoadingSize = "xs" | "sm" | "md" | "lg" | "xl";

export const LoadingOverlay = ({
  message = "Loading...", // Default message
  color = "primary",
  blur = true,
  opacity = 80,
  size = "md",
  className,
  showDots = true,
}: {
  message?: string;
  color?: LoadingColor;
  blur?: boolean;
  opacity?: number;
  size?: LoadingSize;
  className?: string;
  showDots?: boolean;
}) => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (!showDots || !message) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev % 3) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [message, showDots]);

  const textColorMap: Record<LoadingColor, string> = {
    primary: "text-primary",
    secondary: "text-slate-700",
    accent: "text-indigo-700",
    success: "text-emerald-700",
    info: "text-cyan-700",
    warning: "text-amber-700",
    error: "text-rose-700",
    neutral: "text-gray-700",
  };

  const sizeMap: Record<LoadingSize, string> = {
    xs: "w-12 h-12",
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  };

  const textSizeMap: Record<LoadingSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center z-40 transition-all duration-300",
        blur ? "backdrop-blur-sm" : "",
        className
      )}
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity / 100})` }}
      aria-live="polite"
      role="status"
    >
      <Image
        src="/assets/images/icons8-ball.gif"
        alt="Loading animation"
        className={cn("object-contain", sizeMap[size])}
        width={100}
        height={100}
        unoptimized
      />
      {message && (
        <div className="mt-4 text-center">
          <p className={cn("font-medium", textColorMap[color], textSizeMap[size])}>
            {message}
            {showDots && ".".repeat(dots)}
          </p>
        </div>
      )}
    </div>
  );
};

export const FullScreenLoader = ({
  message = "Loading...",
  color = "primary",
  blur = true,
  opacity = 90,
  size = "md",
  showDots = true,
}: {
  message?: string;
  color?: LoadingColor;
  blur?: boolean;
  opacity?: number;
  size?: LoadingSize;
  showDots?: boolean;
}) => {
  return (
    <div className="fixed inset-0 z-50">
      <LoadingOverlay
        message={message}
        color={color}
        blur={blur}
        opacity={opacity}
        size={size}
        showDots={showDots}
      />
    </div>
  );
};

export const InlineLoader = ({
  message,
  color = "primary",
  size = "sm",
  className,
  showDots = true,
}: {
  message?: string;
  color?: LoadingColor;
  size?: LoadingSize;
  className?: string;
  showDots?: boolean;
}) => {
  const [dots, setDots] = useState(1);
  const [activeBar, setActiveBar] = useState(0);

  useEffect(() => {
    if (!showDots || !message) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev % 3) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [message, showDots]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBar((prev) => (prev + 1) % 4);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const colorMap: Record<LoadingColor, string> = {
    primary: "bg-blue-600",
    secondary: "bg-slate-700",
    accent: "bg-indigo-600",
    success: "bg-emerald-600",
    info: "bg-cyan-600",
    warning: "bg-amber-600",
    error: "bg-rose-600",
    neutral: "bg-gray-600",
  };

  const textColorMap: Record<LoadingColor, string> = {
    primary: "text-blue-700",
    secondary: "text-slate-700",
    accent: "text-indigo-700",
    success: "text-emerald-700",
    info: "text-cyan-700",
    warning: "text-amber-700",
    error: "text-rose-700",
    neutral: "text-gray-700",
  };

  const sizeMap: Record<LoadingSize, string> = {
    xs: "h-3 w-12",
    sm: "h-4 w-16",
    md: "h-5 w-20",
    lg: "h-6 w-24",
    xl: "h-8 w-32",
  };

  const barSizeMap: Record<LoadingSize, string> = {
    xs: "w-2",
    sm: "w-3",
    md: "w-4",
    lg: "w-5",
    xl: "w-6",
  };

  const textSizeMap: Record<LoadingSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-live="polite"
      role="status"
    >
      <div className={cn("flex justify-between items-end", sizeMap[size])}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-full rounded transition-all duration-200",
              barSizeMap[size],
              colorMap[color],
              i === activeBar ? "opacity-100" : "opacity-30"
            )}
            style={{
              height: i === activeBar ? "100%" : "40%",
              transform: i === activeBar ? "scaleY(1)" : "scaleY(0.8)",
            }}
          />
        ))}
      </div>

      {message && (
        <span className={cn("font-medium", textColorMap[color], textSizeMap[size])}>
          {message}
          {showDots && ".".repeat(dots)}
        </span>
      )}
    </div>
  );
};