"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    membershipNumber: "",
    password: "",
    verificationMethod: "",
    verificationCode: ["", "", "", "", "", ""],
  });

  const handleVerificationCodeChange = (index: number, value: string) => {
    const newCode = [...formData.verificationCode];
    newCode[index] = value;
    setFormData({ ...formData, verificationCode: newCode });

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <p className="text-gray-600 mb-4">
              Please enter your details to log in.
            </p>
            <div>
              <label className="block text-sm font-medium mb-1">
                Membership Number
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.membershipNumber}
                onChange={(e) =>
                  setFormData({ ...formData, membershipNumber: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded-lg"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6">Verification Method</h2>
            <p className="text-gray-600 mb-4">
              How would you like to get verified?
            </p>
            <div className="space-y-2">
              <button
                className={`w-full p-2 border rounded-lg ${
                  formData.verificationMethod === "email"
                    ? "bg-[#fae115] text-black"
                    : "bg-white"
                }`}
                onClick={() =>
                  setFormData({ ...formData, verificationMethod: "email" })
                }
              >
                Send to Email
              </button>
              <button
                className={`w-full p-2 border rounded-lg ${
                  formData.verificationMethod === "phone"
                    ? "bg-[#fae115] text-black"
                    : "bg-white"
                }`}
                onClick={() =>
                  setFormData({ ...formData, verificationMethod: "phone" })
                }
              >
                Send to Phone Number
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6">Enter Verification Code</h2>
            <p className="text-gray-600 mb-4">
              Please enter the 6-digit code sent to your{" "}
              {formData.verificationMethod}.
            </p>
            <div className="flex justify-between">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border rounded-lg text-2xl"
                  value={formData.verificationCode[index]}
                  onChange={(e) =>
                    handleVerificationCodeChange(index, e.target.value)
                  }
                />
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto h-screen p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-7xl">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Side - Animation */}
            <div className="bg-[#fae115] p-8 relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Image
                    src="https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png"
                    alt="Muranga Seals"
                    width={200}
                    height={200}
                    className="w-48 h-auto"
                  />
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold text-black mt-8"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Welcome Back!
                </motion.h2>
              </div>
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage:
                    'url("https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png")',
                  backgroundSize: "cover",
                }}
              />
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                  >
                    Back
                  </button>
                )}
                {step === 3 ? (
                  <Link
                    href="/home"
                    onClick={() => {
                      console.log(formData);
                    }}
                  >
                    <button className="px-4 py-2 bg-[#fae115] text-black rounded-lg">
                      Login
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-4 py-2 bg-[#fae115] text-black rounded-lg"
                  >
                    Next
                  </button>
                )}
              </div>
              <hr className="border border-[#e8e8e8] my-4 " />
              <div className="text-xs sticky bottom-0 bg-white py-2 md:static">
                Dont have an account?{" "}
                <Link
                  href="/SignUp"
                  className="text-[#fae115] hover:underline cursor-pointer font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
