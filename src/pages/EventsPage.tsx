import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  { id: 1, title: "Spring Hackathon 2026", date: "Apr 5–6", time: "9:00 AM", location: "Engineering Block A", attendees: 234, category: "Tech", rsvpd: false },
  { id: 2, title: "Career Fair — Tech Edition", date: "Apr 12", time: "10:00 AM", location: "Main Auditorium", attendees: 512, category: "Career", rsvpd: true },
  { id: 3, title: "Inter-College Debate Finals", date: "Apr 15", time: "2:00 PM", location: "Seminar Hall 3", attendees: 89, category: "Academic", rsvpd: false },
  { id: 4, title: "Music Night — Acoustic Jam", date: "Apr 18", time: "7:00 PM", location: "Open Air Theatre", attendees: 345, category: "Cultural", rsvpd: false },
  { id: 5, title: "Startup Pitch Day", date: "Apr 22", time: "11:00 AM", location: "Incubation Center", attendees: 156, category: "Entrepreneurship", rsvpd: true },
];

const categoryColors: Record<string, string> = {
  Tech: "bg-primary/10 text-primary",
  Career: "bg-pulse-positive/10 text-pulse-positive",
  Academic: "bg-purple-100 text-purple-700",
  Cultural: "bg-pink-100 text-pink-700",
  Entrepreneurship: "bg-pulse-neutral/10 text-pulse-neutral",
};

const EventsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button variant="hero" size="sm">Create Event</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="gradient-primary h-2" />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category] || "bg-muted text-muted-foreground"}`}>
                  {event.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {event.attendees}
                </div>
              </div>
              <h3 className="font-semibold text-base mb-3">{event.title}</h3>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />{event.date}</div>
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{event.time}</div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{event.location}</div>
              </div>
              <Button variant={event.rsvpd ? "secondary" : "hero"} size="sm" className="w-full mt-4">
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
