import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import InteractiveDemo from "@/components/InteractiveDemo";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="dashboard">
          <Dashboard />
        </div>
        <InteractiveDemo />
        <div id="pricing">
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
