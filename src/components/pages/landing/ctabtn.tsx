import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Ctabtn: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
      <motion.a
        href="#pricing"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full sm:w-auto bg-gradient-to-r from-gray-900 to-primary text-white font-semibold text-xs uppercase tracking-wide rounded-md px-4 py-2 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Join now"
      >
        <span>Join Now</span>
        <motion.div
          className="ml-1.5"
          animate={{ x: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.a>

      <div className="flex items-center justify-center w-full sm:w-auto">
        <div className="hidden sm:flex items-center space-x-2">
          <div className="h-px w-4 bg-gradient-to-r from-transparent to-slate-300" />
          <span className="text-gray-900 text-xs uppercase tracking-wider">or</span>
          <div className="h-px w-4 bg-gradient-to-l from-transparent to-slate-300" />
        </div>
        <span className="sm:hidden text-slate-400 text-xs uppercase tracking-wider">or</span>
      </div>
      <motion.a
        href="#pricing"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full sm:w-auto underline  text-black font-extrabold text-xs uppercase tracking-wide px-4 py-2 flex items-center justify-center hover:border-b-primary "
        aria-label="Get tickets"
      >
        <span>Buy Tickets?</span>
        <motion.div
          className="ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity"
          animate={{ x: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-slate-500 group-hover:w-8 transition-all duration-300" />
      </motion.a>
    </div>
  );
};

export default Ctabtn;