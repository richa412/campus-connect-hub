import { cn } from "@/lib/utils";
import { topDiscussions, trendingTopics } from "@/data/campusData";
import { BarChart3, MessageCircle, Minus, TrendingDown, TrendingUp, Users, Zap } from "lucide-react";

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
          <p className="text-base text-gray-400 font-medium">Campus topics based on student posts and discussions</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Trending Topics</h2>
            </div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">Waiting for activity</span>
          </div>
          <div className="divide-y divide-white/5">
            {trendingTopics.length === 0 && (
              <div className="px-8 py-12 text-center">
                <p className="font-bold text-white">No campus trends yet</p>
                <p className="mt-2 text-sm text-gray-400">
                  Trending topics will appear here as students post and interact.
                </p>
              </div>
            )}
            {trendingTopics.map((topic, index) => (
              <div key={topic.topic} className="flex items-center gap-6 px-8 py-6 hover:bg-white/5 transition-all duration-200 group">
                <span className="text-2xl font-black text-gray-700 w-10 group-hover:text-indigo-500/50 transition-colors">#{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg text-white mb-1 group-hover:text-indigo-300 transition-colors">{topic.topic}</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{topic.posts} Social Mentions</p>
                </div>
                <div className="flex items-center gap-4">
                  <SentimentIcon type={topic.sentiment} />
                  <span className={cn("text-sm font-black tracking-tight",
                    topic.sentiment === "positive" ? "text-emerald-400" :
                    topic.sentiment === "negative" ? "text-rose-400" : "text-amber-400",
                  )}>{topic.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center gap-3 bg-white/5">
            <MessageCircle className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Discussions</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topDiscussions.length === 0 && (
              <div className="px-8 py-12 text-center">
                <p className="font-bold text-white">No active discussions yet</p>
                <p className="mt-2 text-sm text-gray-400">
                  Popular threads will be highlighted here once conversations begin.
                </p>
              </div>
            )}
            {topDiscussions.map((discussion) => (
              <div key={discussion.title} className="px-8 py-8 hover:bg-white/5 transition-all duration-200 cursor-pointer group">
                <p className="font-bold text-base text-white mb-4 group-hover:text-purple-300 transition-colors leading-relaxed">{discussion.title}</p>
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <MessageCircle className="h-4 w-4 text-purple-400" /> {discussion.replies} <span className="text-[10px] uppercase opacity-60">Replies</span>
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Users className="h-4 w-4 text-emerald-400" /> {discussion.participants} <span className="text-[10px] uppercase opacity-60">Participants</span>
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
