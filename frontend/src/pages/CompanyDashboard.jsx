import React, { useState, useEffect } from 'react';
import { Users, FilePlus, Eye, TrendingUp, CheckCircle, ChevronRight, X, MapPin, Clock, Briefcase, BarChart3, ArrowUpRight, Calendar } from 'lucide-react';

// Static sample postings that always display
const SAMPLE_POSTINGS = [
  { _id: 's1', title: 'Frontend Developer Intern', location: 'Dhaka, Bangladesh', type: 'Remote', isActive: true, applicantsCount: 42, matchesCount: 8, deadline: '2026-05-15', description: 'Build modern UI components with React and Tailwind CSS.' },
  { _id: 's2', title: 'Backend Engineer Intern', location: 'Chittagong, Bangladesh', type: 'On-site', isActive: true, applicantsCount: 35, matchesCount: 12, deadline: '2026-05-20', description: 'Design and implement RESTful APIs with Node.js and MongoDB.' },
  { _id: 's3', title: 'UI/UX Design Intern', location: 'Remote', type: 'Remote', isActive: true, applicantsCount: 28, matchesCount: 6, deadline: '2026-06-01', description: 'Create wireframes, prototypes, and high-fidelity designs.' },
  { _id: 's4', title: 'Data Analytics Intern', location: 'Dhaka, Bangladesh', type: 'Hybrid', isActive: false, applicantsCount: 23, matchesCount: 4, deadline: '2026-04-30', description: 'Analyze user engagement metrics and build dashboards.' },
];

const SAMPLE_CANDIDATES = [
  { name: 'Sarah Ahmed', role: 'Frontend Intern', score: '98%', skills: ['React', 'Tailwind'], university: 'BUET', avatar: 'SA' },
  { name: 'Rahim Khan', role: 'Backend Intern', score: '95%', skills: ['Node.js', 'MongoDB'], university: 'DU', avatar: 'RK' },
  { name: 'Anika Rahman', role: 'UI/UX Intern', score: '92%', skills: ['Figma', 'Prototyping'], university: 'NSU', avatar: 'AR' },
  { name: 'Tanvir Hossain', role: 'Full Stack Intern', score: '89%', skills: ['React', 'Express'], university: 'BRAC', avatar: 'TH' },
];

const RECENT_ACTIVITY = [
  { text: 'Sarah Ahmed applied for Frontend Developer Intern', time: '2 hours ago', type: 'application' },
  { text: 'Your posting "Backend Engineer" received 5 new views', time: '4 hours ago', type: 'view' },
  { text: 'Rahim Khan was shortlisted for Backend Engineer Intern', time: '1 day ago', type: 'shortlist' },
  { text: 'New match found: Anika Rahman (92% match)', time: '1 day ago', type: 'match' },
];

const CompanyDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'On-site',
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/internships', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      if (response.ok) {
        const result = await response.json();
        setInternships(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreatePosting = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', location: '', type: 'On-site' });
        fetchInternships();
      }
    } catch (error) {
      console.error('Error creating internship:', error);
    }
  };

  // Merge API data with sample data for display
  const displayPostings = internships.length > 0 ? internships : SAMPLE_POSTINGS;
  const activeCount = displayPostings.filter(p => p.isActive !== false).length;
  const totalApplicants = displayPostings.reduce((sum, p) => sum + (p.applicantsCount || 0), 0);
  const totalMatches = displayPostings.reduce((sum, p) => sum + (p.matchesCount || 0), 0);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header section */}
      <div>
        <p className="text-gray-400 tracking-widest text-[10px] font-bold uppercase mb-3">Company Dashboard</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
              Company <span className="text-[#8B7CFF]">Overview</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Manage your active internship postings, review top-matched candidates, and track recruitment performance across your pipeline.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center py-3 px-5 bg-[#8B7CFF] hover:bg-white text-[#131B2B] rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#8B7CFF]/20 gap-2 w-full sm:w-auto justify-center"
          >
            <FilePlus className="w-4 h-4" />
            Create New Posting
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#131B2B] p-4 sm:p-6 rounded-2xl border border-white/5 shadow-xl border-l-4 border-l-[#8B7CFF]">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-gray-400 font-semibold tracking-wider text-[10px] sm:text-xs uppercase">Active Postings</p>
            <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-[#8B7CFF]" />
          </div>
          <div className="text-2xl sm:text-4xl font-bold text-white">{activeCount}</div>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Currently recruiting</p>
        </div>
        <div className="bg-[#131B2B] p-4 sm:p-6 rounded-2xl border border-white/5 shadow-xl border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-gray-400 font-semibold tracking-wider text-[10px] sm:text-xs uppercase">Total Applicants</p>
            <Users className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-4xl font-bold text-white">{totalApplicants}</span>
            <span className="text-[10px] sm:text-xs text-emerald-400 flex items-center font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +12
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Across all postings</p>
        </div>
        <div className="bg-[#131B2B] p-4 sm:p-6 rounded-2xl border border-white/5 shadow-xl border-l-4 border-l-pink-500">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-gray-400 font-semibold tracking-wider text-[10px] sm:text-xs uppercase">High Matches (&gt;90%)</p>
            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-pink-500" />
          </div>
          <div className="text-2xl sm:text-4xl font-bold text-[#8B7CFF]">{totalMatches}</div>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Premium candidates</p>
        </div>
        <div className="bg-[#131B2B] p-4 sm:p-6 rounded-2xl border border-white/5 shadow-xl border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-gray-400 font-semibold tracking-wider text-[10px] sm:text-xs uppercase">Profile Views</p>
            <Eye className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-4xl font-bold text-white">892</div>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column — Active Postings */}
        <div className="xl:col-span-2 space-y-8">

          {/* Active Postings */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Your Active Postings</h2>
              <button className="text-sm text-[#8B7CFF] font-semibold hover:text-white transition-colors flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {displayPostings.map((post) => (
                <div key={post._id} className="bg-[#131B2B] p-4 sm:p-6 rounded-2xl border border-white/5 hover:border-[#8B7CFF]/30 transition-all duration-300 cursor-pointer group shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-[#8B7CFF] transition-colors">{post.title}</h3>
                        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shrink-0 ${post.isActive !== false ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                          {post.isActive !== false ? 'Active' : 'Closed'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {post.location}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {post.type}</span>
                        {post.deadline && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Due {new Date(post.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg sm:text-xl">{post.applicantsCount || 0}</div>
                        <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Applicants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#8B7CFF] font-bold text-lg sm:text-xl">{post.matchesCount || 0}</div>
                        <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Matches</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#8B7CFF] transition-colors hidden sm:block" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Matched Candidates */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Top Candidate Matches</h2>
              <button className="text-sm text-[#8B7CFF] font-semibold hover:text-white transition-colors flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              <div className="divide-y divide-white/5">
                {SAMPLE_CANDIDATES.map((candidate, idx) => (
                  <div key={idx} className="p-4 sm:p-5 hover:bg-[#1A2235] transition-colors flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer group gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#8B7CFF] to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#8B7CFF]/20 shrink-0">
                        {candidate.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-[#8B7CFF] transition-colors text-sm sm:text-base">{candidate.name}</h3>
                        <p className="text-gray-500 text-xs">{candidate.role} • {candidate.university}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4 ml-13 sm:ml-0">
                      <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-bold">
                        {candidate.score} Match
                      </div>
                      <div className="hidden sm:flex gap-1.5">
                         {candidate.skills.map(s => (
                           <span key={s} className="bg-white/5 border border-white/5 text-gray-400 px-2.5 py-1 rounded-lg text-[10px] font-medium">
                             {s}
                           </span>
                         ))}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#8B7CFF] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/5 bg-[#0B0F19]/50 text-center">
                 <button className="text-xs text-gray-400 hover:text-white font-bold transition-colors flex items-center justify-center w-full gap-2 uppercase tracking-wider">
                   <Eye className="w-4 h-4" /> View Full Candidate Pipeline
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Sidebar */}
        <div className="space-y-6">

          {/* Recruitment Pipeline Summary */}
          <div className="bg-[#131B2B] rounded-2xl border border-white/5 p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[#8B7CFF]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pipeline Summary</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Applications Received', count: 128, color: 'bg-[#8B7CFF]', width: '100%' },
                { label: 'Under Review', count: 64, color: 'bg-amber-500', width: '50%' },
                { label: 'Shortlisted', count: 30, color: 'bg-cyan-500', width: '23%' },
                { label: 'Interview Scheduled', count: 12, color: 'bg-emerald-500', width: '9%' },
              ].map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400 font-medium">{stage.label}</span>
                    <span className="text-xs font-bold text-white">{stage.count}</span>
                  </div>
                  <div className="w-full bg-[#06090F] rounded-full h-1.5">
                    <div className={`${stage.color} h-1.5 rounded-full transition-all duration-700`} style={{ width: stage.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-[#131B2B] rounded-2xl border border-white/5 p-5 sm:p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((activity, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    activity.type === 'application' ? 'bg-[#8B7CFF]' :
                    activity.type === 'view' ? 'bg-amber-400' :
                    activity.type === 'shortlist' ? 'bg-emerald-400' : 'bg-pink-400'
                  }`}></div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{activity.text}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider font-bold">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade Promo */}
          <div className="relative p-5 sm:p-6 rounded-2xl border border-white/5 shadow-xl overflow-hidden bg-gradient-to-br from-[#1A2342] to-[#131B2B]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDEiLz4KPHBhdGggZD0iTTAgMGg4djhIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">Boost Your<br/>Visibility</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Premium employers get 3× more qualified applicants and priority placement in search results.
              </p>
              <button className="w-full py-3.5 bg-[#8B7CFF] hover:bg-[#7a6ce0] text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-colors shadow-lg shadow-[#8B7CFF]/20">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Posting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#131B2B] rounded-2xl border border-white/10 shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/5">
              <h2 className="text-lg sm:text-xl font-bold text-white">Create New Posting</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreatePosting} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Internship Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleInputChange} required
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B7CFF] transition-colors"
                  placeholder="e.g. Frontend Developer Intern"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Location</label>
                <input 
                  type="text" name="location" value={formData.location} onChange={handleInputChange} required
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B7CFF] transition-colors"
                  placeholder="e.g. Dhaka, Bangladesh"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Work Type</label>
                <select 
                  name="type" value={formData.type} onChange={handleInputChange}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B7CFF] transition-colors appearance-none"
                >
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Description</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleInputChange} required rows="3"
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B7CFF] transition-colors resize-none"
                  placeholder="Briefly describe the role..."
                ></textarea>
              </div>
              <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-[#8B7CFF] hover:bg-white text-[#131B2B] rounded-xl font-bold transition-colors">
                  Post Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
