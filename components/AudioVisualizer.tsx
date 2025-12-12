'use client';

import { motion } from 'framer-motion';

const colors = [
  'rgb(255, 255, 255)',      // white
  'rgb(74, 222, 128)',       // green
  'rgb(34, 211, 238)',       // cyan
  'rgb(168, 85, 247)',       // purple
  'rgb(251, 146, 60)',       // orange
  'rgb(255, 238, 88)',       // yellow
  'rgb(236, 72, 153)',       // pink
];

interface AudioVisualizerProps {
  barCount?: number;
  isActive?: boolean;
}

export function AudioVisualizer({ barCount = 50, isActive = false }: AudioVisualizerProps) {
  return (
    <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-16 sm:h-20 md:h-24">
      {Array.from({ length: barCount }).map((_, i) => {
        const randomHeight = Math.random() * 60 + 20;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = Math.random() * 1 + 0.5;
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: 'clamp(3px, 0.5vw, 8px)',
              backgroundColor: colors[colorIndex],
            }}
            animate={
              isActive
                ? {
                    height: [`${randomHeight}%`, `${Math.random() * 80 + 20}%`, `${randomHeight}%`],
                    opacity: [0.6, 1, 0.6],
                  }
                : {
                    height: `${randomHeight * 0.5}%`,
                    opacity: 0.3,
                  }
            }
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

