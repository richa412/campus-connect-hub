import { Link } from "react-router-dom";
import { Zap, Users, Calendar, ShoppingBag, MessageCircle, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const features = [
  { icon: Zap, title: "Campus Pulse", desc: "Real-time trending topics, sentiment analysis, and campus insights powered by collective student activity." },
  { icon: Users, title: "Community Feed", desc: "Share updates, spark discussions, and connect with peers through a rich social feed with tags and threads." },
  { icon: Calendar, title: "Events Hub", desc: "Discover campus events, RSVP instantly, and never miss what matters with smart reminders." },
  { icon: TrendingUp, title: "Opportunities", desc: "Find internships, projects, and collaborations filtered by your skills and interests." },
  { icon: ShoppingBag, title: "Marketplace", desc: "Buy and sell textbooks, gadgets, and more within your trusted campus community." },
  { icon: MessageCircle, title: "Messaging", desc: "Direct chats and topic-based rooms for seamless real-time conversations." },
];

const glassCard = "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("animate-reveal-up"); observer.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    el.querySelectorAll("[data-reveal]").forEach((c) => {
      (c as HTMLElement).style.opacity = "0";
      observer.observe(c);
    });
    return () => observer.disconnect();
  }, []);
  return ref;
}

const LandingPage = () => {
  const featuresRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden text-white",
        "bg-gradient-to-br from-[#0b1120] via-[#1e293b] to-[#020617]",
      )}
    >
      {/* Background glow — indigo / purple depth */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-[15%] -top-[10%] h-[min(85vw,560px)] w-[min(85vw,560px)] rounded-full bg-indigo-500/30 blur-[128px]" />
        <div className="absolute -right-[20%] top-[15%] h-[min(75vw,500px)] w-[min(75vw,500px)] rounded-full bg-violet-600/25 blur-[110px]" />
        <div className="absolute left-1/2 top-[42%] h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-1/2 h-[min(70vw,480px)] w-[min(110vw,720px)] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 transition-opacity duration-200 hover:opacity-90"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-indigo-500 shadow-lg shadow-indigo-500/35 ring-1 ring-white/10">
              <span className="text-sm font-bold leading-none text-white">C</span>
            </div>
            <span className="text-lg font-semibold tracking-wide text-white">CampusPulse</span>
          </Link>
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-8 px-4 text-sm font-medium text-gray-400 md:flex">
            <a href="#features" className="transition-colors duration-200 hover:text-white">Features</a>
            <a href="#pulse" className="transition-colors duration-200 hover:text-white">Campus Pulse</a>
            <a href="#community" className="transition-colors duration-200 hover:text-white">Community</a>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-xl px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white sm:px-4"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-600 hover:shadow-xl sm:px-6 sm:py-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — min-h-screen + centered */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:px-8">
        <div className={cn("relative z-10 w-full max-w-3xl", glassCard)}>
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm animate-reveal-up",
              )}
            >
              <Zap className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
              Your campus, one platform
            </div>
            <h1
              className="mb-6 max-w-4xl text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl animate-reveal-up"
              style={{ animationDelay: "100ms" }}
            >
              Stay in sync with
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                your campus
              </span>
            </h1>
            <p
              className="mb-10 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl animate-reveal-up"
              style={{ animationDelay: "200ms" }}
            >
              CampusPulse unifies events, discussions, opportunities, and marketplace into one student-only ecosystem — with real-time pulse analytics on what your campus is thinking.
            </p>
            <div
              className="flex w-full max-w-lg flex-col items-stretch justify-center gap-4 sm:max-w-none sm:flex-row sm:items-center sm:justify-center animate-reveal-up"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-center text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-600 hover:shadow-xl"
              >
                Join your campus
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                to="#features"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-center text-base font-medium text-white transition-all duration-200 hover:scale-105 hover:border-white/35 hover:bg-white/5 hover:shadow-xl"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-28" ref={featuresRef}>
        <div className="container mx-auto max-w-6xl space-y-8 sm:space-y-10">
          <div className={cn(glassCard, "text-center")} data-reveal>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Everything your campus needs</h2>
            <p className="mx-auto max-w-xl text-base text-gray-400 sm:text-lg">
              One platform to connect, discover, trade, and stay informed across your entire university.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                data-reveal
                style={{ animationDelay: `${i * 80}ms` }}
                className={cn(
                  glassCard,
                  "group transition-all duration-200",
                  "hover:scale-105 hover:shadow-xl",
                )}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-indigo-500/20 backdrop-blur-sm">
                  <f.icon className="h-5 w-5 text-indigo-300" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse CTA */}
      <section id="pulse" className="relative z-10 px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-28" ref={ctaRef}>
        <div className="container mx-auto max-w-4xl" data-reveal>
          <div className={cn(glassCard, "text-center")}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Feel the pulse of your campus</h2>
            <p className="mx-auto mb-8 max-w-lg text-base text-gray-400 sm:text-lg">
              Real-time sentiment analysis, trending topics, and insight into what students are talking about — updated live.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-1 rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-indigo-600 hover:shadow-xl"
            >
              Get started 
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-white/[0.02] py-10 backdrop-blur-lg">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-sm text-gray-400 sm:flex-row sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-90"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-indigo-500 shadow-md shadow-indigo-500/30 ring-1 ring-white/10">
              <span className="text-xs font-bold leading-none text-white">C</span>
            </div>
            <span className="text-base font-semibold tracking-wide text-white/95">CampusPulse</span>
          </Link>
          <p className="text-center">© {new Date().getFullYear()} CampusPulse. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="transition-colors duration-200 hover:text-white">About</Link>
            <Link to="/privacy" className="transition-colors duration-200 hover:text-white">Privacy</Link>
            <Link to="/contact" className="transition-colors duration-200 hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
