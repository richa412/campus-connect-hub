import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Priya Sharma", initials: "PS", lastMsg: "See you at the hackathon!", time: "2m", unread: 2 },
  { id: 2, name: "Arjun Mehta", initials: "AM", lastMsg: "Thanks for the notes!", time: "1h", unread: 0 },
  { id: 3, name: "Nisha Patel", initials: "NP", lastMsg: "Are you joining the debate team?", time: "3h", unread: 1 },
  { id: 4, name: "Robotics Club", initials: "RC", lastMsg: "Meeting tomorrow at 4 PM", time: "5h", unread: 0 },
];

const messages = [
  { id: 1, sender: "them", text: "Hey! Are you coming to the hackathon this weekend?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Yes! Our team is building a campus app actually 😄", time: "10:32 AM" },
  { id: 3, sender: "them", text: "That's awesome! What stack are you using?", time: "10:33 AM" },
  { id: 4, sender: "me", text: "React + Supabase for the backend. Should be fun!", time: "10:35 AM" },
  { id: 5, sender: "them", text: "See you at the hackathon!", time: "10:36 AM" },
];

const MessagesPage = () => {
  const [selected, setSelected] = useState(conversations[0]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden flex" style={{ height: "calc(100vh - 180px)" }}>
        {/* Sidebar */}
        <div className="w-72 border-r flex flex-col">
          <div className="p-3 border-b">
            <Input placeholder="Search conversations..." className="bg-muted border-0 h-9" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={cn("w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                  selected.id === c.id && "bg-accent")}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">{c.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm truncate">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <span className="h-5 w-5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-3 border-b flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">{selected.initials}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">{selected.name}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.sender === "me" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm",
                  m.sender === "me" ? "gradient-primary text-primary-foreground rounded-br-md" : "bg-muted rounded-bl-md"
                )}>
                  <p>{m.text}</p>
                  <p className={cn("text-[10px] mt-1", m.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground")}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button variant="hero" size="icon"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
