import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";
import { Mail, Lock, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate("/app");
    }
  };

  return (

    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <img src={logo} alt="CampusPulse" className="h-16 w-auto mb-8 brightness-0 invert" />
          <h2 className="text-3xl font-bold mb-4 leading-tight">Welcome back to your campus community</h2>
          <p className="text-primary-foreground/70 text-lg">Stay connected with events, discussions, and opportunities happening right now.</p>
        </div>
      </div>
      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <img src={logo} alt="CampusPulse" className="h-10 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold mb-1">Log in</h1>
          <p className="text-muted-foreground mb-8">Enter your college email to continue</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@university.edu" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button variant="hero" className="w-full" size="lg">
              Log in <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
