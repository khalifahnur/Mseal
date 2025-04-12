"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/Authhook/authHook";
import { toast } from "react-toastify";
import { AuthData } from "@/types/auth";
import { loginSchema } from "@/lib/validationSchema";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const signInMutation = useLogin();

  const handleSubmit = async (
    values: AuthData,
    { setSubmitting }: FormikHelpers<AuthData>
  ) => {
    try {
      await signInMutation.mutateAsync(values);
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        (error.statusCode === 401
          ? "Invalid administrator credentials"
          : "Authentication failed. Please verify your email and password.");
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (signInMutation.isSuccess) {
      toast.success(" Welcome Back! You've successfully logged");

      router.replace("/home");
    }

    if (signInMutation.isError) {
      toast.error(
        signInMutation.isError ||
          "❌ Login failed. Check credentials and try again.."
      );
    }
  }, [
    signInMutation.isSuccess,
    signInMutation.isError,
    signInMutation.error,
    toast,
    router,
  ]);

  return (
    <div className="min-h-[600px] bg-gray-50">
      <div className="container mx-auto h-screen p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Section */}
            <div className="bg-[#fae115] p-8 relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
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
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Welcome Back!
                </motion.h2>
              </div>
            </div>

            {/* Right Section */}
            <div className="p-8 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold mb-6">Sign In</h2>
                <p className="text-gray-600 mb-4">
                  Please enter your details to log in.
                </p>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Field
                            type="email"
                            name="email"
                            className="w-full p-2 pl-10 border rounded-lg px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            placeholder="your@email.com"
                          />
                          <Mail
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={18}
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="w-full p-2 pl-10 border rounded-lg px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2.5"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Field
                            type="checkbox"
                            name="remember"
                            id="remember"
                            className="h-4 w-4 text-[#fae115]"
                          />
                          <label
                            htmlFor="remember"
                            className="ml-2 text-sm text-gray-600"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-[#fae115] hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 bg-[#fae115] text-black rounded-lg font-medium"
                      >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </motion.div>

              <hr className="border border-[#e8e8e8] my-6" />
              <div className="text-sm text-center">
                Don't have an account?{" "}
                <Link
                  href="/SignUp"
                  className="text-[#fae115] hover:underline font-semibold"
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
