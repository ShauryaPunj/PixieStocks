// src/pages/AuthTest.tsx
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, UserCheck, BarChart3, Database } from "lucide-react";

export default function AuthTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [log, setLog] = useState("");

  async function signup() {
    setLog("Signing up...");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setLog(`❌ Signup error: ${error.message}`);
    setLog(`✅ Signup ok. user=${data.user?.id}`);
  }

  async function checkProfile() {
    const { data: s } = await supabase.auth.getSession();
    const uid = s.session?.user.id;
    if (!uid) return setLog("No session.");
    const { data, error } = await supabase
      .from("user_profiles")
      .select("id,email,subscription_tier")
      .eq("id", uid)
      .single();
    if (error) return setLog(`❌ Profile error: ${error.message}`);
    setLog(`✅ Profile ok: ${JSON.stringify(data)}`);
  }

  async function insertSignal() {
    const { data: s } = await supabase.auth.getSession();
    const uid = s.session?.user.id;
    if (!uid) return setLog("No session.");
    const { error } = await supabase.from("signals").insert([
      {
        user_id: uid,
        symbol: "AAPL",
        date: new Date().toISOString().slice(0, 10),
        signal: "buy",
        confidence: 0.8,
      },
    ]);
    if (error) return setLog(`❌ Insert error: ${error.message}`);
    setLog("✅ Inserted signal.");
  }

  async function listMySignals() {
    const { data: s } = await supabase.auth.getSession();
    const uid = s.session?.user.id;
    if (!uid) return setLog("No session.");
    const { data, error } = await supabase
      .from("signals")
      .select("id,symbol,date,signal,confidence")
      .eq("user_id", uid)
      .order("date", { ascending: false });
    if (error) return setLog(`❌ List error: ${error.message}`);
    setLog(`📊 My signals: ${JSON.stringify(data)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-background to-navy/80 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass-card border border-cyan/30 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-2">
              <span className="text-gradient">TradingAI</span> Auth / RLS Test
            </h1>
            <p className="text-muted-foreground text-center mb-6 text-sm">
              Quick sanity screen for signup, profile, and your AI signals.
            </p>

            <div className="space-y-4">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-glass-strong"
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-glass-strong"
              />

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={signup}
                  className="bg-gradient-to-r from-cyan to-gain text-navy"
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Sign up
                </Button>
                <Button
                  variant="outline"
                  onClick={checkProfile}
                  className="border-cyan text-cyan"
                >
                  <UserCheck className="w-4 h-4 mr-2" /> Check profile
                </Button>
                <Button
                  onClick={insertSignal}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500"
                >
                  <Database className="w-4 h-4 mr-2" /> Insert signal
                </Button>
                <Button
                  variant="success"
                  onClick={listMySignals}
                  className="bg-gain text-navy"
                >
                  <BarChart3 className="w-4 h-4 mr-2" /> List my signals
                </Button>
              </div>
            </div>

            <motion.pre
              className="mt-6 p-4 rounded-lg bg-black/80 text-green-400 text-xs overflow-x-auto min-h-[80px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {log}
            </motion.pre>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
