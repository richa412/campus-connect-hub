import { TrendingUp, TrendingDown, Minus, Zap, MessageCircle, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const trendingTopics = [
  { topic: "Hackathon 2026", posts: 234, sentiment: "positive" as const, change: "+42%" },
  { topic: "Exam Schedule", posts: 189, sentiment: "neutral" as const, change: "+18%" },
  { topic: "Cafeteria Prices", posts: 156, sentiment: "negative" as const, change: "+67%" },
  { topic: "Sports Meet", posts: 143, sentiment: "positive" as const, change: "+31%" },
  { topic: "Library Hours", posts: 98, sentiment: "neutral" as const, change: "+12%" },
];

const sentimentData = { positive: 58, neutral: 28, negative: 14 };

const topDiscussions = [
  { title: "Should campus Wi-Fi be upgraded?", replies: 89, participants: 47 },
  { title: "Best electives for next semester", replies: 64, participants: 38 },
  { title: "Feedback on new parking rules", replies: 52, participants: 31 },
];

const SentimentIcon = ({ type }: { type: string }) => {
  if (type === "positive") return <TrendingUp className="h-5 w-5 text-emerald-400" />;
  if (type === "negative") return <TrendingDown className="h-5 w-5 text-rose-400" />;
  return <Minus className="h-5 w-5 text-amber-400" />;
};

const PulsePage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Zap className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Campus Pulse</h1>
          <p className="text-base text-gray-400 font-medium">Real-time AI-powered insights from your campus activity</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Trending */}
        <div className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Trending Topics</h2>
            </div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">Updated Live</span>
          </div>
          <div className="divide-y divide-white/5">
            {trendingTopics.map((t, i) => (
              <div key={t.topic} className="flex items-center gap-6 px-8 py-6 hover:bg-white/5 transition-all duration-200 group">
                <span className="text-2xl font-black text-gray-700 w-10 group-hover:text-indigo-500/50 transition-colors">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg text-white mb-1 group-hover:text-indigo-300 transition-colors">{t.topic}</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.posts} Social Mentions</p>
                </div>
                <div className="flex items-center gap-4">
                  <SentimentIcon type={t.sentiment} />
                  <span className={cn("text-sm font-black tracking-tight",
                    t.sentiment === "positive" ? "text-emerald-400" :
                    t.sentiment === "negative" ? "text-rose-400" : "text-amber-400"
                  )}>{t.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discussions */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center gap-3 bg-white/5">
            <MessageCircle className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Discussions</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topDiscussions.map((d) => (
              <div key={d.title} className="px-8 py-8 hover:bg-white/5 transition-all duration-200 cursor-pointer group">
                <p className="font-bold text-base text-white mb-4 group-hover:text-purple-300 transition-colors leading-relaxed">{d.title}</p>
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <MessageCircle className="h-4 w-4 text-purple-400" /> {d.replies} <span className="text-[10px] uppercase opacity-60">Replies</span>
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Users className="h-4 w-4 text-emerald-400" /> {d.participants} <span className="text-[10px] uppercase opacity-60">Participants</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulsePage;
