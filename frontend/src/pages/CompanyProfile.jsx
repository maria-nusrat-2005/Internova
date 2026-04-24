import React, { useState, useRef } from 'react';
import { Camera, Upload, Plus, X, Globe, Link2, Palette, ChevronDown, CheckCircle2, Save } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Identity', sub: 'Logo & Visual' },
  { id: 2, label: 'Brand Story', sub: 'Narrative Voice' },
  { id: 3, label: 'Culture', sub: 'Core Values' },
  { id: 4, label: 'Connect', sub: 'Social & Links' },
];

const INDUSTRIES = ['Technology', 'Finance & Banking', 'Healthcare', 'Education', 'Media & Publishing', 'E-commerce', 'Manufacturing', 'Consulting', 'Other'];

const CompanyProfile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [logo, setLogo] = useState(null);
  const logoRef = useRef(null);

  const [identity, setIdentity] = useState({ legalName: 'Internova Technologies Ltd.', industry: 'Technology', tagline: 'The visionary curator of professional identity and career intelligence.' });
  const [narrative, setNarrative] = useState('Founded in 2024, Internova Technologies is redefining how emerging talent connects with forward-thinking enterprises. Our AI-driven platform bridges the gap between academic achievement and industry demand, creating meaningful internship experiences that shape the next generation of professionals.\n\nWe believe that every student deserves access to opportunities that align with their unique skills, aspirations, and potential. Through intelligent matching algorithms and curated career pathways, we empower both companies and candidates to build lasting professional relationships.');
  const [values, setValues] = useState([
    { title: 'Innovation First', desc: 'We prioritize disruptive thinking and technological experimentation above safe iterations.' },
    { title: 'Radical Transparency', desc: 'Open communication and honest feedback loops drive every decision we make.' },
    { title: 'Talent Empowerment', desc: 'We invest in people, providing mentorship, growth paths, and creative freedom.' },
    { title: 'Design Excellence', desc: 'Every touchpoint reflects our commitment to premium, editorial-quality experiences.' },
  ]);
  const [newValue, setNewValue] = useState({ title: '', desc: '' });
  const [links, setLinks] = useState({ website: 'https://internova.tech', linkedin: 'https://linkedin.com/company/internova', portfolio: 'https://dribbble.com/internova' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addValue = () => {
    if (newValue.title.trim()) {
      setValues([...values, { ...newValue }]);
      setNewValue({ title: '', desc: '' });
    }
  };

  const removeValue = (idx) => setValues(values.filter((_, i) => i !== idx));

  const handleSave = (isDraft = true) => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 1000);
  };

  const completion = Math.round(([identity.legalName, identity.industry, identity.tagline, narrative, values.length > 0, links.website].filter(Boolean).length / 6) * 100);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="mb-10">
        <p className="text-[#8B7CFF] tracking-widest text-xs font-bold uppercase mb-3">Onboarding Phase</p>
        <h1 className="text-5xl font-bold text-white tracking-tight leading-tight mb-2">
          Establish<br /><span className="text-[#8B7CFF]">Your Legacy.</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
          Define the soul of your enterprise. This profile serves as the editorial cornerstone for your brand's presence on the Internova platform.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-3 mb-10">
        {STEPS.map((step) => (
          <button key={step.id} onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border ${
              activeStep === step.id
                ? 'bg-[#8B7CFF] border-[#8B7CFF] text-white shadow-lg shadow-[#8B7CFF]/20'
                : 'bg-[#131B2B] border-white/5 text-gray-400 hover:border-white/10'
            }`}>
            <span className={`text-lg font-bold ${activeStep === step.id ? 'text-white/70' : 'text-gray-600'}`}>0{step.id}</span>
            <div>
              <p className={`text-sm font-bold ${activeStep === step.id ? 'text-white' : 'text-gray-300'}`}>{step.label}</p>
              <p className={`text-[10px] tracking-wider uppercase ${activeStep === step.id ? 'text-white/60' : 'text-gray-500'}`}>{step.sub}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content — Left 2/3 */}
        <div className="lg:col-span-2 space-y-8">

          {/* ═══ STEP 1: IDENTITY ═══ */}
          {activeStep === 1 && (
            <>
              <div className="bg-[#131B2B] rounded-2xl border border-white/5 p-8 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6">Company Identity</h2>
                {/* Logo Upload */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group cursor-pointer" onClick={() => logoRef.current.click()}>
                    <div className="w-24 h-24 rounded-2xl bg-[#06090F] border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group-hover:border-[#8B7CFF]/50 transition-all">
                      {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : <Upload className="w-8 h-8 text-gray-600" />}
                    </div>
                    <input type="file" ref={logoRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                    <span className="text-[10px] text-gray-500 mt-1 block text-center uppercase tracking-wider">Upload Logo</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Brand Mark</p>
                    <p className="text-xs text-gray-500">SVG or High-res PNG. Preferred aspect ratio 1:1 – 500×500px.</p>
                  </div>
                </div>

                {/* Legal Name + Industry */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Legal Name</label>
                    <input type="text" value={identity.legalName} onChange={(e) => setIdentity({...identity, legalName: e.target.value})}
                      placeholder="e.g. Nexus Editorial Ltd." className="w-full bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Industry Vertical</label>
                    <div className="relative">
                      <select value={identity.industry} onChange={(e) => setIdentity({...identity, industry: e.target.value})}
                        className="w-full appearance-none bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 pr-10 text-sm text-white focus:border-[#8B7CFF] outline-none transition-all cursor-pointer">
                        <option value="">Select industry</option>
                        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">Company Tagline</label>
                  <input type="text" value={identity.tagline} onChange={(e) => setIdentity({...identity, tagline: e.target.value})}
                    placeholder="The visionary curator of professional identity..." className="w-full bg-[#06090F] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all" />
                </div>
              </div>
            </>
          )}

          {/* ═══ STEP 2: BRAND NARRATIVE ═══ */}
          {activeStep === 2 && (
            <div className="bg-[#131B2B] rounded-2xl border border-white/5 p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Brand Narrative</h2>
                <span className="text-xs text-gray-500">{narrative.length} / 2000 chars</span>
              </div>
              {/* Mini toolbar */}
              <div className="flex items-center gap-1 bg-[#06090F] border border-white/5 rounded-t-xl px-3 py-2">
                {['B', 'I'].map(btn => (
                  <button key={btn} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-[#1A2235] transition-colors text-sm font-bold">{btn}</button>
                ))}
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-[#1A2235] transition-colors text-xs">≡</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-[#1A2235] transition-colors text-xs font-mono">GQ</button>
              </div>
              <textarea value={narrative} onChange={(e) => setNarrative(e.target.value)} rows={8}
                placeholder="Tell the story of how you started, where you're going, and why it matters..."
                className="w-full bg-[#06090F] border border-white/5 border-t-0 rounded-b-xl px-4 py-4 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] outline-none transition-all resize-none leading-relaxed" />
            </div>
          )}

          {/* ═══ STEP 3: CULTURE & VALUES ═══ */}
          {activeStep === 3 && (
            <div className="bg-[#131B2B] rounded-2xl border border-white/5 p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Culture & Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {values.map((val, idx) => (
                  <div key={idx} className="relative bg-gradient-to-br from-[#1A1040] to-[#0D1220] p-5 rounded-xl border border-[#8B7CFF]/10">
                    <button onClick={() => removeValue(idx)} className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
                    <div className="w-8 h-8 bg-[#8B7CFF]/10 rounded-lg flex items-center justify-center mb-3 border border-[#8B7CFF]/20">
                      <Palette className="w-4 h-4 text-[#8B7CFF]" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{val.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{val.desc}</p>
                  </div>
                ))}
                {/* Add New Value Card */}
                <div className="bg-[#06090F] p-5 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center min-h-[140px] gap-2">
                  <div className="w-8 h-8 bg-[#131B2B] rounded-full flex items-center justify-center border border-white/10">
                    <Plus className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Add Core Value</span>
                </div>
              </div>
              {/* Add Value Form */}
              <div className="bg-[#06090F] p-4 rounded-xl border border-white/5 space-y-3">
                <input type="text" value={newValue.title} onChange={(e) => setNewValue({...newValue, title: e.target.value})}
                  placeholder="Value title (e.g. Transparency)" className="w-full bg-[#131B2B] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] outline-none" />
                <input type="text" value={newValue.desc} onChange={(e) => setNewValue({...newValue, desc: e.target.value})}
                  placeholder="Brief description..." className="w-full bg-[#131B2B] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] outline-none" />
                <button onClick={addValue} className="flex items-center gap-2 bg-[#8B7CFF] hover:bg-[#7a6ce0] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Value
                </button>
              </div>
            </div>
          )}

          {/* ═══ STEP 4: PROFESSIONAL LINKS ═══ */}
          {activeStep === 4 && (
            <div className="bg-[#131B2B] rounded-2xl border border-white/5 p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Professional Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="url" value={links.website} onChange={(e) => setLinks({...links, website: e.target.value})}
                    placeholder="Company Website" className="w-full bg-[#06090F] border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] outline-none transition-all" />
                </div>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="url" value={links.linkedin} onChange={(e) => setLinks({...links, linkedin: e.target.value})}
                    placeholder="LinkedIn Profile" className="w-full bg-[#06090F] border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] outline-none transition-all" />
                </div>
              </div>
              <div className="relative">
                <Palette className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="url" value={links.portfolio} onChange={(e) => setLinks({...links, portfolio: e.target.value})}
                  placeholder="Design Portfolio / Behance (Optional)" className="w-full bg-[#06090F] border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#8B7CFF] outline-none transition-all" />
              </div>
            </div>
          )}

          {/* Save / Continue Buttons */}
          <div className="flex items-center justify-between">
            <button onClick={() => handleSave(true)} className="text-sm text-gray-400 hover:text-white font-semibold transition-colors">
              {saved ? '✓ Saved' : 'Save Draft'}
            </button>
            <div className="flex gap-3">
              {activeStep > 1 && (
                <button onClick={() => setActiveStep(activeStep - 1)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-[#1A2235] border border-white/5 transition-all">
                  Back
                </button>
              )}
              <button onClick={() => activeStep < 4 ? setActiveStep(activeStep + 1) : handleSave(false)}
                className="px-6 py-2.5 bg-[#8B7CFF] hover:bg-[#7a6ce0] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#8B7CFF]/10">
                {activeStep === 4 ? 'Continue to Review' : 'Next Step'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar — Tips + Preview */}
        <div className="space-y-6">
          {/* Editorial Tips */}
          <div className="bg-[#131B2B] rounded-2xl border border-white/5 p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3">✦ Editorial Tips</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Profiles with a distinct <span className="text-white font-semibold">Brand Narrative</span> receive 40% more engagement from premium talent.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Profile Completion</span>
              <span className="text-xs text-[#8B7CFF] font-bold">{completion}%</span>
            </div>
            <div className="w-full bg-[#06090F] rounded-full h-1.5 mb-6">
              <div className="bg-[#8B7CFF] h-1.5 rounded-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
            </div>

            {/* Preview Card */}
            <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Preview Card</p>
            <div className="bg-gradient-to-br from-[#1A1040] to-[#0D1220] rounded-xl p-4 border border-[#8B7CFF]/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#06090F] border border-white/10 flex items-center justify-center overflow-hidden">
                  {logo ? <img src={logo} alt="" className="w-full h-full object-cover" /> : <span className="text-gray-600 text-xs font-bold">LOGO</span>}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{identity.legalName || 'Company Name'}</p>
                  <p className="text-[10px] text-gray-500">{identity.industry || 'Industry'}</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed italic">
                "{identity.tagline || 'Your company tagline will appear here...'}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
