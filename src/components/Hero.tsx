import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Zap, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Mock live data for mini line chart (left side demo)
const mockData = [
  { time: "9:30", price: 1250 },
  { time: "9:35", price: 1265 },
  { time: "9:40", price: 1280 },
  { time: "9:45", price: 1275 },
  { time: "9:50", price: 1290 },
  { time: "9:55", price: 1310 },
];

// 🔹 Helpers
function getRandomSymbol(): string {
  const symbols = ["AAPL", "TSLA", "MSFT", "GOOGL", "NVDA", "AMZN", "META", "NFLX"];
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function randomPrice(): string {
  return (100 + Math.random() * 500).toFixed(2);
}

// 🔥 Clean Matrix Ticker with aligned rows
function MatrixTicker() {
  const [rows, setRows] = useState(
    Array.from({ length: 12 }, () => ({
      symbol: getRandomSymbol(),
      price: randomPrice(),
      history: Array.from({ length: 15 }, () => parseFloat(randomPrice())),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) =>
        prev.map((row) => {
          const newPrice = parseFloat(row.price) + (Math.random() - 0.5) * 5;
          const updatedHistory = [...row.history.slice(1), newPrice];
          return {
            ...row,
            price: newPrice.toFixed(2),
            history: updatedHistory,
          };
        })
      );
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black/80 font-mono text-green-400 text-sm overflow-hidden rounded-2xl p-4 flex flex-col gap-2">
      {rows.map((row, i) => {
        const priceNum = parseFloat(row.price);
        const color = priceNum >= row.history[0] ? "#22c55e" : "#ef4444";
        return (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2 bg-black/40 rounded-md border border-white/5 hover:bg-black/60 transition"
          >
            {/* Symbol */}
            <div className="w-16 font-bold text-cyan-400">{row.symbol}</div>

            {/* Price */}
            <div className="w-20 text-right" style={{ color }}>
              {row.price}
            </div>

            {/* Sparkline */}
            <div className="w-28 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={row.history.map((p, idx) => ({ idx, p }))}>
                  <Line
                    type="monotone"
                    dataKey="p"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <XAxis hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const [currentPrice, setCurrentPrice] = useState(1250);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => prev + (Math.random() - 0.5) * 20);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-background" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            className="text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            <motion.div
              className="space-y-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Predict Tomorrow's{" "}
                <span className="bg-gradient-to-r from-cyan to-gain bg-clip-text text-transparent">
                  Winners
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Real-time AI signals, rigorous backtests, and explainable
                predictions — built for serious traders.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Button className="btn-hero text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-glass text-foreground hover:bg-glass"
              >
                Watch Demo
                <BarChart3 className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Live mini demo */}
            <motion.div
              className="glass-card p-6 rounded-xl space-y-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gain rounded-full animate-pulse" />
                  <span className="text-sm font-medium">LIVE DEMO</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">AAPL</div>
                  <div className="text-lg font-bold text-gain">
                    $<CountUp end={currentPrice} decimals={2} duration={1} />
                  </div>
                </div>
              </div>

              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--accent-cyan))"
                      strokeWidth={2}
                      dot={false}
                    />
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gain" />
                  <span className="text-gain">
                    +2.4% Signal Confidence: 87%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-warning" />
                  <span className="text-warning">Real-time</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Polished Matrix */}
          <motion.div
            className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MatrixTicker />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
