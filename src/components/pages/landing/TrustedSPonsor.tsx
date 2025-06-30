import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TrustedSponsors = () => {
  const sponsors = [
    {
      href: "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
      image: "/assets/sportpesa-seeklogo.png",
      alt: "SportPesa - Official Sports Betting Partner",
      text: "SportPesa"
    },
    {
      href: "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
      image: "/assets/sportpesa-seeklogo.png",
      alt: "SportPesa - Official Sports Betting Partner",
      text: "SportPesa"
    },
    {
      href: "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
      image: "/assets/sportpesa-seeklogo.png",
      alt: "SportPesa - Official Sports Betting Partner",
      text: "SportPesa"
    },
    {
      href: "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
      image: "/assets/sportpesa-seeklogo.png",
      alt: "SportPesa - Official Sports Betting Partner",
      text: "SportPesa"
    },

    {
      href: "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
      image: "/assets/sportpesa-seeklogo.png",
      alt: "SportPesa - Official Sports Betting Partner",
      text: "SportPesa"
    },
    {
      href: "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
      image: "/assets/sportpesa-seeklogo.png",
      alt: "SportPesa - Official Sports Betting Partner",
      text: "SportPesa"
    }
  ];

  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="relative w-full bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Header Section */}
          <div className="md:min-w-[280px] md:max-w-[320px] text-center md:text-left md:border-r md:border-gray-300 md:pr-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              Official Partners
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Powering the pride of <span className="font-semibold bg-gradient-to-r from-primary via-black to-gray-800 bg-clip-text text-transparent">Muranga Seal</span>
            </p>
            <div className="hidden md:block mt-3">
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Sponsors Marquee */}
          <div className="flex-1 w-full overflow-hidden">
            <div className="relative">
              <div className="flex animate-marquee items-center whitespace-nowrap hover:pause-animation">
                {duplicatedSponsors.map((sponsor, index) => (
                  <div key={`sponsor-${index}`} className="flex items-center mx-6 md:mx-8">
                    
                    {/* Separator Dot */}
                    {index > 0 && (
                      <span className="block text-lg font-bold text-gray-400 mr-6 md:mr-8">
                        •
                      </span>
                    )}
                    
                    {/* Sponsor Link */}
                    <Link
                      href={sponsor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105"
                      aria-label={`Visit ${sponsor.text} - Official Partner`}
                    >
                      <div className="relative w-[120px] h-[40px]">
                        <Image
                          src={sponsor.image}
                          alt={sponsor.alt}
                          fill
                          className="object-contain transition-opacity duration-300 group-hover:opacity-90 filter hover:brightness-110"
                          loading="lazy"
                          unoptimized={true}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              {/* Gradient Fade Effects */}
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        .pause-animation {
          animation-play-state: paused;
        }
        
        /* Smooth hover effects */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation-duration: 60s;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedSponsors;