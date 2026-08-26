"use client";

import { useState, useEffect } from "react";

export default function HeroVideoCarousel({ videos = [] }: { videos?: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Ganti video setiap 15 detik
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 15000); 
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {videos.map((src, index) => (
        <video
          key={src}
          className={`absolute top-0 left-0 w-full h-full object-cover contrast-[1.15] saturate-[1.1] brightness-[1.05] transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
      {/* Overlay Gradient supaya teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/5" />
    </div>
  );
}
