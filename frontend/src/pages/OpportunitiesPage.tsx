import { Briefcase, MapPin, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const opportunities = [
  { id: 1, title: "Frontend Intern — EdTech Startup", org: "LearnStack", type: "Internship", location: "Remote", deadline: "Apr 10", skills: ["React", "TypeScript", "Tailwind"] },
  { id: 2, title: "Research Assistant — AI Lab", org: "CS Department", type: "Research", location: "On-campus", deadline: "Apr 8", skills: ["Python", "ML", "NLP"] },
  { id: 3, title: "Campus Ambassador — Notion", org: "Notion", type: "Part-time", location: "Hybrid", deadline: "Apr 15", skills: ["Marketing", "Events", "Social Media"] },
  { id: 4, title: "Open Source Contributor — Supabase", org: "Supabase", type: "Open Source", location: "Remote", deadline: "Ongoing", skills: ["PostgreSQL", "TypeScript", "Deno"] },
  { id: 5, title: "Teaching Assistant — DSA", org: "CS Department", type: "TA", location: "On-campus", deadline: "Apr 5", skills: ["C++", "Algorithms", "Teaching"] },
];

const OpportunitiesPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <Button variant="hero" size="sm">Post Opportunity</Button>
      </div>

      <div className="space-y-4">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-card rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{opp.title}</h3>
                <p className="text-sm text-muted-foreground">{opp.org}</p>
              </div>
              <Badge variant="secondary">{opp.type}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground my-3">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{opp.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{opp.deadline}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {opp.skills.map((s) => (
                <span key={s} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
            <Button size="sm">Apply Now</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesPage;
