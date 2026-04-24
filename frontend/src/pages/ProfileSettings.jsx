import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, Save, Plus, X, Lock, User, Mail, Briefcase, Code, BookOpen, Link as LinkIcon, CheckCircle2, Edit2, AlertTriangle } from 'lucide-react';

const ProfileSettings = ({ role }) => {
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // Form State
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  
  // Dynamic Lists State
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', link: '' });

  const [experience, setExperience] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Fetch Data on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // If no token (simulated login), use default placeholder data
          setPersonalInfo({ name: 'Maria Nusrat', email: 'name@internova.com' });
          setSkills(['React', 'Node.js']);
          setIsLoading(false);
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5000/api/auth/me', config);
        
        const user = data.data;
        setPersonalInfo({ name: user.name || '', email: user.email || '' });
        setProfilePic(user.profilePic || null);
        setExperience(user.experience || '');
        setSkills(user.skills || []);
        setInterests(user.interests || []);
        setProjects(user.projects || []);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMsg('Failed to load profile data.');
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e, item, setItem, list, setList) => {
    e.preventDefault();
    if (item.trim() && !list.includes(item.trim())) {
      setList([...list, item.trim()]);
      setItem('');
    }
  };

  const handleRemoveItem = (itemToRemove, list, setList) => {
    setList(list.filter(i => i !== itemToRemove));
  };

  const handleAddOrUpdateProject = (e) => {
    e.preventDefault();
    if (newProject.title.trim() && newProject.link.trim()) {
      setProjects([...projects, newProject]);
      setNewProject({ title: '', link: '' });
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Simulated save for UI-only mode
        setTimeout(() => {
          setIsSaving(false);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        }, 1200);
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        name: personalInfo.name,
        email: personalInfo.email,
        profilePic,
        experience,
        skills,
        interests,
        projects
      };

      if (passwords.new && passwords.new === passwords.confirm) {
        payload.password = passwords.new;
      }

      await axios.put('http://localhost:5000/api/auth/profile', payload, config);
      
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setIsSaving(false);
      setErrorMsg(error.response?.data?.message || 'Failed to save profile.');
    }
  };



  if (isLoading) {
    return <div className="text-white text-center py-20">Loading profile data...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header & Save Button Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#131B2B] p-8 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8B7CFF] rounded-full blur-[120px] opacity-[0.05] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10">
          <p className="text-[#8B7CFF] tracking-widest text-xs font-bold uppercase mb-2">Account Management</p>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Your Profile</h1>
          <p className="text-gray-400 text-sm max-w-xl">
            This information is saved to the database and used by our AI matching engine.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-col items-end gap-3 min-w-[200px]">
          {saveSuccess && (
            <div className="flex items-center text-emerald-400 text-sm font-bold tracking-wide">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Saved to Database
            </div>
          )}
          {errorMsg && (
            <div className="flex items-center text-red-400 text-sm font-bold tracking-wide">
              <X className="w-5 h-5 mr-2" /> {errorMsg}
            </div>
          )}
          <button 
            onClick={handleSaveAll}
            disabled={isSaving}
            className="w-full sm:w-auto flex items-center justify-center py-3 px-8 bg-[#8B7CFF] hover:bg-[#7a6ce0] text-white rounded-xl font-bold text-sm transition-all shadow-lg disabled:opacity-70"
          >
            {isSaving ? 'Synchronizing...' : 'Save Portfolio'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Identity & Security (4 columns) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Avatar Card */}
          <div className="bg-[#131B2B] p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-[#1A2342] to-transparent opacity-50"></div>
            
            <div className="relative group cursor-pointer mb-6 mt-2" onClick={() => fileInputRef.current.click()}>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#0B0F19] ring-2 ring-[#8B7CFF]/30 bg-[#06090F] flex items-center justify-center relative shadow-xl group-hover:ring-[#8B7CFF] transition-all">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-gray-600" />
                )}
                <div className="absolute inset-0 bg-[#0B0F19]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            </div>
            
            <h3 className="text-xl font-bold text-white text-center mb-2">{personalInfo.name}</h3>
            <span className="bg-[#8B7CFF]/10 text-[#8B7CFF] border border-[#8B7CFF]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block text-center">
              {role} Account
            </span>
          </div>

          {/* Basic Info Form */}
          <div className="bg-[#131B2B] p-8 rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Identity</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                    className="w-full bg-[#06090F] border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Primary Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="email" 
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    className="w-full bg-[#06090F] border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Professional Graph (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Professional Narrative */}
          <div className="bg-[#131B2B] p-8 rounded-2xl border border-white/5 shadow-xl">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold text-white">Professional Narrative</h3>
               <Briefcase className="w-6 h-6 text-[#8B7CFF]" />
             </div>
             <p className="text-sm text-gray-400 mb-4">Craft a compelling summary of your journey, goals, and what you bring to the table.</p>
             <textarea 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={5}
                placeholder="Briefly describe your experience and career goals..."
                className="w-full bg-[#06090F] border border-white/5 rounded-2xl p-5 text-sm text-white focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all resize-none leading-relaxed"
             ></textarea>
          </div>

          {/* Competency Matrix (Skills & Interests) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Skills */}
            <div className="bg-[#131B2B] p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Verified Skills</h3>
                <Code className="w-6 h-6 text-[#8B7CFF]" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-8">
                  {skills.length === 0 && <span className="text-sm text-gray-600 italic">No skills added yet.</span>}
                  {skills.map(skill => (
                    <span key={skill} className="group flex items-center bg-[#1A2235] border border-white/10 hover:border-[#8B7CFF]/50 px-4 py-2 rounded-xl text-sm font-semibold text-gray-200 transition-all">
                      {skill}
                      <button onClick={() => handleRemoveItem(skill, skills, setSkills)} className="ml-2 text-gray-500 group-hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <form onSubmit={(e) => handleAddItem(e, newSkill, setNewSkill, skills, setSkills)} className="relative mt-auto">
                <input 
                  type="text" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. Next.js, Python..."
                  className="w-full bg-[#06090F] border border-white/5 rounded-xl pl-4 pr-14 py-3.5 text-sm text-white focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#131B2B] hover:bg-[#1A2235] w-10 flex items-center justify-center rounded-lg text-white border border-white/5 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Interests */}
            <div className="bg-[#131B2B] p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Career Interests</h3>
                <BookOpen className="w-6 h-6 text-[#8B7CFF]" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-8">
                  {interests.length === 0 && <span className="text-sm text-gray-600 italic">No interests added yet.</span>}
                  {interests.map(interest => (
                    <span key={interest} className="group flex items-center bg-[#1A2235] border border-white/10 hover:border-pink-500/50 px-4 py-2 rounded-xl text-sm font-semibold text-gray-200 transition-all">
                      {interest}
                      <button onClick={() => handleRemoveItem(interest, interests, setInterests)} className="ml-2 text-gray-500 group-hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <form onSubmit={(e) => handleAddItem(e, newInterest, setNewInterest, interests, setInterests)} className="relative mt-auto">
                <input 
                  type="text" 
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="e.g. Machine Learning..."
                  className="w-full bg-[#06090F] border border-white/5 rounded-xl pl-4 pr-14 py-3.5 text-sm text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                />
                <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#131B2B] hover:bg-[#1A2235] w-10 flex items-center justify-center rounded-lg text-white border border-white/5 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Project Portfolio */}
          <div className="bg-[#131B2B] p-8 rounded-2xl border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Project Portfolio</h3>
                <p className="text-sm text-gray-400">Showcase real-world applications of your skills. You can post them here.</p>
              </div>
              <LinkIcon className="w-6 h-6 text-[#8B7CFF]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {projects.length === 0 && <span className="text-sm text-gray-600 italic col-span-2">No projects added yet.</span>}
              {projects.map((project, idx) => (
                <div key={idx} className={`group flex flex-col bg-[#06090F] p-5 rounded-2xl border border-white/5 hover:border-[#8B7CFF]/30 transition-colors relative`}>
                  <h4 className="text-base font-bold text-white mb-2 pr-16">{project.title}</h4>
                  <a href={`https://${project.link.replace('https://', '')}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#8B7CFF] hover:text-white transition-colors flex items-center mt-auto">
                    <LinkIcon className="w-4 h-4 mr-1.5" /> {project.link}
                  </a>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddOrUpdateProject} className="flex flex-col sm:flex-row gap-4 p-5 bg-[#1A2235] rounded-2xl border border-white/5">
              <input 
                type="text" 
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="Project Title"
                className="flex-[1.5] bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
              />
              <input 
                type="text" 
                value={newProject.link}
                onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                placeholder="URL (github.com/...)"
                className="flex-[2] bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
              />
              <button type="submit" className="flex items-center justify-center bg-[#8B7CFF] hover:bg-[#7a6ce0] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
                <Plus className="w-4 h-4 mr-1.5" />
                Post
              </button>
            </form>
          </div>



        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
