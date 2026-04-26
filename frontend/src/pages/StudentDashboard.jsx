import React from 'react';
import { Activity, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Header section */}
      <div>
        <p className="text-gray-400 tracking-widest text-[10px] font-bold uppercase mb-3">Student Dashboard</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          Welcome back, <span className="text-[#8B7CFF]">Maria!</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Your career portfolio is evolving. We've curated new matches based on your recent activity and identified key pathways for growth.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="xl:col-span-2 space-y-8 sm:space-y-10">
          
          {/* Application Activity Card */}
          <div className="bg-[#131B2B] p-5 sm:p-8 rounded-2xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Application Activity</h2>
                <p className="text-gray-400 text-sm">Tracking your current visionary trajectory.</p>
              </div>
              <Activity className="w-6 h-6 text-[#8B7CFF]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#06090F] p-5 sm:p-6 rounded-xl border border-white/5 border-l-4 border-l-[#8B7CFF]">
                <div className="text-3xl sm:text-4xl font-bold text-[#8B7CFF] mb-2">12</div>
                <div className="text-xs font-bold text-gray-500 tracking-widest uppercase">Applied</div>
              </div>
              <div className="bg-[#06090F] p-5 sm:p-6 rounded-xl border border-white/5 border-l-4 border-l-white">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">04</div>
                <div className="text-xs font-bold text-gray-500 tracking-widest uppercase">In Progress</div>
              </div>
              <div className="bg-[#06090F] p-5 sm:p-6 rounded-xl border border-white/5 border-l-4 border-l-pink-500">
                <div className="text-3xl sm:text-4xl font-bold text-pink-500 mb-2">02</div>
                <div className="text-xs font-bold text-gray-500 tracking-widest uppercase">Interviewing</div>
              </div>
            </div>
          </div>

          {/* Top Match Opportunities */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Top Match Opportunities</h2>
              <button className="text-sm font-semibold text-[#8B7CFF] hover:text-white transition-colors">
                View All Matches
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Card 1 */}
              <div className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden group cursor-pointer hover:border-[#8B7CFF]/50 transition-colors flex flex-col">
                {/* Image Placeholder / Gradient */}
                <div className="h-32 sm:h-40 w-full bg-gradient-to-br from-slate-800 to-[#1A2342] relative overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-[#8B7CFF] text-[#131B2B] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                    92% MATCH
                  </div>
                </div>
                {/* Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-end bg-[#131B2B]">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Senior UX Designer</h3>
                  <p className="text-sm text-gray-400 mb-4 sm:mb-5">Lumina Digital Arts • Remote</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-[#1A2235] border border-white/5 text-[10px] font-bold tracking-wider text-gray-300 px-3 py-1.5 rounded uppercase">Figma</span>
                    <span className="bg-[#1A2235] border border-white/5 text-[10px] font-bold tracking-wider text-gray-300 px-3 py-1.5 rounded uppercase">Prototyping</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden group cursor-pointer hover:border-[#8B7CFF]/50 transition-colors flex flex-col">
                {/* Image Placeholder / Gradient */}
                <div className="h-32 sm:h-40 w-full bg-gradient-to-br from-gray-800 to-[#0B0F19] relative overflow-hidden flex-shrink-0">
                   <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                  <div className="absolute top-4 right-4 bg-gray-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                    85% MATCH
                  </div>
                </div>
                {/* Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-end bg-[#131B2B]">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Product Architect</h3>
                  <p className="text-sm text-gray-400 mb-4 sm:mb-5">Vertex Solutions • Hybrid</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-[#1A2235] border border-white/5 text-[10px] font-bold tracking-wider text-gray-300 px-3 py-1.5 rounded uppercase">Strategy</span>
                    <span className="bg-[#1A2235] border border-white/5 text-[10px] font-bold tracking-wider text-gray-300 px-3 py-1.5 rounded uppercase">React</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Content) */}
        <div className="space-y-6 sm:space-y-8 xl:col-span-1">
          
          {/* Quick Skill Gap Card */}
          <div className="bg-[#131B2B] p-5 sm:p-8 rounded-2xl border border-white/5 shadow-xl border-t-2 border-t-pink-500">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-pink-500" />
              <h3 className="text-sm font-bold text-pink-500 tracking-widest uppercase">Quick Skill Gap</h3>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Our curator engine identified a missing proficiency that is appearing in <span className="font-bold text-white">78% of your ideal roles.</span>
            </p>

            <div className="bg-[#06090F] p-4 sm:p-5 rounded-xl border border-white/5 mb-6 flex justify-between items-center">
              <div>
                <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Missing Skill</div>
                <div className="text-lg sm:text-xl font-bold text-white">Next.js</div>
              </div>
              <div className="flex">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button className="w-full py-3 sm:py-4 bg-[#1A2235] hover:bg-[#232D45] border border-white/5 rounded-xl text-xs font-bold tracking-widest text-white uppercase transition-colors">
              Explore Pathways
            </button>
          </div>

          {/* Boost Your Matches Promo Card */}
          <div className="relative p-5 sm:p-8 rounded-2xl border border-white/5 shadow-xl overflow-hidden bg-gradient-to-br from-[#1A2342] to-[#131B2B]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDEiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-20"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-start justify-between gap-4 sm:gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">Boost Your<br/>Matches</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[250px]">
                  Unlock premium insights and get prioritized by hiring curators.
                </p>
              </div>
              <button className="w-full sm:w-auto xl:w-full py-3 sm:py-4 px-6 bg-[#8B7CFF] hover:bg-[#7a6ce0] text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors shadow-lg shadow-[#8B7CFF]/20 whitespace-nowrap">
                Upgrade to Pro
              </button>
            </div>
          </div>

          {/* Career Trajectory Widget */}
          <div className="bg-[#131B2B] p-5 sm:p-8 rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6 sm:mb-8">Career Trajectory</h3>
            <div className="relative pl-8 border-l border-white/10 ml-4 space-y-8 sm:space-y-10">
              
              <div className="relative">
                <div className="absolute w-3 h-3 bg-[#8B7CFF] rounded-full -left-[2.35rem] top-1 shadow-[0_0_10px_rgba(139,124,255,0.5)]"></div>
                <div className="absolute w-5 h-5 border border-[#8B7CFF]/50 rounded-full -left-[2.6rem] -top-0.5"></div>
                <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Current Status</p>
                <p className="text-sm font-bold text-white">Curating New Opportunities</p>
              </div>

              <div className="relative">
                <div className="absolute w-1.5 h-1.5 bg-gray-600 rounded-full -left-[2.15rem] top-1.5"></div>
                <p className="text-[10px] font-bold text-gray-600 tracking-widest uppercase mb-1">Next Milestone</p>
                <p className="text-sm font-medium text-gray-500">First Interview Selection</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
