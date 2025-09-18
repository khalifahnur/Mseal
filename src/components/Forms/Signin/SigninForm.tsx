"use client"

import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik"
import { useRouter } from "next/navigation"
import { useLogin } from "@/hooks/Authhook/authHook"
import { toast } from "react-toastify"
import type { AuthData } from "@/types/auth"
import { loginSchema } from "@/lib/validationSchema"
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader"
import AuthButtons from "../AuthButtons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import LeftSection from "./LeftSection"

interface signInProps {
  onSignUpClick?: () => void
}

export default function LoginForm({ onSignUpClick }: signInProps) {
  const [showPassword, setShowPassword] = useState(false)
  /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  

  const router = useRouter()
  const signInMutation = useLogin()

  const handleSubmit = async (values: AuthData, { setSubmitting }: FormikHelpers<AuthData>) => {
    setIsLoading(true)
    try {
      await signInMutation.mutateAsync(values)
    }
     /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
    catch (error: any) {
      const errorMessage =
        error?.message ||
        (error.statusCode === 401
          ? "Invalid administrator credentials"
          : "Authentication failed. Please verify your email and password.")
      setError(errorMessage)
    } finally {
      setSubmitting(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (signInMutation.isSuccess) {
      setTimeout(() => {
        ;<FullScreenLoader />
      }, 3000)

      toast.success("Welcome Back! You've successfully logged in", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

    if (signInMutation.isError) {
      toast.error(signInMutation.isError || "❌ Login failed. Check credentials and try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }, [signInMutation.isSuccess, signInMutation.isError, signInMutation.error, router])

  

  

  return (
    <div className="opensans min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,225,21,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto min-h-screen p-4 flex items-center justify-center">
        <div
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden w-full max-w-6xl"
        >
          <div className="grid lg:grid-cols-2 min-h-[700px]">
            {/* Left Section  */}
            <LeftSection />

            {/* Right Section */}
            <div className="p-12 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
              <div
                // initial={{ opacity: 0, x: 30 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-md mx-auto w-full space-y-8"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
                  <p className="text-gray-600">Enter your credentials to access your account</p>
                </div>

                <div className="space-y-4">
                  <AuthButtons />
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or continue with email</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Field name="email">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any   */}
                            {({ field, meta }: any) => (
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                  className={`pl-10 h-12 border-2 transition-all duration-200 ${
                                    meta.touched && meta.error
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-gray-200 focus:border-primary hover:border-gray-300"
                                  }`}
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm flex items-center gap-1"
                        />
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <div className="relative">
                          <Field name="password">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any   */}
                            {({ field, meta }: any) => (
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter your password"
                                  className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 ${
                                    meta.touched && meta.error
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-gray-200 focus:border-primary hover:border-gray-300"
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
                            )}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm flex items-center gap-1"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            //checked={values.remember}
                            //onCheckedChange={(checked) => setFieldValue("remember", checked)}
                            className="border-2 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                            Remember me
                          </Label>
                        </div>
                        <Link
                          href={'/forgot-password'}
                          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary/60 text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting || isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Sign In
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{" "}
                    <button
                      onClick={onSignUpClick}
                      className="text-primary hover:text-primary/40 font-semibold transition-colors hover:underline"
                    >
                      Sign up for free
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
