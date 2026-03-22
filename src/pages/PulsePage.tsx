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
  if (type === "positive") return <TrendingUp className="h-4 w-4 text-pulse-positive" />;
  if (type === "negative") return <TrendingDown className="h-4 w-4 text-pulse-negative" />;
  return <Minus className="h-4 w-4 text-pulse-neutral" />;
};

const PulsePage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Campus Pulse</h1>
          <p className="text-sm text-muted-foreground">Real-time insights from your campus</p>
        </div>
      </div>

      {/* Sentiment overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Positive", value: sentimentData.positive, color: "text-pulse-positive", bg: "bg-pulse-positive/10" },
          { label: "Neutral", value: sentimentData.neutral, color: "text-pulse-neutral", bg: "bg-pulse-neutral/10" },
          { label: "Negative", value: sentimentData.negative, color: "text-pulse-negative", bg: "bg-pulse-negative/10" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border p-5 shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">{s.label} Sentiment</p>
            <div className="flex items-end gap-2">
              <span className={cn("text-3xl font-bold", s.color)}>{s.value}%</span>
            </div>
            <div className={cn("h-2 rounded-full mt-3", s.bg)}>
              <div className={cn("h-full rounded-full", s.color.replace("text-", "bg-"))} style={{ width: `${s.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Trending */}
        <div className="lg:col-span-3 bg-card rounded-xl border shadow-sm">
          <div className="p-5 border-b flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Trending Topics</h2>
          </div>
          <div className="divide-y">
            {trendingTopics.map((t, i) => (
              <div key={t.topic} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors">
                <span className="text-lg font-bold text-muted-foreground w-6">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{t.topic}</p>
                  <p className="text-xs text-muted-foreground">{t.posts} posts</p>
                </div>
                <SentimentIcon type={t.sentiment} />
                <span className={cn("text-xs font-semibold",
                  t.sentiment === "positive" ? "text-pulse-positive" :
                  t.sentiment === "negative" ? "text-pulse-negative" : "text-pulse-neutral"
                )}>{t.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top discussions */}
        <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm">
          <div className="p-5 border-b flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Hot Discussions</h2>
          </div>
          <div className="divide-y">
            {topDiscussions.map((d) => (
              <div key={d.title} className="px-5 py-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <p className="font-medium text-sm mb-2">{d.title}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{d.replies}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{d.participants}</span>
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
