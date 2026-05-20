import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { feedPosts } from "@/data/campusData";
import { Heart, Image as ImageIcon, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";

const FeedPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl transition-all duration-200 hover:scale-[1.01]">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0">CC</div>
          <div className="flex-1">
            <div className="bg-white/10 rounded-xl px-5 py-3.5 text-sm text-gray-400 cursor-pointer hover:bg-white/15 transition-all duration-200 border border-white/5">
              What's happening on campus?
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white"><ImageIcon className="h-4 w-4 mr-2" /> Photo</Button>
              <div className="flex-1" />
              <Button variant="default" size="sm">Post</Button>
            </div>
          </div>
        </div>
      </div>

      {feedPosts.length === 0 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl text-center">
          <h2 className="text-xl font-bold text-white">No posts yet</h2>
          <p className="mt-2 text-sm text-gray-400">
            Student updates, questions, photos, and campus discussions will appear here once people start posting.
          </p>
        </div>
      )}

      {feedPosts.map((post) => (
        <article key={post.id} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl transition-all duration-200 hover:scale-[1.01]">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 rounded-xl border border-white/10">
              <AvatarFallback className="bg-indigo-500 text-white text-xs font-bold">{post.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-base text-white">{post.author}</span>
                  <span className="text-gray-400 text-xs ml-3">{post.campus} - {post.time}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white"><MoreHorizontal className="h-5 w-5" /></Button>
              </div>
              <p className="mt-2 text-base leading-relaxed text-gray-300">{post.content}</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 text-indigo-300 px-3 py-1.5 rounded-lg font-semibold border border-white/5">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-5 pt-5 border-t border-white/10">
                <button className="flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-rose-400 transition-colors">
                  <Heart className="h-5 w-5" /> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-indigo-400 transition-colors">
                  <MessageCircle className="h-5 w-5" /> {post.comments}
                </button>
                <button className="flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-indigo-400 transition-colors ml-auto">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FeedPage;
