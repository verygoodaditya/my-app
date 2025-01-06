"use client";

import { useState } from "react";
import SplineBackground from "./components/SplineBackground";
import StoryApp from "./components/StoryApp";
import "./globals.css";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("/music.mp3")
  );

  const toggleMusic = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };
  return (
    <div className="tv-container select-none crt  flex items-center relative justify-center h-screen">
      <SplineBackground className="pointer-events-auto " />
      <StoryApp />
      {/* <DraggableCube /> */}
    </div>
  );
}
