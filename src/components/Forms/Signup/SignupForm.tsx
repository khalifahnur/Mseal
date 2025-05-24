"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useSignUp } from "@/hooks/Authhook/authHook";
import { toast } from "react-toastify";
import { signupSchema } from "@/lib/validationSchema";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LeftSection from "./LeftSection";

interface signUpProps {
  onSignInClick: () => void;
}

const SignUpPage = ({ onSignInClick }: signUpProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUpMutation = useSignUp();

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
      /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/ 
      const { confirmPassword, ...submitData } = values;
      await signUpMutation.mutateAsync(submitData);
      setTimeout(() => {
        <FullScreenLoader />;
      }, 3000);
      onSignInClick();

      toast.success("🎉 Registration Successful! You can now sign in.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } 
    /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
    catch (err: any) {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(250,225,21,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto max-h-fit p-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden w-full max-w-7xl"
        >
          <div className="grid lg:grid-cols-2 min-h-10/12">
            {/* Left Section */}
            <LeftSection />

            {/* Right Section*/}
            <div className="p-12 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-lg mx-auto w-full space-y-8"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Create Account
                  </h1>
                  <p className="text-gray-600">
                    Join us today and start your journey
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-700"
                      >
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter first name"
                          className={`pl-10 h-12 border-2 transition-all duration-200 ${
                            formik.touched.firstName && formik.errors.firstName
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-[#fae115] hover:border-gray-300"
                          }`}
                        />
                      </div>
                      {formik.touched.firstName && formik.errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.firstName}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label
                        htmlFor="lastName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter last name"
                          className={`pl-10 h-12 border-2 transition-all duration-200 ${
                            formik.touched.lastName && formik.errors.lastName
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-[#fae115] hover:border-gray-300"
                          }`}
                        />
                      </div>
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.lastName}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your email"
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#fae115] hover:border-gray-300"
                        }`}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.email}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="phoneNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </Label>
                    <div className="flex">
                      <div className="flex items-center px-4 rounded-l-lg border-2 border-r-0 border-gray-200 bg-gray-50/50">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600 font-medium">+254</span>
                      </div>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="712345678"
                        className={`rounded-l-none h-12 border-2 transition-all duration-200 ${
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#fae115] hover:border-gray-300"
                        }`}
                      />
                    </div>
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.phoneNumber}
                        </p>
                      )}
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-2"
                    >
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Create password"
                          className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 ${
                            formik.touched.password && formik.errors.password
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-[#fae115] hover:border-gray-300"
                          }`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.password}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="space-y-2"
                    >
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Confirm password"
                          className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-[#fae115] hover:border-gray-300"
                          }`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.confirmPassword}
                          </p>
                        )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formik.values.agreeTerms}
                        onCheckedChange={(checked) =>
                          formik.setFieldValue("agreeTerms", checked)
                        }
                        className="border-2 border-gray-300 data-[state=checked]:bg-[#fae115] data-[state=checked]:border-[#fae115] mt-1"
                      />
                      <div className="text-sm leading-relaxed">
                        <Label
                          htmlFor="agreeTerms"
                          className="text-gray-700 cursor-pointer"
                        >
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-[#fae115] hover:text-[#e6c200] font-medium underline"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-[#fae115] hover:text-[#e6c200] font-medium underline"
                          >
                            Privacy Policy
                          </a>
                        </Label>
                        {formik.touched.agreeTerms &&
                          formik.errors.agreeTerms && (
                            <p className="mt-1 text-red-500 text-sm">
                              {formik.errors.agreeTerms}
                            </p>
                          )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-[#fae115] to-[#f5d800] hover:from-[#f5d800] hover:to-[#e6c200] text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Create Account
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={onSignInClick}
                      className="text-[#fae115] hover:text-[#e6c200] font-semibold transition-colors hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
