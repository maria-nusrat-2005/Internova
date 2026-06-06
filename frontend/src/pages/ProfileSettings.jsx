import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, Save, User, Lock, Bell, Eye, Trash2, Shield, Mail, CheckCircle2, X, ChevronDown, ToggleLeft, ToggleRight } from 'lucide-react';

const SECTIONS = [
  { id: 'profile', label: 'Profile Settings', icon: User },
  { id: 'security', label: 'Account Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy & Visibility', icon: Eye },
];

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
      enabled ? 'bg-[#8B7CFF]' : 'bg-[#1A2235]'
    } border ${enabled ? 'border-[#8B7CFF]' : 'border-white/10'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const ProfileSettings = ({ role }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // Profile form state
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '' });
  const [bio, setBio] = useState('');

  // Security state
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyDigest: false,
  });

  // Privacy state
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'Public',
    matchDiscoverability: true,
  });

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Refs for scrolling
  const sectionRefs = {
    profile: useRef(null),
    security: useRef(null),
    notifications: useRef(null),
    privacy: useRef(null),
  };

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setPersonalInfo({ name: 'Maria Nusrat', email: 'maria@internova.io' });
          setBio('');
          setIsLoading(false);
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5000/api/auth/me', config);
        const user = data.data;
        setPersonalInfo({ name: user.name || '', email: user.email || '' });
        setProfilePic(user.profilePic || null);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setPersonalInfo({ name: 'Maria Nusrat', email: 'maria@internova.io' });
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setTimeout(() => {
          setIsSaving(false);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        name: personalInfo.name,
        email: personalInfo.email,
        profilePic,
        bio,
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

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete('http://localhost:5000/api/auth/profile', config);
      }
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to delete account.');
    }
  };

  if (isLoading) {
    return <div className="text-white text-center py-20">Loading profile data...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white italic tracking-tight mb-3">Account Settings</h1>
        <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
          Manage your curated professional identity, security protocols, and discovery preferences within the Internova ecosystem.
        </p>
      </div>

      {/* ─── MOBILE HORIZONTAL TABS ─── */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-2 -mx-1 px-1 scrollbar-none">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#8B7CFF] text-white shadow-lg shadow-[#8B7CFF]/20'
                  : 'text-gray-400 bg-[#131B2B] hover:text-gray-200 border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {section.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-8">

        {/* ─── LEFT SIDEBAR NAV — Desktop ─── */}
        <div className="hidden lg:block w-56 shrink-0">
          <nav className="sticky top-8 space-y-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'bg-[#8B7CFF] text-white shadow-lg shadow-[#8B7CFF]/20 border-l-2 border-[#8B7CFF]'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#131B2B] border-l-2 border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ─── RIGHT CONTENT AREA ─── */}
        <div className="flex-1 space-y-6 sm:space-y-8 min-w-0">

          {/* ════════════════════════════════════════════════
              SECTION 1: PROFILE SETTINGS
             ════════════════════════════════════════════════ */}
          <div ref={sectionRefs.profile}>
            <div className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 sm:px-8 pt-5 sm:pt-8 pb-4">
                <h2 className="text-sm font-bold text-gray-300 tracking-widest uppercase">Profile Settings</h2>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {saveSuccess && (
                    <div className="flex items-center text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Saved
                    </div>
                  )}
                  {errorMsg && (
                    <div className="flex items-center text-red-400 text-xs font-bold">
                      <X className="w-4 h-4 mr-1.5" /> {errorMsg}
                    </div>
                  )}
                  <button
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-[#8B7CFF] hover:bg-[#7a6ce0] text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all disabled:opacity-70 shadow-lg shadow-[#8B7CFF]/10 w-full sm:w-auto justify-center"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>

              {/* Profile Card: Avatar + Name + Email + Bio */}
              <div className="px-5 sm:px-8 pb-5 sm:pb-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Avatar */}
                  <div 
                    className="relative group cursor-pointer shrink-0"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 bg-[#06090F] flex items-center justify-center relative group-hover:border-[#8B7CFF]/50 transition-all">
                      {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-gray-600" />
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#8B7CFF] rounded-lg flex items-center justify-center border-2 border-[#131B2B]">
                      <Camera className="w-3 h-3 text-white" />
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </div>

                  {/* Name + Email Fields */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Full Name</label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                        className="w-full bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Email Address</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="w-full bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Professional Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        placeholder="Visionary Creative Director focusing on high-end editorial digital experiences and atmospheric design systems."
                        className="w-full bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════
              SECTION 2: ACCOUNT SECURITY
             ════════════════════════════════════════════════ */}
          <div ref={sectionRefs.security}>
            <div className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              <div className="px-5 sm:px-8 pt-5 sm:pt-8 pb-4">
                <h2 className="text-sm font-bold text-gray-300 tracking-widest uppercase">Account Security</h2>
              </div>

              <div className="px-5 sm:px-8 pb-5 sm:pb-8 space-y-4">
                {/* Password Control */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#06090F] rounded-xl px-4 sm:px-5 py-4 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1A2235] rounded-xl flex items-center justify-center border border-white/5">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Password Control</p>
                      <p className="text-xs text-gray-500">Last updated 14 days ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                    className="text-[#8B7CFF] hover:text-[#a99cff] text-sm font-semibold transition-colors"
                  >
                    {showPasswordFields ? 'Cancel' : 'Change'}
                  </button>
                </div>

                {/* Password Change Fields (Expandable) */}
                {showPasswordFields && (
                  <div className="bg-[#06090F] rounded-xl px-5 py-5 border border-white/5 space-y-4 animate-in">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Current Password</label>
                      <input
                        type="password"
                        value={passwords.current}
                        onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                        className="w-full bg-[#131B2B] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">New Password</label>
                        <input
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                          className="w-full bg-[#131B2B] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Confirm Password</label>
                        <input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                          className="w-full bg-[#131B2B] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Two-Factor Authentication */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-[#1A1040] to-[#0D1220] rounded-xl px-4 sm:px-5 py-4 border border-[#8B7CFF]/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#8B7CFF]/10 rounded-xl flex items-center justify-center border border-[#8B7CFF]/20">
                      <Shield className="w-5 h-5 text-[#8B7CFF]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                      </div>
                      <p className="text-xs text-gray-500">Secure your account with a mobile authenticator</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">Disabled</span>
                    <Toggle enabled={false} onToggle={() => {}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════
              SECTION 3 & 4: NOTIFICATIONS + PRIVACY SIDE BY SIDE
             ════════════════════════════════════════════════ */}
          <div ref={sectionRefs.notifications} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Notifications */}
            <div className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              <div className="px-5 sm:px-8 pt-5 sm:pt-8 pb-4">
                <h2 className="text-sm font-bold text-gray-300 tracking-widest uppercase">Notifications</h2>
              </div>
              <div className="px-5 sm:px-8 pb-5 sm:pb-8 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300 font-medium">Email Alerts</span>
                  <Toggle
                    enabled={notifications.emailAlerts}
                    onToggle={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300 font-medium">Push Notifications</span>
                  <Toggle
                    enabled={notifications.pushNotifications}
                    onToggle={() => setNotifications({...notifications, pushNotifications: !notifications.pushNotifications})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300 font-medium">Weekly Digest</span>
                  <Toggle
                    enabled={notifications.weeklyDigest}
                    onToggle={() => setNotifications({...notifications, weeklyDigest: !notifications.weeklyDigest})}
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Visibility */}
            <div ref={sectionRefs.privacy} className="bg-[#131B2B] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              <div className="px-5 sm:px-8 pt-5 sm:pt-8 pb-4">
                <h2 className="text-sm font-bold text-gray-300 tracking-widest uppercase">Privacy & Visibility</h2>
              </div>
              <div className="px-5 sm:px-8 pb-5 sm:pb-8 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300 font-medium">Profile Visibility</span>
                  <div className="relative">
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                      className="appearance-none bg-[#06090F] border border-white/10 text-white text-sm rounded-lg px-4 py-2 pr-8 focus:border-[#8B7CFF] outline-none cursor-pointer"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                      <option value="Connections">Connections Only</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300 font-medium">Match Discoverability</span>
                  <Toggle
                    enabled={privacy.matchDiscoverability}
                    onToggle={() => setPrivacy({...privacy, matchDiscoverability: !privacy.matchDiscoverability})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════
              SECTION 5: DELETE ACCOUNT (DANGER ZONE)
             ════════════════════════════════════════════════ */}
          <div className="bg-[#131B2B] rounded-2xl border border-red-500/10 shadow-xl overflow-hidden">
            <div className="px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-red-400 tracking-wide">Delete Account</h3>
                <p className="text-xs text-gray-500 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center gap-2 px-5 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Permanently Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
