import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";
import CountUp from "react-countup";

// Mock data for charts
const performanceData = [
  { month: "Jan", portfolio: 100000, benchmark: 100000 },
  { month: "Feb", portfolio: 105000, benchmark: 102000 },
  { month: "Mar", portfolio: 115000, benchmark: 98000 },
  { month: "Apr", portfolio: 125000, benchmark: 105000 },
  { month: "May", portfolio: 135000, benchmark: 108000 },
  { month: "Jun", portfolio: 145000, benchmark: 112000 },
];

const signalsData = [
  { symbol: "AAPL", confidence: 92, direction: "up", change: "+2.4%" },
  { symbol: "TSLA", confidence: 87, direction: "up", change: "+5.1%" },
  { symbol: "GOOGL", confidence: 83, direction: "down", change: "-1.2%" },
  { symbol: "MSFT", confidence: 91, direction: "up", change: "+1.8%" },
  { symbol: "META", confidence: 76, direction: "down", change: "-0.8%" },
];

const shapData = [
  { feature: "RSI", weight: 0.35 },
  { feature: "Volume", weight: 0.28 },
  { feature: "MA Cross", weight: 0.22 },
  { feature: "Sentiment", weight: 0.15 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("performance");
  const [metrics, setMetrics] = useState({
    totalReturn: 45.2,
    sharpe: 1.87,
    maxDrawdown: -5.3,
    winRate: 73.4,
  });

  useEffect(() => {
    // Simulate live metric updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalReturn: prev.totalReturn + (Math.random() - 0.5) * 0.5,
        sharpe: prev.sharpe + (Math.random() - 0.5) * 0.05,
        maxDrawdown: prev.maxDrawdown + (Math.random() - 0.5) * 0.2,
        winRate: prev.winRate + (Math.random() - 0.5) * 0.3,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-navy/50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Performance{" "}
            <span className="bg-gradient-to-r from-cyan to-gain bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time portfolio analytics, signal monitoring, and AI explainability in one integrated platform.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Main chart */}
          <motion.div
            className="lg:col-span-2 glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Portfolio Performance</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("performance")}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "performance" 
                      ? "bg-cyan text-navy" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Performance
                </button>
                <button
                  onClick={() => setActiveTab("signals")}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === "signals" 
                      ? "bg-cyan text-navy" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Live Signals
                </button>
              </div>
            </div>

            {activeTab === "performance" ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="portfolio" 
                      stroke="hsl(var(--accent-cyan))" 
                      strokeWidth={3}
                      name="AI Portfolio"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="S&P 500"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="space-y-4">
                {signalsData.map((signal, index) => (
                  <motion.div
                    key={signal.symbol}
                    className="flex items-center justify-between p-4 rounded-lg bg-glass-strong hover:bg-glass transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-lg">{signal.symbol}</div>
                      <div className="flex items-center gap-2">
                        {signal.direction === "up" ? (
                          <TrendingUp className="w-4 h-4 text-gain" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-loss" />
                        )}
                        <span className={signal.direction === "up" ? "text-gain" : "text-loss"}>
                          {signal.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Confidence</div>
                      <div className="font-bold text-cyan">{signal.confidence}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right column - Metrics and SHAP */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Metrics */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="metric-chip justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gain" />
                    <span className="text-xs uppercase text-muted-foreground">Total Return</span>
                  </div>
                  <div className="text-xl font-bold text-gain">
                    <CountUp end={metrics.totalReturn} decimals={1} duration={2} suffix="%" />
                  </div>
                </div>
                
                <div className="metric-chip justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan" />
                    <span className="text-xs uppercase text-muted-foreground">Sharpe Ratio</span>
                  </div>
                  <div className="text-xl font-bold text-cyan">
                    <CountUp end={metrics.sharpe} decimals={2} duration={2} />
                  </div>
                </div>
                
                <div className="metric-chip justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-loss" />
                    <span className="text-xs uppercase text-muted-foreground">Max Drawdown</span>
                  </div>
                  <div className="text-xl font-bold text-loss">
                    <CountUp end={metrics.maxDrawdown} decimals={1} duration={2} suffix="%" />
                  </div>
                </div>
                
                <div className="metric-chip justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-warning" />
                    <span className="text-xs uppercase text-muted-foreground">Win Rate</span>
                  </div>
                  <div className="text-xl font-bold text-warning">
                    <CountUp end={metrics.winRate} decimals={1} duration={2} suffix="%" />
                  </div>
                </div>
              </div>
            </div>

            {/* SHAP Explainability */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Signal Drivers</h3>
              <div className="space-y-3">
                {shapData.map((item, index) => (
                  <div key={item.feature} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.feature}</span>
                      <span className="text-cyan">{(item.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-glass rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan to-gain"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.weight * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}