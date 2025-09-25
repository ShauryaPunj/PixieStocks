import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for getting started",
    features: [
      "5 signals per day",
      "Basic portfolio tracking",
      "Email alerts",
      "Community support",
    ],
    limitations: [
      "No backtesting",
      "Limited to 3 assets",
      "Basic explanations only",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 49, yearly: 490 },
    description: "For serious traders",
    features: [
      "Unlimited signals",
      "Advanced backtesting",
      "Real-time alerts",
      "Full AI explanations",
      "Risk management tools",
      "API access",
      "Priority support",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Institutional",
    price: { monthly: 199, yearly: 1990 },
    description: "For trading firms & advisors",
    features: [
      "Everything in Pro",
      "White-label solution",
      "Custom models",
      "Dedicated support",
      "Advanced analytics",
      "Multi-user accounts",
      "Custom integrations",
      "SLA guarantee",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-cyan to-gain bg-clip-text text-transparent">
              Trading Edge
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free, upgrade when you're ready. All plans include our core AI signals.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isYearly ? "bg-cyan" : "bg-glass-strong"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isYearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
            </span>
            {isYearly && (
              <div className="bg-gain text-navy px-2 py-1 rounded-full text-xs font-semibold">
                Save 17%
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-br from-glass-strong to-glass scale-105 border-2 border-cyan"
                  : "glass-card hover:scale-105"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan to-gain text-navy px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>

                {isYearly && plan.price.monthly > 0 && (
                  <div className="text-sm text-gain">
                    Save ${(plan.price.monthly * 12 - plan.price.yearly)} per year
                  </div>
                )}
              </div>

              <Button
                className={`w-full mb-8 ${
                  plan.popular
                    ? "btn-hero"
                    : plan.name === "Free"
                    ? "bg-glass-strong hover:bg-glass text-foreground"
                    : "bg-gradient-to-r from-glass-strong to-glass hover:from-glass to-glass-strong text-foreground"
                }`}
              >
                {plan.cta}
                {plan.name === "Pro" && <Zap className="ml-2 w-4 h-4" />}
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gain mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-start gap-3 opacity-60">
                    <Check className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground line-through">
                      {limitation}
                    </span>
                  </div>
                ))}
              </div>

              {/* Risk disclosure for paid plans */}
              {plan.price.monthly > 0 && (
                <div className="mt-6 pt-6 border-t border-glass">
                  <p className="text-xs text-muted-foreground">
                    30-day money-back guarantee. Not financial advice.
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social proof */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm">Trusted by 10,000+ traders</div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm">$2.5B+ in tracked volume</div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm">99.9% uptime SLA</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}