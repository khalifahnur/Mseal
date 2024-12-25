"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BlobImage() {
  const [cards, setCards] = useState([
    { id: 1, x: 0, y: 0, rotation: 0, scale: 1, zIndex: 3 },
    { id: 2, x: 30, y: 30, rotation: 5, scale: 0.95, zIndex: 2 },
    { id: 3, x: 60, y: 60, rotation: -5, scale: 0.9, zIndex: 1 },
  ]);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        for (let i = newCards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
        }
        return newCards.map((card, index) => ({
          ...card,
          x: index * 30,
          y: index * 30,
          rotation: (Math.random() - 0.5) * 10,
          scale: 1 - index * 0.05,
          zIndex: 3 - index,
        }));
      });
    }, 3000); // Shuffle every 3 seconds

    return () => clearInterval(shuffleInterval);
  }, []);

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
      {/* Blob Background */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        style={{
          transform: "scale(1.5)",
          opacity: 0.4,
          fill: "#fae115",
        }}
      >
        <path
          d="M45.1,-76.3C59.2,-69.7,71.8,-59,79.8,-45.4C87.8,-31.8,91.2,-15.9,90.3,-0.5C89.3,14.8,84,29.6,75.8,42.5C67.5,55.3,56.3,66.2,43,73.6C29.7,81,14.9,84.9,-0.2,85.2C-15.2,85.5,-30.4,82.2,-44.3,75.3C-58.1,68.4,-70.6,57.9,-78.5,44.5C-86.4,31.1,-89.8,15.5,-89.3,0.3C-88.8,-15,-84.4,-29.9,-76.3,-42.6C-68.2,-55.2,-56.4,-65.5,-43,-73.1C-29.6,-80.7,-14.8,-85.6,0.5,-86.4C15.8,-87.2,31.1,-83.9,45.1,-76.3Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Animated Membership Cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="absolute w-[200px] h-[120px] sm:w-[250px] sm:h-[150px] md:w-[300px] md:h-[180px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: card.scale,
                x: card.x,
                y: card.y,
                rotate: card.rotation,
                zIndex: card.zIndex,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src="/assets/card.jpg"
                alt="Murang'a Seals Membership Card"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f7f7f7] via-transparent to-transparent z-30" />
    </div>
  );
}
