"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";

const AmbientContext = createContext<{ playing: boolean; toggle: () => void }>({
  playing: false,
  toggle: () => {},
});

export function AmbientProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.src = audio.canPlayType("audio/webm; codecs=opus") ? "/ambient.webm" : "/ambient.mp3";
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
    }

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying((p) => !p);
  }, [playing]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <AmbientContext.Provider value={{ playing, toggle }}>
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbient() {
  return useContext(AmbientContext);
}
