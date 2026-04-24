import React, { useState, useEffect } from 'react';
import { Users, FilePlus, Eye, TrendingUp, CheckCircle, ChevronRight, X } from 'lucide-react';

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
      const response = await fetch('http://localhost:5000/api/internships');
      if (response.ok) {
        const data = await response.json();
        setInternships(data);
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
      const payload = {
        ...formData,
        company: 'Internova', // Mock company for now
      };
      const response = await fetch('http://localhost:5000/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Company Overview</h1>
          <p className="text-gray-400">Manage your active postings and review top matched candidates.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex items-center py-2.5 px-4 bg-[#8B7CFF] hover:bg-white text-[#131B2B] rounded-lg font-bold text-sm transition-colors shadow-lg"
        >
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
            {internships.length === 0 ? (
              <p className="text-gray-400 text-sm">No active postings yet.</p>
            ) : (
              internships.map((post) => (
                <div key={post._id} className="bg-[#131B2B] p-5 rounded-xl border border-white/5 hover:border-[#8B7CFF]/30 transition-colors flex flex-col sm:flex-row justify-between gap-4 cursor-pointer group">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-lg">{post.title}</h3>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${post.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{post.applicantsCount || 0} Total Applicants • {post.type} • {post.location}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[#8B7CFF] font-bold text-lg">{post.matchesCount || 0}</div>
                      <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Top Matches</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors hidden sm:block" />
                  </div>
                </div>
              ))
            )}
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

      {/* Create Posting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#131B2B] rounded-2xl border border-white/10 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Create New Posting</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreatePosting} className="p-6 space-y-4">
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
              <div className="pt-4 flex justify-end gap-3">
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
