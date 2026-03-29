import { useState } from "react";
import { User, Mail, Sparkles, MapPin, Edit3, Plus, Image as ImageIcon, Zap, X, LayoutGrid, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const myPosts = [
  { id: 1, author: "Aditya Patel", initials: "AP", campus: "IIT Delhi", time: "2d ago", content: "Working on a new UI theme for CampusPulse. Glassmorphism is really growing on me! What do you guys think? ✨", tags: ["UIUX", "development"], likes: 124, comments: 18 },
  { id: 2, author: "Aditya Patel", initials: "AP", campus: "IIT Delhi", time: "5d ago", content: "Just finished my semester project on Machine Learning. The results are looking promising! 🚀", tags: ["ML", "IITD"], likes: 89, comments: 12 },
];

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const [name, setName] = useState("Aditya Patel");
  const [email, setEmail] = useState("aditya@iitdelhi.ac.in");
  const [course, setCourse] = useState("B.Tech Computer Science");
  const [year, setYear] = useState("3rd Year");
  const [skills, setSkills] = useState(["React", "TypeScript", "Python", "Machine Learning", "UI Design"]);
  const [interests, setInterests] = useState(["Hackathons", "Open Source", "Startups", "Music", "Photography"]);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState<"text" | "photo">("text");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-indigo-500/10">
        <div className="h-48 bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-transparent relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.4),transparent)]" />
        </div>
        <div className="px-10 pb-10 -mt-20 relative z-10">
          <div className="flex items-end gap-6 mb-8">
            <div className="h-32 w-32 rounded-3xl bg-indigo-500 flex items-center justify-center text-4xl font-bold text-white border-8 border-[#0b1120] shadow-2xl">
              {name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="pb-2 flex-1">
              <h1 className="text-3xl font-bold text-white tracking-tight">{name}</h1>
              <p className="text-base text-gray-400 font-medium">{course} · {year}</p>
            </div>
            
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl border-white/10 hover:bg-white/10">
                  <Edit3 className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0b1120] border-white/10 text-white sm:max-w-[500px] max-h-[90vh] overflow-y-auto custom-scrollbar">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-400">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="course" className="text-sm font-bold uppercase tracking-widest text-gray-400">Course</Label>
                      <Input 
                        id="course" 
                        value={course} 
                        onChange={(e) => setCourse(e.target.value)}
                        className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="year" className="text-sm font-bold uppercase tracking-widest text-gray-400">Year</Label>
                      <Input 
                        id="year" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)}
                        className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-gray-400">Professional Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skills.map((s) => (
                        <Badge key={s} variant="secondary" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                          {s}
                          <button onClick={() => handleRemoveSkill(s)} className="hover:text-white">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <form onSubmit={handleAddSkill} className="flex gap-2">
                      <Input 
                        placeholder="Add a skill..." 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="bg-white/5 border-white/10 text-white rounded-xl h-10"
                      />
                      <Button type="submit" size="sm" className="bg-indigo-500 hover:bg-indigo-600 rounded-xl px-4">Add</Button>
                    </form>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-gray-400">Interests & Hobbies</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {interests.map((i) => (
                        <Badge key={i} variant="outline" className="border-white/10 text-gray-300 px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                          {i}
                          <button onClick={() => handleRemoveInterest(i)} className="hover:text-white">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <form onSubmit={handleAddInterest} className="flex gap-2">
                      <Input 
                        placeholder="Add an interest..." 
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        className="bg-white/5 border-white/10 text-white rounded-xl h-10"
                      />
                      <Button type="submit" size="sm" className="bg-indigo-500 hover:bg-indigo-600 rounded-xl px-4">Add</Button>
                    </form>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsEditOpen(false)} className="bg-indigo-500 hover:bg-indigo-600 rounded-xl w-full h-12 font-bold">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-400">
                <span className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/5"><Mail className="h-4 w-4 text-indigo-400" /> {email}</span>
                <span className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/5"><MapPin className="h-4 w-4 text-indigo-400" /> IIT Delhi</span>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Professional Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <Badge key={s} variant="secondary" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20 px-3 py-1 rounded-lg font-bold">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4">Interests & Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <Badge key={i} variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 px-3 py-1 rounded-lg font-bold">
                        {i}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* My Posts Section */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <LayoutGrid className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">My Posts</h2>
                </div>
                
                <div className="grid gap-6">
                  {myPosts.map((post) => (
                    <article key={post.id} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl transition-all duration-200 hover:scale-[1.01]">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 rounded-xl border border-white/10">
                          <AvatarFallback className="bg-indigo-500 text-white text-xs font-bold">{post.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-base text-white">{post.author}</span>
                              <span className="text-gray-400 text-xs ml-3">{post.campus} · {post.time}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB and Post Dialog */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4">
        <Dialog open={isPostOpen} onOpenChange={setIsPostOpen}>
          {isFabOpen && (
            <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-4 duration-300">
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setPostType("text");
                    setIsFabOpen(false);
                  }}
                  className="bg-[#0b1120] backdrop-blur-md border border-white/10 text-white rounded-xl px-8 py-7 shadow-2xl hover:bg-white/10 transition-all flex items-center gap-3 font-bold text-lg"
                >
                  <ImageIcon className="h-6 w-6 text-indigo-400" /> Post
                </Button>
              </DialogTrigger>
              <Button 
                onClick={() => setIsFabOpen(false)}
                className="bg-[#0b1120] backdrop-blur-md border border-white/10 text-white rounded-xl px-8 py-7 shadow-2xl hover:bg-white/10 transition-all flex items-center gap-3 font-bold text-lg"
              >
                <Zap className="h-6 w-6 text-amber-400" /> Live
              </Button>
            </div>
          )}
          
          <Button 
            onClick={() => setIsFabOpen(!isFabOpen)}
            className={cn(
              "h-16 w-16 rounded-2xl bg-indigo-500 text-white shadow-2xl shadow-indigo-500/40 flex items-center justify-center transition-all duration-300",
              isFabOpen ? "rotate-45 bg-rose-500 shadow-rose-500/40" : "hover:scale-110"
            )}
          >
            <Plus className="h-10 w-10" />
          </Button>

          <DialogContent className="bg-[#0b1120] border-white/10 text-white sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Create a Post</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label className="text-sm font-bold uppercase tracking-widest text-gray-400">Content</Label>
                <Textarea 
                  placeholder="What's on your mind?" 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="bg-white/5 border-white/10 text-white rounded-xl min-h-[150px] p-4 text-lg"
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl border-white/10 hover:bg-white/10 h-12 font-bold"
                  onClick={() => setPostType("photo")}
                >
                  <ImageIcon className="h-5 w-5 mr-2 text-indigo-400" /> Add Photo
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsPostOpen(false)} className="bg-indigo-500 hover:bg-indigo-600 rounded-xl w-full h-12 font-bold text-lg">Post to Campus Pulse</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
