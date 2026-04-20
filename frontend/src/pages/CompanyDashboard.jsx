import React from 'react';
import { Users, FilePlus, Eye, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react';

const CompanyDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Company Overview</h1>
          <p className="text-gray-400">Manage your active postings and review top matched candidates.</p>
        </div>
        <button className="hidden sm:flex items-center py-2.5 px-4 bg-[#8B7CFF] hover:bg-white text-[#131B2B] rounded-lg font-bold text-sm transition-colors shadow-lg">
          <FilePlus className="w-4 h-4 mr-2" />
          Create New Posting
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#131B2B] p-5 rounded-2xl border border-white/5 shadow-xl">
          <p className="text-gray-400 font-semibold tracking-wider text-xs uppercase mb-2">Active Postings</p>
          <div className="text-3xl font-bold text-white">4</div>
        </div>
        <div className="bg-[#131B2B] p-5 rounded-2xl border border-white/5 shadow-xl">
          <p className="text-gray-400 font-semibold tracking-wider text-xs uppercase mb-2">Total Applicants</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">128</span>
            <span className="text-xs text-emerald-400 flex items-center font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +12
            </span>
          </div>
        </div>
        <div className="bg-[#131B2B] p-5 rounded-2xl border border-white/5 shadow-xl">
          <p className="text-gray-400 font-semibold tracking-wider text-xs uppercase mb-2">High Matches (&gt;90%)</p>
          <div className="text-3xl font-bold text-[#8B7CFF]">24</div>
        </div>
        <div className="bg-[#131B2B] p-5 rounded-2xl border border-white/5 shadow-xl">
          <p className="text-gray-400 font-semibold tracking-wider text-xs uppercase mb-2">Profile Views</p>
          <div className="text-3xl font-bold text-white">892</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Active Postings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Your Active Postings</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Frontend Developer Intern', applicants: 45, matches: 12, status: 'Active' },
              { title: 'Backend Node.js Intern', applicants: 32, matches: 8, status: 'Active' },
              { title: 'UI/UX Designer Intern', applicants: 51, matches: 4, status: 'Reviewing' }
            ].map((post, idx) => (
              <div key={idx} className="bg-[#131B2B] p-5 rounded-xl border border-white/5 hover:border-[#8B7CFF]/30 transition-colors flex flex-col sm:flex-row justify-between gap-4 cursor-pointer group">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-lg">{post.title}</h3>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${post.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{post.applicants} Total Applicants</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[#8B7CFF] font-bold text-lg">{post.matches}</div>
                    <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Top Matches</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Matched Candidates */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Top Candidate Matches</h2>
            <button className="text-sm text-[#8B7CFF] font-semibold hover:text-white transition-colors">View All</button>
          </div>

          <div className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
            <div className="divide-y divide-white/5">
              {[
                { name: 'Sarah Ahmed', role: 'Frontend Intern', score: '98%', skills: ['React', 'Tailwind'] },
                { name: 'Rahim Khan', role: 'Backend Intern', score: '95%', skills: ['Node.js', 'MongoDB'] },
                { name: 'Anika Rahman', role: 'UI/UX Intern', score: '92%', skills: ['Figma', 'Prototyping'] },
              ].map((candidate, idx) => (
                <div key={idx} className="p-5 hover:bg-[#1A2235] transition-colors flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B7CFF] to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{candidate.name}</h3>
                      <p className="text-gray-400 text-xs">{candidate.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full text-xs font-bold">
                      {candidate.score} Match
                    </div>
                    <div className="flex gap-1 hidden sm:flex">
                       {candidate.skills.map(s => (
                         <span key={s} className="bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded text-[10px] font-medium">
                           {s}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/5 bg-[#0B0F19]/50 text-center">
               <button className="text-xs text-gray-400 hover:text-white font-medium transition-colors flex items-center justify-center w-full">
                 <Eye className="w-4 h-4 mr-1" /> View Candidate Pipeline
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDashboard;
