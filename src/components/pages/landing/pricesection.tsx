import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import React from 'react'

export default function Pricing() {
  return (
    <section id="pricing" className="py-10 md:py-20 relative px-20 bg-linear-to-r from-gray-50 to-white">
          <div className="container px-4 md:px-6 relative">
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
              data-animate
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-gray-900 via-gray-900 to-primary/20 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[800px] text-gray-700 text-lg md:text-xl">
                Choose the plan that&apos;s right for your restaurant. No hidden
                fees.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 lg:max-w-5xl mx-auto">
              {[
                {
                  id: 1,
                  name: "Bronze",
                  price: 2000,
                  description:
                    "Perfect for small restaurants just getting started with online reservations.",
                  features: [
                    "10% discount on match tickets",
                    "Member-only entrance gate",
                    "Official membership card",
                    "Birthday gift",
                  ],
                  gradient: "from-blue-600/20 to-blue-600/5",
                },
                {
                  id: 2,
                  name: "Silver",
                  price: 5000,
                  description:
                    "Perfect for small restaurants just getting started with online reservations.",
                  features: [
                    "20% discount on match tickets",
                    "Priority ticket booking",
                    "Member-only entrance gate",
                    "Official membership card",
                    "Birthday gift",
                    "10% discount on merchandise",
                  ],
                  popular: true,
                  gradient: "from-blue-500 to-indigo-600",
                },
                {
                  id: 3,
                  name: "Gold",
                  price: 10000,
                  description:
                    "Perfect for small restaurants just getting started with online reservations.",
                  features: [
                    "30% discount on match tickets",
                    "Priority ticket booking",
                    "VIP entrance gate",
                    "Premium membership card",
                    "Birthday gift",
                    "20% discount on merchandise",
                    "Access to player meet & greets",
                    "Reserved parking spot",
                  ],
                  gradient: "from-indigo-600/20 to-indigo-600/5",
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col rounded-2xl ${
                    plan.popular
                      ? "bg-linear-to-br from-primary/50 to-primary shadow-xl shadow-blue-900/30"
                      : "bg-linear-to-br from-white/10 to-white/5 border border-gray-200/70"
                  } overflow-hidden`}
                  data-animate
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
                  )}

                  <div className="p-6 relative">
                    {plan.popular && (
                      <div className="absolute top-6 right-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-medium text-white">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        /month
                      </span>
                    </div>
                    <p
                      className={`mb-6 ${plan.popular ? "text-gray-900" : "text-gray-700"}`}
                    >
                      {plan.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle
                            className={`h-5 w-5 mr-2 mt-0.5 ${plan.popular ? "text-white" : "text-primary/20"}`}
                          />
                          <span
                            className={
                              plan.popular ? "text-white/90" : "text-gray-700"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full h-12 rounded-xl ${
                        plan.popular
                          ? "bg-white text-primary hover:bg-white/90"
                          : "bg-primary hover:bg-primary/80 text-white"
                      }`}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 text-gray-500">
              All plans include a 14-day free trial. No credit card required.
            </div>
          </div>
        </section>
  )
}


