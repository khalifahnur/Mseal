"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { User } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Joining Murang'a Seals' membership was the best decision ever! The benefits are amazing. ⚽🔥 #MurangaSeals",
    name: "John",
    handle: "@JohnFan",
    date: "Sep 8, 2025",
  },
  {
    id: 2,
    text: "Exclusive access to matches & behind-the-scenes content is a fan's dream! 🏟️🙌 #StSebastianAcademy",
    name: "Jane",
    handle: "@JaneFan",
    date: "Sep 7, 2025",
  },
  {
    id: 3,
    text: "VIP seating & priority access make every match day special. Highly recommend! ⭐ #MurangaSeals",
    name: "Bob",
    handle: "@BobFan",
    date: "Sep 6, 2025",
  },
  {
    id: 4,
    text: "The membership benefits are unreal! Best decision for any fan. ⚽💙 #MurangaSeals",
    name: "Alice",
    handle: "@AliceFan",
    date: "Sep 5, 2025",
  },
  {
    id: 5,
    text: "VIP seating makes match days epic! Can't recommend enough. 🏅 #StSebastianPark",
    name: "Charlie",
    handle: "@CharlieFan",
    date: "Sep 4, 2025",
  },
  {
    id: 6,
    text: "Behind-the-scenes content is 🔥! True fan experience with St. Sebastian. #SealsFan",
    name: "Eva",
    handle: "@EvaFan",
    date: "Sep 3, 2025",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading Section */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-poppins">
            Loved by Fans <span className="text-primary">Everywhere</span>
          </h2>
          <p className="max-w-md sm:max-w-lg lg:max-w-2xl text-base sm:text-lg text-gray-600 font-poppins">
            Don&apos;t just take our word for it. Here&apos;s what our passionate fans are saying on X.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto"
              variants={itemVariants}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar Placeholder */}
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                </div>
                <div className="flex-1">
                  {/* Name and Handle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 font-poppins">
                        {testimonial.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.handle}</p>
                    </div>
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  {/* Testimonial Text */}
                  <p className="mt-2 text-sm sm:text-base text-gray-800 italic font-poppins">
                    &quot;{testimonial.text}&quot;
                  </p>
                  {/* Date */}
                  <p className="mt-2 text-xs sm:text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}