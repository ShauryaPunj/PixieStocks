import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, TrendingDown, DollarSign, Target, Zap } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  confidence: number;
}

const mockAssets: Asset[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 185.25, change: 2.4, confidence: 92 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 242.50, change: 5.1, confidence: 87 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 125.75, change: -1.2, confidence: 83 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.90, change: 1.8, confidence: 91 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 495.20, change: 3.7, confidence: 89 },
];

export default function InteractiveDemo() {
  const [portfolio, setPortfolio] = useState<Asset[]>([]);
  const [balance, setBalance] = useState(100000);
  const [riskTolerance, setRiskTolerance] = useState([50]);
  const [isTrading, setIsTrading] = useState(false);

  const addToPortfolio = (asset: Asset) => {
    if (!portfolio.find(p => p.symbol === asset.symbol)) {
      setPortfolio([...portfolio, asset]);
      // Simulate buying cost
      setBalance(prev => prev - (asset.price * 10));
    }
  };

  const removeFromPortfolio = (symbol: string) => {
    const asset = portfolio.find(p => p.symbol === symbol);
    if (asset) {
      setPortfolio(portfolio.filter(p => p.symbol !== symbol));
      // Simulate selling
      setBalance(prev => prev + (asset.price * 10 * (1 + asset.change / 100)));
    }
  };

  const portfolioValue = portfolio.reduce((total, asset) => {
    return total + (asset.price * 10 * (1 + asset.change / 100));
  }, 0);

  const totalValue = balance + portfolioValue;
  const totalReturn = ((totalValue - 100000) / 100000) * 100;

  useEffect(() => {
    if (isTrading) {
      const timer = setTimeout(() => {
        setIsTrading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isTrading]);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-navy/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Try Our{" "}
            <span className="bg-gradient-to-r from-cyan to-gain bg-clip-text text-transparent">
              Live Simulator
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our AI signals in action. Build a portfolio, adjust your risk tolerance, and see how our predictions perform.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-glass text-sm">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
            <span className="text-warning font-medium">DEMO MODE - Not real money</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Assets */}
          <motion.div
            className="lg:col-span-2 glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan" />
              Live AI Signals
            </h3>
            
            <div className="space-y-4">
              {mockAssets.map((asset, index) => (
                <motion.div
                  key={asset.symbol}
                  className="flex items-center justify-between p-4 rounded-lg bg-glass-strong hover:bg-glass transition-all duration-200 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-bold text-lg">{asset.symbol}</div>
                      <div className="text-sm text-muted-foreground">{asset.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${asset.price}</div>
                      <div className={`text-sm flex items-center gap-1 ${
                        asset.change > 0 ? "text-gain" : "text-loss"
                      }`}>
                        {asset.change > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {asset.change > 0 ? "+" : ""}{asset.change}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Confidence</div>
                      <div className="font-bold text-cyan">{asset.confidence}%</div>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => addToPortfolio(asset)}
                      disabled={portfolio.find(p => p.symbol === asset.symbol) !== undefined}
                      className="bg-gradient-to-r from-gain to-cyan text-navy hover:opacity-90 disabled:opacity-50"
                    >
                      {portfolio.find(p => p.symbol === asset.symbol) ? "Added" : "Add"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Portfolio & Controls */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Portfolio */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-gain" />
                Your Portfolio
              </h3>
              
              <div className="min-h-[200px] border-2 border-dashed border-glass rounded-lg p-4 mb-4">
                <AnimatePresence>
                  {portfolio.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Drag assets here or click "Add"
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {portfolio.map((asset) => (
                        <motion.div
                          key={asset.symbol}
                          className="flex items-center justify-between p-3 rounded-lg bg-glass"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          layout
                        >
                          <div>
                            <div className="font-semibold">{asset.symbol}</div>
                            <div className="text-xs text-muted-foreground">10 shares</div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromPortfolio(asset.symbol)}
                            className="text-loss border-loss hover:bg-loss hover:text-navy"
                          >
                            Sell
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Risk Tolerance */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Risk Tolerance: {riskTolerance[0]}%</label>
                <Slider
                  value={riskTolerance}
                  onValueChange={setRiskTolerance}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Execute Trade Button */}
              <Button
                className="w-full btn-hero"
                onClick={() => setIsTrading(true)}
                disabled={portfolio.length === 0 || isTrading}
              >
                {isTrading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                    Executing...
                  </div>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    Execute Trades
                  </>
                )}
              </Button>
            </div>

            {/* Performance Metrics */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Performance</h3>
              
              <div className="space-y-4">
                <div className="metric-chip justify-between">
                  <span className="text-xs uppercase text-muted-foreground">Cash Balance</span>
                  <span className="font-bold text-cyan">${balance.toLocaleString()}</span>
                </div>
                
                <div className="metric-chip justify-between">
                  <span className="text-xs uppercase text-muted-foreground">Portfolio Value</span>
                  <span className="font-bold text-gain">${portfolioValue.toFixed(0)}</span>
                </div>
                
                <div className="metric-chip justify-between">
                  <span className="text-xs uppercase text-muted-foreground">Total Return</span>
                  <span className={`font-bold ${totalReturn >= 0 ? "text-gain" : "text-loss"}`}>
                    {totalReturn >= 0 ? "+" : ""}{totalReturn.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}