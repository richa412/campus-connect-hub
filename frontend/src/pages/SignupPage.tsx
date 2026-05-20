import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight, KeyRound } from "lucide-react";
import { cn, getErrorMessage } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const glassCard = "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-xl";

function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-indigo-500 shadow-lg shadow-indigo-500/35 ring-1 ring-white/10">
        <span className="text-sm font-bold leading-none text-white">C</span>
      </div>
      <span className="text-lg font-semibold tracking-wide text-white">Campus Connect</span>
    </div>
  );
}

const SignupPage = () => {
  const [step, setStep] = useState<"email" | "otp" | "profile">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data: exists, error: rpcError } = await supabase
      .rpc("check_user_exists", { email });

    if (rpcError) throw rpcError;

    if (exists) {
      toast.error("User already exists! Please log in.");
    } else {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (otpError) throw otpError;

      toast.success("Verification code sent to your email!");
      setStep("otp");
    }
  } catch (error: unknown) {
    toast.error(getErrorMessage(error, "Failed to send verification code"));
  } finally {
    setLoading(false);
  }
};
  const handleResendOTP = async () => {
    setResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) throw error;
      toast.success("Code resent successfully!");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to resend code"));
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setLoading(true);
    try {
      const { error, data } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error;

      if (data?.session) {
        const hasProfile = !!data.user?.user_metadata?.full_name;

        if (hasProfile) {
          toast.info("Welcome back! Logging you in...");
          navigate("/app");
        } else {
          toast.success("Email verified! Let's set up your profile.");
          setStep("profile");
        }
      } else {
        throw new Error("Verification failed - no session established");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Invalid or expired code"));
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || password.length < 8) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
        data: { full_name: name },
      });

      if (error) throw error;

      toast.success("Account created successfully!");
      navigate("/app");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to complete profile"));
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
        <div className="hidden items-center justify-center p-8 lg:flex lg:w-1/2 lg:p-12">
          <div className="w-full max-w-md space-y-6">
            <BrandMark />
            <h2 className="text-3xl font-bold leading-tight tracking-tight">Join your campus community</h2>
            <p className="text-lg leading-relaxed text-gray-400">
              Sign up with your email to get started.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-sm">
            <Link
              to="/"
              className="mb-8 flex items-center gap-2 transition-opacity duration-200 hover:opacity-90 lg:hidden"
            >
              <BrandMark />
            </Link>

            <div className={cn("p-6 sm:p-8", glassCard)}>
              <h1 className="mb-1 text-2xl font-bold tracking-tight">
                {step === "email" && "Create account"}
                {step === "otp" && "Verify email"}
                {step === "profile" && "Complete profile"}
              </h1>
              <p className="mb-8 text-sm text-gray-400 sm:text-base">
                {step === "email" && "Use your email to join"}
                {step === "otp" && `We've sent a code to ${email}`}
                {step === "profile" && "Set your name and password"}
              </p>

              {step === "email" && (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 font-bold text-xs uppercase tracking-widest">
                      Email address
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
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full h-14 rounded-xl bg-indigo-500 px-6 py-3 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-600 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Get Started"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              )}

              {step === "otp" && (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-gray-300 font-bold text-xs uppercase tracking-widest text-center block">
                      Verification Code
                    </Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot index={0} className="h-12 w-10 border-white/10 bg-white/5 text-white text-lg" />
                          <InputOTPSlot index={1} className="h-12 w-10 border-white/10 bg-white/5 text-white text-lg" />
                          <InputOTPSlot index={2} className="h-12 w-10 border-white/10 bg-white/5 text-white text-lg" />
                          <InputOTPSlot index={3} className="h-12 w-10 border-white/10 bg-white/5 text-white text-lg" />
                          <InputOTPSlot index={4} className="h-12 w-10 border-white/10 bg-white/5 text-white text-lg" />
                          <InputOTPSlot index={5} className="h-12 w-10 border-white/10 bg-white/5 text-white text-lg" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={otp.length !== 6 || loading}
                    className="w-full h-14 rounded-xl bg-indigo-500 px-6 py-3 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-600 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify Code"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resending}
                      className="w-full text-center text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                    >
                      {resending ? "Sending..." : "Resend code"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="w-full text-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-300"
                    >
                      Change email
                    </button>
                  </div>
                </form>
              )}

              {step === "profile" && (
                <form onSubmit={handleCompleteProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300 font-bold text-xs uppercase tracking-widest">
                      Full name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="name"
                        placeholder="Your full name"
                        className="h-14 border-white/10 bg-white/5 pl-12 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300 font-bold text-xs uppercase tracking-widest">
                      Create Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Min 8 characters"
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
                    disabled={!name || password.length < 8 || loading}
                    className="w-full h-14 rounded-xl bg-indigo-500 px-6 py-3 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-600 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Account"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              )}

              <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
