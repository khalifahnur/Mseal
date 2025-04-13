"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignUp } from "@/hooks/Authhook/authHook";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signupSchema } from "@/lib/validationSchema";
import { features } from "@/lib/placeholderData";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const signUpMutation = useSignUp();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...submitData } = values;
      await signUpMutation.mutateAsync(submitData);

      toast.success("🎉 Registration Successful! You can now sign in.");

      setTimeout(() => {
        router.push("/SignIn");
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "❌ Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="grid md:grid-cols-2 min-h-[600px]">
      {/* Left Side - Features */}
      <div className="bg-[#fae115] p-8 relative overflow-hidden">
        <div className="relative z-10 items-center">
          <h2 className="text-xl font-bold text-black mb-6">
            Membership Benefits
          </h2>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-center space-x-2"
              >
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-black">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Animated Background Pattern */}
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
            backgroundImage: `url('https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png')`,
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* Right Side - Single Form */}
      <div className="p-4 bg-white items-center">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Create Account</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full rounded-md border ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.firstName}
                </p>
              )}
            </motion.div>

            {/* Last Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full rounded-md border ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.lastName}
                </p>
              )}
            </motion.div>
          </div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full rounded-md border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </motion.div>

          {/* Phone Number */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="flex mt-1">
              <div className="flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50">
                {/* <img
                  src="/api/placeholder/24/16"
                  alt="Kenya flag"
                  className="h-4 w-6 mr-2"
                /> */}
                <span className="text-gray-500">+254</span>
              </div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-r-md border ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500`}
                placeholder="712345678"
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.phoneNumber}
              </p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-md border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 pr-10`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-md border ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 pr-10`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </motion.div>
          </div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-start mt-4"
          >
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formik.values.agreeTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-yellow-600 hover:text-yellow-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-yellow-600 hover:text-yellow-500">
                  Privacy Policy
                </a>
              </label>
              {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.agreeTerms}
                </p>
              )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#fae115] text-black rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors font-medium"
              disabled={loading}
              style={{ backgroundColor: loading ? undefined : "#fae115" }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </motion.div>
        </form>

        {/* Google Sign Up */}
        {/* <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute border-t border-gray-300 w-full"></div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Or sign up with
            </div>
          </div>
          <button
            type="button"
            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
        </motion.div> */}

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/SignIn"
            className="text-yellow-600 hover:text-yellow-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
