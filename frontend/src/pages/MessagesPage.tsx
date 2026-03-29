import { Send, Hash, Users as UsersIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const conversations = [
  { id: 1, type: "dm", name: "Priya Sharma", initials: "PS", lastMsg: "See you at the hackathon!", time: "2m", unread: 2 },
  { id: 2, type: "dm", name: "Arjun Mehta", initials: "AM", lastMsg: "Thanks for the notes!", time: "1h", unread: 0 },
  { id: 3, type: "dm", name: "Nisha Patel", initials: "NP", lastMsg: "Are you joining the debate team?", time: "3h", unread: 1 },
];

const chatrooms = [
  { id: 101, type: "room", name: "Computer Science 2026", initials: "CS", lastMsg: "Has anyone finished the OS assignment?", time: "5m", members: 142, category: "Academic" },
  { id: 102, type: "room", name: "Robotics Club", initials: "RC", lastMsg: "Meeting tomorrow at 4 PM in Lab 2", time: "15m", members: 45, category: "Club" },
  { id: 103, type: "room", name: "Campus Events", initials: "CE", lastMsg: "Don't forget the cultural fest next week!", time: "2h", members: 890, category: "General" },
  { id: 104, type: "room", name: "Hackathon Prep", initials: "HP", lastMsg: "Looking for a backend dev!", time: "4h", members: 28, category: "Tech" },
];

const dmHistory = [
  { id: 1, sender: "them", text: "Hey! Are you coming to the hackathon this weekend?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Yes! Our team is building a campus app actually 😄", time: "10:32 AM" },
  { id: 3, sender: "them", text: "That's awesome! What stack are you using?", time: "10:33 AM" },
  { id: 4, sender: "me", text: "React + Supabase for the backend. Should be fun!", time: "10:35 AM" },
  { id: 5, sender: "them", text: "See you at the hackathon!", time: "10:36 AM" },
];

const roomHistory = [
  { id: 1, sender: "Rahul Singh", text: "Has anyone started the OS assignment? I'm stuck on the process scheduling part.", time: "9:15 AM", isSystem: false },
  { id: 2, sender: "Nisha Patel", text: "Yeah, check out the documentation on page 42. It explains the Round Robin implementation pretty well.", time: "9:20 AM", isSystem: false },
  { id: 3, sender: "me", text: "I've also got some notes from last year's workshop if that helps!", time: "9:22 AM", isSystem: false },
  { id: 4, sender: "System", text: "Arjun Mehta joined the room", time: "9:25 AM", isSystem: true },
  { id: 5, sender: "Arjun Mehta", text: "Hey guys! Thanks for adding me. I was looking for this group.", time: "9:26 AM", isSystem: false },
];

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState<"dm" | "rooms">("dm");
  const [selected, setSelected] = useState<any>(conversations[0]);

  const currentList = activeTab === "dm" ? conversations : chatrooms;
  const currentMessages = activeTab === "dm" ? dmHistory : roomHistory;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-white">Messages</h1>
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex h-[calc(100vh-220px)] transition-all duration-200">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/10 flex flex-col bg-white/5">
          <div className="p-6 border-b border-white/10 space-y-4">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => {
                  setActiveTab("dm");
                  setSelected(conversations[0]);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                  activeTab === "dm" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-gray-400 hover:text-white"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5" /> DMs
              </button>
              <button 
                onClick={() => {
                  setActiveTab("rooms");
                  setSelected(chatrooms[0]);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                  activeTab === "rooms" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-gray-400 hover:text-white"
                )}
              >
                <Hash className="h-3.5 w-3.5" /> Rooms
              </button>
            </div>
            <Input 
              placeholder={`Search ${activeTab === "dm" ? "messages" : "rooms"}...`} 
              className="h-11 bg-white/10 border-white/5 rounded-xl text-sm placeholder:text-gray-500" 
            />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {currentList.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-5 text-left transition-all duration-200 border-b border-white/5",
                  selected.id === c.id 
                    ? "bg-indigo-500/20 border-l-4 border-l-indigo-500 shadow-inner" 
                    : "hover:bg-white/5"
                )}
              >
                <Avatar className="h-12 w-12 shrink-0 rounded-xl border border-white/10 shadow-lg">
                  <AvatarFallback className={cn(
                    "text-white text-xs font-bold",
                    activeTab === "rooms" ? "bg-purple-500" : "bg-indigo-500"
                  )}>{c.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "font-bold text-sm truncate transition-colors",
                      selected.id === c.id ? "text-white" : "text-gray-200"
                    )}>{c.name}</span>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 truncate font-medium">{c.lastMsg}</p>
                    {activeTab === "rooms" && (
                      <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                        <UsersIcon className="h-2.5 w-2.5" /> {c.members}
                      </span>
                    )}
                  </div>
                </div>
                {activeTab === "dm" && c.unread > 0 && (
                  <span className="h-5 w-5 rounded-lg bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col bg-white/[0.02]">
          <div className="px-8 py-5 border-b border-white/10 flex items-center gap-4 bg-white/5 backdrop-blur-md">
            <Avatar className="h-10 w-10 rounded-xl border border-white/10 shadow-lg">
              <AvatarFallback className={cn(
                "text-white text-xs font-bold",
                activeTab === "rooms" ? "bg-purple-500" : "bg-indigo-500"
              )}>{selected.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white">{selected.name}</span>
                {activeTab === "rooms" && (
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] font-bold uppercase tracking-widest px-2 py-0">
                    {selected.category}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                {activeTab === "dm" ? "Online" : `${selected.members} Members Online`}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {currentMessages.map((m) => (
              <div key={m.id} className={cn("flex flex-col", m.sender === "me" ? "items-end" : "items-start")}>
                {activeTab === "rooms" && !m.isSystem && m.sender !== "me" && (
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-4">{m.sender}</span>
                )}
                {m.isSystem ? (
                  <div className="w-full flex justify-center my-4">
                    <span className="bg-white/5 border border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                      {m.text}
                    </span>
                  </div>
                ) : (
                  <div className={cn(
                    "max-w-[75%] rounded-2xl px-5 py-3.5 text-sm shadow-xl transition-all duration-200 hover:scale-[1.02]",
                    m.sender === "me" 
                      ? "bg-indigo-500 text-white rounded-tr-none shadow-indigo-500/10" 
                      : "bg-white/10 text-gray-100 rounded-tl-none border border-white/5"
                  )}>
                    <p className="leading-relaxed font-medium">{m.text}</p>
                    <p className={cn(
                      "text-[10px] mt-2 font-bold uppercase tracking-wider opacity-60",
                      m.sender === "me" ? "text-white" : "text-gray-400"
                    )}>{m.time}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-md flex gap-4">
            <Input 
              placeholder={`Send message to ${activeTab === "dm" ? selected.name : `#${selected.name}`}...`} 
              className="flex-1 h-12 bg-white/10 border-white/5 rounded-xl text-sm placeholder:text-gray-500 focus:ring-indigo-500" 
            />
            <Button size="icon" className="h-12 w-12 rounded-xl bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-110 active:scale-95">
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
