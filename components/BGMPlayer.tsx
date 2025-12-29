
import React, { useState, useEffect, useRef } from 'react';
import { Music, Music2 } from 'lucide-react';
import { BGM_URL } from '../constants';

export const BGMPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(BGM_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      onClick={toggle}
      className={`fixed top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-[#C41E3A]/80 backdrop-blur-md border border-[#FFD700]/30 shadow-2xl cursor-pointer transition-all ${isPlaying ? 'animate-rotate-slow' : 'grayscale opacity-60'}`}
    >
      <Music className="w-5 h-5 text-[#FFD700]" />
      {/* Decorative dots */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFD700] rounded-full animate-pulse" />
    </div>
  );
};
