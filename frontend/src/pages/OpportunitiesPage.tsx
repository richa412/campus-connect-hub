import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { opportunities } from "@/data/campusData";
import { Briefcase, Clock, MapPin, Tag } from "lucide-react";

const OpportunitiesPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-white">Opportunities</h1>
        <Button size="lg" className="rounded-xl shadow-indigo-500/25">Post Opportunity</Button>
      </div>

      {opportunities.length === 0 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-10 shadow-xl text-center">
          <Briefcase className="mx-auto h-10 w-10 text-indigo-300" />
          <h2 className="mt-4 text-2xl font-bold text-white">No opportunities posted yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            Internships, research roles, open-source work, and campus jobs will show up here when they are published.
          </p>
        </div>
      )}

      <div className="grid gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8 transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 hover:border-white/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest">
                    {opp.type}
                  </Badge>
                  <span className="text-xs font-bold text-gray-500 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" /> Deadline: {opp.deadline}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">{opp.title}</h3>
                  <p className="text-lg font-medium text-gray-400 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-indigo-400/70" /> {opp.org} - <MapPin className="h-4 w-4 text-indigo-400/70" /> {opp.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {opp.skills.map((skill) => (
                    <span key={skill} className="text-xs bg-white/5 text-gray-300 px-3 py-1.5 rounded-lg font-bold border border-white/5 flex items-center gap-2">
                      <Tag className="h-3 w-3 text-indigo-400" /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <Button size="lg" className="w-full md:w-auto px-10 rounded-xl font-bold shadow-indigo-500/20">Apply Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesPage;
