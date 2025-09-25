import { motion } from "framer-motion";
import { Brain, TrendingUp, Shield, Zap, BarChart3, Target } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Signals",
    description: "Advanced machine learning models analyze thousands of market indicators in real-time to identify high-probability trading opportunities.",
    gradient: "from-cyan to-primary",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Predictions",
    description: "Get instant buy/sell signals with confidence scores updated every minute. Never miss a market move again.",
    gradient: "from-gain to-cyan",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Built-in risk assessment and portfolio optimization tools help protect your capital while maximizing returns.",
    gradient: "from-warning to-gain",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-second signal generation and execution recommendations powered by optimized algorithms and cloud infrastructure.",
    gradient: "from-primary to-loss",
  },
  {
    icon: BarChart3,
    title: "Backtesting Engine",
    description: "Validate strategies with years of historical data. See exactly how our models would have performed in any market condition.",
    gradient: "from-loss to-warning",
  },
  {
    icon: Target,
    title: "Explainable AI",
    description: "Understand exactly why each signal was generated. Full transparency into model decisions and contributing factors.",
    gradient: "from-gain to-primary",
  },
];

export default function Features() {
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
            Why Traders Choose{" "}
            <span className="bg-gradient-to-r from-cyan to-gain bg-clip-text text-transparent">
              Our Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge technology meets proven trading strategies. Built by quants, designed for traders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="w-6 h-6 text-navy" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-gain/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          className="mt-20 glass-card p-8 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-cyan mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Average Accuracy</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gain mb-2">2.4x</div>
              <div className="text-sm text-muted-foreground">Return Multiplier</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-warning mb-2">50ms</div>
              <div className="text-sm text-muted-foreground">Signal Latency</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Market Coverage</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}