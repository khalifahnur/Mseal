"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BlobImage() {
  // Use the actual membership card image path
  const cardImage = "/assets/card.jpg"; // Make sure this path is correct
  
  const [cards, setCards] = useState([
    { id: 1, x: 0, y: 0, rotation: 0, scale: 1, zIndex: 3 },
    { id: 2, x: 25, y: 20, rotation: 3, scale: 0.97, zIndex: 2 },
    { id: 3, x: 50, y: 40, rotation: -2, scale: 0.94, zIndex: 1 },
  ]);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return; // Don't shuffle when user is hovering

    const shuffleInterval = setInterval(() => {
      setCards((prevCards) => {
        // Create a copy of the cards array
        const newCards = [...prevCards];
        
        // Instead of random shuffling, just rotate the order
        const firstCard = newCards.shift();
        newCards.push(firstCard);
        
        // Update positions and properties based on new order
        return newCards.map((card, index) => ({
          ...card,
          x: index * 25,
          y: index * 20,
          rotation: index === 0 ? 0 : (index === 1 ? 3 : -2),
          scale: 1 - (index * 0.03),
          zIndex: 3 - index,
        }));
      });
    }, 4000); // Shuffle every 4 seconds

    return () => clearInterval(shuffleInterval);
  }, [isHovering]);

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[450px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Solid yellow background to match the screenshot */}
      <div className="absolute inset-0 rounded-3xl bg-[#fae115] bg-opacity-30" />
      
      {/* Card Container - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="absolute w-[250px] h-[150px] sm:w-[300px] sm:h-[180px] md:w-[320px] md:h-[200px] cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: card.scale,
                x: card.x,
                y: card.y,
                rotate: card.rotation,
                zIndex: card.zIndex,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.02, 
                y: card.y - 5,
                transition: { duration: 0.3 }
              }}
              onClick={() => {
                // Bring clicked card to front
                if (card.zIndex !== 3) {
                  setCards(cards.map(c => 
                    c.id === card.id 
                      ? {...c, zIndex: 3, x: 0, y: 0, rotation: 0, scale: 1}
                      : {...c, zIndex: c.id === cards.find(cd => cd.zIndex === 3)?.id ? 2 : 1}
                  ));
                }
              }}
            >
              {/* Card with shadow effect */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-2xl bg-gray-300 transform translate-y-1 translate-x-1" />
                <div className="absolute inset-0 rounded-2xl bg-white shadow-lg overflow-hidden">
                  <Image
                    src={cardImage}
                    alt="Murang'a Seals Membership Card"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
                
                {/* Click to preview label - only on the top card */}
                {card.zIndex === 3 && (
                  <motion.div 
                    className="absolute bottom-3 right-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-black bg-opacity-60 text-white text-xs py-1 px-3 rounded-full">
                      Click to preview
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}