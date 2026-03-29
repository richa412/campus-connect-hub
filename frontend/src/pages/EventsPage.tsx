import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const events = [
  { id: 1, title: "Spring Hackathon 2026", date: "Apr 5–6", time: "9:00 AM", location: "Engineering Block A", attendees: 234, category: "Tech", rsvpd: false },
  { id: 2, title: "Career Fair — Tech Edition", date: "Apr 12", time: "10:00 AM", location: "Main Auditorium", attendees: 512, category: "Career", rsvpd: true },
  { id: 3, title: "Inter-College Debate Finals", date: "Apr 15", time: "2:00 PM", location: "Seminar Hall 3", attendees: 89, category: "Academic", rsvpd: false },
  { id: 4, title: "Music Night — Acoustic Jam", date: "Apr 18", time: "7:00 PM", location: "Open Air Theatre", attendees: 345, category: "Cultural", rsvpd: false },
  { id: 5, title: "Startup Pitch Day", date: "Apr 22", time: "11:00 AM", location: "Incubation Center", attendees: 156, category: "Entrepreneurship", rsvpd: true },
];

const categoryColors: Record<string, string> = {
  Tech: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Career: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Academic: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Cultural: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  Entrepreneurship: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const EventsPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-white">Events Hub</h1>
        <Button size="lg" className="rounded-xl shadow-indigo-500/25">Create Event</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-white/20">
            <div className="h-24 bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-transparent relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.4),transparent)]" />
            </div>
            <div className="p-6 -mt-12 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border",
                  categoryColors[event.category] || "bg-white/10 text-gray-400 border-white/10"
                )}>
                  {event.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                  <Users className="h-3 w-3 text-indigo-400" /> {event.attendees}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-4 text-white group-hover:text-indigo-300 transition-colors">{event.title}</h3>
              <div className="space-y-3 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-indigo-400/70" />{event.date}</div>
                <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-indigo-400/70" />{event.time}</div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-indigo-400/70" />{event.location}</div>
              </div>
              <Button 
                variant={event.rsvpd ? "secondary" : "default"} 
                size="sm" 
                className={cn(
                  "w-full mt-6 rounded-xl font-bold",
                  event.rsvpd ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30" : ""
                )}
              >
                {event.rsvpd ? "RSVP'd ✓" : "RSVP"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
