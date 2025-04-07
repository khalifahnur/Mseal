"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "Joining Murang'a Seals' membership was the best decision ever! The benefits are amazing.",
    name: "John , Fan",
  },
  {
    id: 2,
    text: "I love the exclusive access to matches and behind-the-scenes content. It's a fan's dream come true!",
    name: "Jane , Fan",
  },
  {
    id: 3,
    text: "The VIP seating and priority access make every match day special. Highly recommended!",
    name: "Bob , Fan",
  },
  {
    id: 4,
    text: "Joining Murang'a Seals' membership was the best decision ever! The benefits are amazing.",
    name: "Alice , Fan",
  },
  {
    id: 5,
    text: "The VIP seating and priority access make every match day special. Highly recommended!",
    name: "Charlie , Fan",
  },
  {
    id: 6,
    text: "I love the exclusive access to matches and behind-the-scenes content. It's a fan's dream come true!",
    name: "Eva , Fan",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-20 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-b from-gray-50 via-blue-900/10 to-gray-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-3/4 bg-primary/40 transform rotate-12 translate-x-1/4 translate-y-[20%] rounded-3xl shadow-2xl opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Heading section */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16" data-animate>
          <div className="relative inline-block mb-2">
            {/* <svg
              className="absolute -top-3 -left-3 w-6 h-6 text-primary/40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 24C0 10.7452 10.7452 0 24 0" stroke="currentColor" strokeWidth="2" />
              <path d="M8 24C8 15.1634 15.1634 8 24 8" stroke="currentColor" strokeWidth="2" />
              <path d="M16 24C16 19.5817 19.5817 16 24 16" stroke="currentColor" strokeWidth="2" />
            </svg> */}
            <h2 className="className=text-3xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-gray-900 via-gray-900 to-primary/20 bg-clip-text text-transparent">
              Loved by anyone Everywhere
            </h2>
            {/* <svg
              className="absolute -bottom-3 -right-3 w-6 h-6 text-primary/40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 0C24 13.2548 13.2548 24 0 24" stroke="currentColor" strokeWidth="2" />
              <path d="M16 0C16 8.83656 8.83656 16 0 16" stroke="currentColor" strokeWidth="2" />
              <path d="M8 0C8 4.41828 4.41828 8 0 8" stroke="currentColor" strokeWidth="2" />
            </svg> */}
          </div>
          <p className="max-w-[800px] text-gray-700 text-lg md:text-xl">
            Don't just take our word for it. Here's what our satisfied fans have to say.
          </p>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute top-0 left-0 w-full flex gap-8 p-4"
            animate={{
              x: ["-100%", 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={`floating-${index}`}
                className="min-w-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 flex flex-col justify-between shadow-lg"
              >
                <p className="text-gray-900 text-lg font-medium italic">
                  "{testimonial.text}"
                </p>
                <p className="text-gray-800 text-sm font-bold mt-4">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated floating testimonials */}
        <div className="relative h-64 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute top-0 left-0 w-full flex gap-8 p-4"
            animate={{
              x: [0, "-100%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={`floating-${index}`}
                className="min-w-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 flex flex-col justify-between shadow-lg"
              >
                <p className="text-gray-900 text-lg font-medium italic">
                  "{testimonial.text}"
                </p>
                <p className="text-gray-800 text-sm font-bold mt-4">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
