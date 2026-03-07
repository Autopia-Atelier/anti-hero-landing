"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

export function InteractiveCat({ externalPartyTrigger = 0 }: { externalPartyTrigger?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isPartyMode, setIsPartyMode] = useState(false);

  // External party mode trigger
  const prevTrigger = useRef(externalPartyTrigger);
  useEffect(() => {
    if (externalPartyTrigger > 0 && externalPartyTrigger !== prevTrigger.current) {
      prevTrigger.current = externalPartyTrigger;
      if (!isPartyMode) {
        setIsPartyMode(true);
        setTimeout(() => setIsPartyMode(false), 5000);
      }
    }
  }, [externalPartyTrigger, isPartyMode]);

  // Natural blinking effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const blink = () => {
      if (!isPetting) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }

      const nextBlink = Math.random() * 4000 + 2000;
      
      // ~20% chance of a quick double blink
      if (Math.random() > 0.8 && !isPetting) {
        setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 150);
        }, 300);
      }

      timeout = setTimeout(blink, nextBlink);
    };

    timeout = setTimeout(blink, 2000);
    return () => clearTimeout(timeout);
  }, [isPetting]);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const eyeX = useTransform(mouseX, [-1, 1], [-1.5, 1.5]);
  const eyeY = useTransform(mouseY, [-1, 1], [-1.5, 1.5]);
  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);

  const handleInteraction = useCallback(() => {
    if (isPartyMode) return;
    
    const newCount = clickCount + 1;
    if (newCount >= 7) {
      setIsPartyMode(true);
      setClickCount(0);
      setTimeout(() => setIsPartyMode(false), 5000);
    } else {
      setClickCount(newCount);
    }
  }, [clickCount, isPartyMode]);

  // Path variations
  const leftEyePath = isPetting 
    ? "M 6.5 14 Q 8 12 9.5 14" // Happy eye arc
    : (isBlinking ? "M 8 14 v 0.1" : "M 8 13.5 v 1");

  const rightEyePath = isPetting 
    ? "M 14.5 14 Q 16 12 17.5 14" // Happy eye arc
    : (isBlinking ? "M 16 14 v 0.1" : "M 16 13.5 v 1");

  // Shared styles
  const strokeColor = isPartyMode ? "url(#party-gradient)" : "currentColor";
  const baseColorClass = isPartyMode ? "" : "text-foreground transition-colors duration-300";

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent group cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseDown={() => { setIsPetting(true); handleInteraction(); }}
      onMouseUp={() => setIsPetting(false)}
      onMouseLeave={() => setIsPetting(false)}
    >
      <AnimatePresence>
        {isPetting && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -100, scale: 1.2 }}
            exit={{ opacity: 0, y: -140, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-[35%] left-1/2 -translate-x-1/2 text-pink-500 z-20 pointer-events-none"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-64 h-64 md:w-96 md:h-96 transition-colors duration-500"
          style={{ strokeWidth: "0.5" }}
        >
          <defs>
            <linearGradient id="party-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="16%" stopColor="#f97316" />
              <stop offset="33%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="66%" stopColor="#06b6d4" />
              <stop offset="83%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
              <animateTransform 
                attributeName="gradientTransform" 
                type="rotate" 
                from="0 12 12" 
                to="360 12 12" 
                dur="2s" 
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* Main Cat Head/Body Outline */}
          <path
            d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"
            stroke={strokeColor}
            className={isPartyMode ? "" : "text-foreground"}
          />

          {/* Left Eye */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <path
              strokeWidth="1.2"
              stroke={strokeColor}
              className={baseColorClass}
              d={leftEyePath}
            />
          </motion.g>

          {/* Right Eye */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <path
              strokeWidth="1.2"
              stroke={strokeColor}
              className={baseColorClass}
              d={rightEyePath}
            />
          </motion.g>

          {/* Nose/Mouth (Filled but retaining rounded strokes) */}
          <path
            d="M11.25 16.25h1.5L12 17l-.75-.75Z"
            fill={isPartyMode ? "url(#party-gradient)" : "currentColor"}
            stroke={strokeColor}
            strokeWidth="0.5"
            className={baseColorClass}
          />
        </svg>
      </motion.div>
    </div>
  );
}
