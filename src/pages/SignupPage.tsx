import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEduEmail = email.includes(".edu") || email.includes(".ac.");

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <img src={logo} alt="CampusPulse" className="h-16 w-auto mb-8 brightness-0 invert" />
          <h2 className="text-3xl font-bold mb-4 leading-tight">Join your campus community</h2>
          <p className="text-primary-foreground/70 text-lg">Sign up with your college email to get started. We'll auto-detect your campus.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <img src={logo} alt="CampusPulse" className="h-10 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold mb-1">Create account</h1>
          <p className="text-muted-foreground mb-8">Use your college email to join</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="Your full name" className="pl-10" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">College email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@university.edu" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {email && !isEduEmail && (
                <p className="text-xs text-destructive">Please use a valid college email (.edu or .ac.)</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Min 8 characters" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button variant="hero" className="w-full" size="lg" disabled={!isEduEmail || !name || password.length < 8}>
              Create account <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
