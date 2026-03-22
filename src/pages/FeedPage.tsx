import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const posts = [
  { id: 1, author: "Priya Sharma", initials: "PS", campus: "IIT Delhi", time: "12m ago", content: "Just finished the robotics hackathon — our team built an autonomous delivery bot in 36 hours! 🤖 Anyone else participating?", tags: ["hackathon", "robotics"], likes: 47, comments: 12 },
  { id: 2, author: "Arjun Mehta", initials: "AM", campus: "IIT Delhi", time: "1h ago", content: "The new library extension is finally open! Third floor has amazing quiet study pods. Highly recommend for finals prep.", tags: ["campus-life", "library"], likes: 83, comments: 24 },
  { id: 3, author: "Nisha Patel", initials: "NP", campus: "IIT Delhi", time: "2h ago", content: "Looking for 2 more teammates for the upcoming inter-college debate competition. Topic is AI ethics in education. DM if interested!", tags: ["debate", "team-up"], likes: 31, comments: 8 },
  { id: 4, author: "Rahul Singh", initials: "RS", campus: "IIT Delhi", time: "3h ago", content: "PSA: The cafeteria's new south Indian counter is 🔥. The masala dosa is seriously underpriced.", tags: ["food", "campus-life"], likes: 124, comments: 41 },
];

const FeedPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Feed</h1>

      {/* Create post */}
      <div className="bg-card rounded-xl border p-4 shadow-sm">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground shrink-0">AP</div>
          <div className="flex-1">
            <div className="bg-muted rounded-lg px-4 py-2.5 text-sm text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors">
              What's happening on campus?
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground"><ImageIcon className="h-4 w-4 mr-1" /> Photo</Button>
              <div className="flex-1" />
              <Button variant="hero" size="sm">Post</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <article key={post.id} className="bg-card rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">{post.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm">{post.author}</span>
                  <span className="text-muted-foreground text-xs ml-2">{post.campus} · {post.time}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed">{post.content}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                <button className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-destructive transition-colors">
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-muted-foreground text-sm hover:text-primary transition-colors ml-auto">
                  <Share2 className="h-4 w-4" />
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
