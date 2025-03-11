import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, Crown, Zap } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

// Replace with your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51Qrf3CQpaDP4McHwJ7BZZvstX3PFZpDewIt0jTOEsi5hyoXuoNThPqsdNKlbm9drYsYxFoju0pVAemffWb9Y6Vfa00jyLRSh5i"
);

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9.99",
    interval: "month",
    features: ["Access to basic features", "5 projects", "Basic support"],
    icon: CreditCard,
    priceId: "prod_RlDQjc5J7T5Xsi", // Replace with your actual Stripe price ID
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19.99",
    interval: "month",
    features: [
      "Access to pro features",
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
    ],
    icon: Crown,
    priceId: "price_test_pro", // Replace with your actual Stripe price ID
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$49.99",
    interval: "month",
    features: [
      "Access to all features",
      "Unlimited projects",
      "24/7 support",
      "Custom solutions",
      "Dedicated account manager",
    ],
    icon: Zap,
    priceId: "price_test_enterprise", // Replace with your actual Stripe price ID
  },
];

export function SubscriptionPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    try {
      setLoading(planName);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      // Call your backend to create a session
      const { data } = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          priceId,
        }
      );

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) setError(stripeError.message);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Subscription failed. Try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link
            to="/"
            className="clickable inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your needs
          </p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
              >
                <div className="p-6">
                  <Icon className="h-12 w-12 text-indigo-600 mx-auto" />
                  <h3 className="text-2xl font-semibold text-gray-900 text-center mt-4">
                    {plan.name}
                  </h3>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /{plan.interval}
                    </span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex">
                        <span className="text-indigo-400 mr-2">✓</span>
                        <span className="text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <button
                    onClick={() => handleSubscribe(plan.priceId, plan.name)}
                    disabled={loading === plan.name}
                    className={`clickable w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                      loading === plan.name
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loading === plan.name ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
