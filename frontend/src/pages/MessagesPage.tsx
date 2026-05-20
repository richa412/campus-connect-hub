import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatrooms, conversations, type Chatroom, type Conversation, dmHistory, roomHistory } from "@/data/campusData";
import { cn } from "@/lib/utils";
import { Hash, MessageSquare, Send, Users as UsersIcon } from "lucide-react";
import { useState } from "react";

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState<"dm" | "rooms">("dm");
  const [selected, setSelected] = useState<Conversation | Chatroom | null>(null);

  const currentList = activeTab === "dm" ? conversations : chatrooms;
  const currentMessages = activeTab === "dm" ? dmHistory : roomHistory;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-white">Messages</h1>
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex h-[calc(100vh-220px)] transition-all duration-200">
        <div className="w-80 border-r border-white/10 flex flex-col bg-white/5">
          <div className="p-6 border-b border-white/10 space-y-4">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => {
                  setActiveTab("dm");
                  setSelected(conversations[0] ?? null);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                  activeTab === "dm" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-gray-400 hover:text-white",
                )}
              >
                <MessageSquare className="h-3.5 w-3.5" /> DMs
              </button>
              <button
                onClick={() => {
                  setActiveTab("rooms");
                  setSelected(chatrooms[0] ?? null);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all",
                  activeTab === "rooms" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-gray-400 hover:text-white",
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
            {currentList.length === 0 && (
              <div className="px-6 py-10 text-center">
                <p className="font-bold text-white">
                  {activeTab === "dm" ? "No direct messages yet" : "No rooms yet"}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {activeTab === "dm"
                    ? "Student conversations will appear here when chats start."
                    : "Topic and club rooms will appear here when they are created."}
                </p>
              </div>
            )}
            {currentList.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelected(conversation)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-5 text-left transition-all duration-200 border-b border-white/5",
                  selected?.id === conversation.id
                    ? "bg-indigo-500/20 border-l-4 border-l-indigo-500 shadow-inner"
                    : "hover:bg-white/5",
                )}
              >
                <Avatar className="h-12 w-12 shrink-0 rounded-xl border border-white/10 shadow-lg">
                  <AvatarFallback className={cn(
                    "text-white text-xs font-bold",
                    activeTab === "rooms" ? "bg-purple-500" : "bg-indigo-500",
                  )}>{conversation.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "font-bold text-sm truncate transition-colors",
                      selected?.id === conversation.id ? "text-white" : "text-gray-200",
                    )}>{conversation.name}</span>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{conversation.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 truncate font-medium">{conversation.lastMsg}</p>
                    {activeTab === "rooms" && "members" in conversation && (
                      <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                        <UsersIcon className="h-2.5 w-2.5" /> {conversation.members}
                      </span>
                    )}
                  </div>
                </div>
                {activeTab === "dm" && "unread" in conversation && conversation.unread > 0 && (
                  <span className="h-5 w-5 rounded-lg bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">{conversation.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white/[0.02]">
          <div className="px-8 py-5 border-b border-white/10 flex items-center gap-4 bg-white/5 backdrop-blur-md">
            {selected ? (
              <Avatar className="h-10 w-10 rounded-xl border border-white/10 shadow-lg">
                <AvatarFallback className={cn(
                  "text-white text-xs font-bold",
                  activeTab === "rooms" ? "bg-purple-500" : "bg-indigo-500",
                )}>{selected.initials}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-10 w-10 rounded-xl border border-white/10 bg-indigo-500/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-indigo-300" />
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white">
                  {selected ? selected.name : activeTab === "dm" ? "Direct messages" : "Campus rooms"}
                </span>
                {selected && activeTab === "rooms" && "category" in selected && (
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] font-bold uppercase tracking-widest px-2 py-0">
                    {selected.category}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                {selected ? activeTab === "dm" ? "Online" : `${"members" in selected ? selected.members : 0} Members Online` : "Ready when conversations begin"}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {!selected && (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <MessageSquare className="mx-auto h-10 w-10 text-indigo-300" />
                  <p className="mt-4 font-bold text-white">Select a conversation</p>
                  <p className="mt-2 max-w-sm text-sm text-gray-400">
                    Messages, room updates, and chat history will appear here after real conversations are available.
                  </p>
                </div>
              </div>
            )}
            {currentMessages.map((message) => (
              <div key={message.id} className={cn("flex flex-col", message.sender === "me" ? "items-end" : "items-start")}>
                {activeTab === "rooms" && !message.isSystem && message.sender !== "me" && (
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-4">{message.sender}</span>
                )}
                {message.isSystem ? (
                  <div className="w-full flex justify-center my-4">
                    <span className="bg-white/5 border border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                      {message.text}
                    </span>
                  </div>
                ) : (
                  <div className={cn(
                    "max-w-[75%] rounded-2xl px-5 py-3.5 text-sm shadow-xl transition-all duration-200 hover:scale-[1.02]",
                    message.sender === "me"
                      ? "bg-indigo-500 text-white rounded-tr-none shadow-indigo-500/10"
                      : "bg-white/10 text-gray-100 rounded-tl-none border border-white/5",
                  )}>
                    <p className="leading-relaxed font-medium">{message.text}</p>
                    <p className={cn(
                      "text-[10px] mt-2 font-bold uppercase tracking-wider opacity-60",
                      message.sender === "me" ? "text-white" : "text-gray-400",
                    )}>{message.time}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-md flex gap-4">
            <Input
              placeholder={selected ? `Send message to ${activeTab === "dm" ? selected.name : `#${selected.name}`}...` : "Start typing when a conversation is selected..."}
              className="flex-1 h-12 bg-white/10 border-white/5 rounded-xl text-sm placeholder:text-gray-500 focus:ring-indigo-500"
              disabled={!selected}
            />
            <Button size="icon" disabled={!selected} className="h-12 w-12 rounded-xl bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-110 active:scale-95">
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
