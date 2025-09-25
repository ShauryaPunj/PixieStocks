import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Zap, ArrowRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Mock live data
const mockData = [
  { time: "9:30", price: 1250 },
  { time: "9:35", price: 1265 },
  { time: "9:40", price: 1280 },
  { time: "9:45", price: 1275 },
  { time: "9:50", price: 1290 },
  { time: "9:55", price: 1310 },
];

function FloatingCandlestick({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

function Scene3D() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
      
      <FloatingCandlestick position={[-2, 0, 0]} />
      <FloatingCandlestick position={[0, 1, -1]} />
      <FloatingCandlestick position={[2, -0.5, 0]} />
      <FloatingCandlestick position={[1, 0.5, 1]} />
      <FloatingCandlestick position={[-1, -1, 1]} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function Hero() {
  const [currentPrice, setCurrentPrice] = useState(1250);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => prev + (Math.random() - 0.5) * 20);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
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
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Predict Tomorrow's{" "}
                <span className="bg-gradient-to-r from-cyan to-gain bg-clip-text text-transparent">
                  Winners
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Real-time AI signals, rigorous backtests, and explainable predictions — built for serious traders.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Button className="btn-hero text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-glass text-foreground hover:bg-glass">
                Watch Demo
                <BarChart3 className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Live mini demo */}
            <motion.div
              className="glass-card p-6 rounded-xl space-y-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
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
                  <span className="text-gain">+2.4% Signal Confidence: 87%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-warning" />
                  <span className="text-warning">Real-time</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - 3D Canvas */}
          <motion.div
            className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-glass to-transparent backdrop-blur-sm" />
            <Suspense fallback={
              <div className="w-full h-full bg-glass-strong rounded-2xl flex items-center justify-center">
                <div className="text-cyan animate-pulse">Loading 3D Scene...</div>
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Scene3D />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}