
import React, { useEffect, useRef } from 'react';
import { useSpring, useTransform, useMotionValueEvent, motion } from 'framer-motion';

interface NumberTickerProps {
  value: number;
  suffix?: string;
  className?: string;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({ 
  value, 
  suffix = "",
  className = ""
}) => {
  const spring = useSpring(0, { mass: 1, stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 只有在组件进入视野时才开始滚动
    const timeout = setTimeout(() => spring.set(value), 500);
    return () => clearTimeout(timeout);
  }, [value, spring]);

  useMotionValueEvent(display, "change", (latest) => {
    if (spanRef.current) {
      spanRef.current.textContent = latest + suffix;
    }
  });

  return (
    <motion.span ref={spanRef} className={className}>
      0{suffix}
    </motion.span>
  );
};
