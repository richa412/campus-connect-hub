import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const glassCard = "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-xl";

function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-indigo-500 shadow-lg shadow-indigo-500/35 ring-1 ring-white/10">
        <span className="text-sm font-bold leading-none text-white">C</span>
      </div>
      <span className="text-lg font-semibold tracking-wide text-white">CampusPulse</span>
    </div>
  );
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Welcome back!");
      navigate("/app");
    } catch (error: any) {
      toast.error(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 ring-offset-slate-950 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/30";

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden text-white",
        "bg-gradient-to-br from-[#0b1120] via-[#1e293b] to-[#020617]",
      )}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-[15%] -top-[10%] h-[min(85vw,560px)] w-[min(85vw,560px)] rounded-full bg-indigo-500/30 blur-[128px]" />
        <div className="absolute -right-[20%] top-[15%] h-[min(75vw,500px)] w-[min(75vw,500px)] rounded-full bg-violet-600/25 blur-[110px]" />
        <div className="absolute left-1/2 top-[42%] h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-1/2 h-[min(70vw,480px)] w-[min(110vw,720px)] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Left panel */}
        <div className="hidden items-center justify-center p-8 lg:flex lg:w-1/2 lg:p-12">
          <div className="w-full max-w-md space-y-6">
            <BrandMark />
            <h2 className="text-3xl font-bold leading-tight tracking-tight">Welcome back to your campus community</h2>
            <p className="text-lg leading-relaxed text-gray-400">
              Stay connected with events, discussions, and opportunities happening right now.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-sm">
            <Link
              to="/"
              className="mb-8 flex items-center gap-2 transition-opacity duration-200 hover:opacity-90 lg:hidden"
            >
              <BrandMark />
            </Link>

            <div className={cn("p-6 sm:p-8", glassCard)}>
              <h1 className="mb-1 text-2xl font-bold tracking-tight">Log in</h1>
              <p className="mb-8 text-sm text-gray-400 sm:text-base">Enter your email to continue</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 font-bold text-xs uppercase tracking-widest">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-14 border-white/10 bg-white/5 pl-12 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between gap-2">
                    <Label htmlFor="password" className="text-gray-300 font-bold text-xs uppercase tracking-widest">
                      Password
                    </Label>
                    <Link to="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 transition-colors hover:text-indigo-300 hover:underline">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-14 border-white/10 bg-white/5 pl-12 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full h-14 rounded-xl bg-indigo-500 px-6 py-3 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-600 disabled:pointer-events-none disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Log in"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;