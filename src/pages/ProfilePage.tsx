import { User, Mail, BookOpen, Sparkles, MapPin, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="h-32 gradient-hero" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex items-end gap-4 mb-4">
            <div className="h-24 w-24 rounded-xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground border-4 border-card shadow-lg">
              AP
            </div>
            <div className="pb-1 flex-1">
              <h1 className="text-xl font-bold">Aditya Patel</h1>
              <p className="text-sm text-muted-foreground">B.Tech Computer Science · 3rd Year</p>
            </div>
            <Button variant="outline" size="sm"><Edit3 className="h-3.5 w-3.5 mr-1" /> Edit</Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> aditya@iitdelhi.ac.in</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> IIT Delhi</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> Joined Mar 2026</span>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Python", "Machine Learning", "UI Design"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {["Hackathons", "Open Source", "Startups", "Music", "Photography"].map((s) => (
                  <Badge key={s} variant="outline">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold mb-4">Activity</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">8</p>
            <p className="text-xs text-muted-foreground">Events</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">142</p>
            <p className="text-xs text-muted-foreground">Connections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
