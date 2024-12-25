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

export function Testimonials() {
  return (
    <div className="relative h-screen overflow-hidden bg-yellow-50">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/40 transform rotate-12 translate-x-1/4 translate-y-[-10%] rounded-3xl shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-[200%] flex flex-wrap gap-8 p-8"
            animate={{
              x: ["-25%", "-50%"],
              y: ["-25%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 20,
              ease: "linear",
            }}
          >
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-64 h-64 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 flex flex-col justify-between transform rotate-[-45deg] shadow-lg"
              >
                <p className="text-white text-lg font-medium italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="text-white text-sm font-bold mt-4">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10">
        <div className="relative inline-block mb-12">
          <svg
            className="absolute -top-3 -left-3 w-6 h-6 text-[#000]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 24C0 10.7452 10.7452 0 24 0"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 24C8 15.1634 15.1634 8 24 8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 24C16 19.5817 19.5817 16 24 16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <h2 className="text-4xl font-bold px-4 text-[#000]">
            What Our Clients Say
          </h2>
          <svg
            className="absolute -bottom-3 -right-3 w-6 h-6 text-[#000]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 0C24 13.2548 13.2548 24 0 24"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 0C16 8.83656 8.83656 16 0 16"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 0C8 4.41828 4.41828 8 0 8"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <p className="text-xl text-gray-600 max-w-md">
          Don't just take our word for it. See what our satisfied customers have
          to say about our services.
        </p>
      </div>
    </div>
  );
}

