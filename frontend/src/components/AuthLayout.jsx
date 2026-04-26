import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, Sparkles } from 'lucide-react';

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white font-sans selection:bg-[#8B7CFF] selection:text-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="text-lg sm:text-xl font-bold tracking-tight">Internova</div>
        <div className="text-xs sm:text-sm text-gray-400 font-medium">
          <span className="hidden sm:inline">{isLogin ? 'NEW TO THE PLATFORM?' : 'ALREADY HAVE AN ACCOUNT?'}</span>
          <span className="sm:hidden">{isLogin ? 'NEW HERE?' : 'HAVE ACCOUNT?'}</span>{' '}
          <Link 
            to={isLogin ? '/register' : '/login'} 
            className="text-white hover:text-[#8B7CFF] ml-1 sm:ml-2 transition-colors"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 gap-8 lg:gap-24">
        
        {/* Left Side: Copy & Features */}
        <div className="hidden lg:flex flex-col w-1/2 pr-8">
          <div className="inline-block bg-[#1A2235] text-gray-300 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full w-fit mb-8 border border-white/5">
            SMART INTERNSHIP MATCHING
          </div>
          
          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Find Your Perfect<br/>
            <span className="text-[#8B7CFF]">Internship.</span>
          </h1>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
            Internova transforms the internship search into a personalized experience. Connect with opportunities that match your skills, projects, and professional goals.
          </p>

          <div className="flex gap-6">
            <div className="bg-[#131B2B] p-6 rounded-xl border border-white/5 flex-1 shadow-xl">
              <Star className="w-5 h-5 text-[#8B7CFF] mb-4 fill-[#8B7CFF]/20" />
              <h3 className="font-semibold text-white mb-2">Smart Scoring</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Matches based on your verified skills, projects, and educational background.
              </p>
            </div>
            
            <div className="bg-[#131B2B] p-6 rounded-xl border border-white/5 flex-1 shadow-xl">
              <Sparkles className="w-5 h-5 text-[#8B7CFF] mb-4 fill-[#8B7CFF]/20" />
              <h3 className="font-semibold text-white mb-2">Skill Gap Analysis</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Identifies missing requirements and suggests paths to improve your chances.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="bg-[#131B2B] p-6 sm:p-10 rounded-2xl border border-white/5 w-full max-w-md shadow-2xl relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8B7CFF] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#05070A] py-6 sm:py-8 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between text-xs text-gray-500 font-medium">
          <div className="flex flex-col items-center md:items-start mb-0">
            <span className="text-white text-sm font-bold mb-1">Internova</span>
            <span>© 2026 INTERNOVA.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
            <a href="#" className="hover:text-white transition-colors">GUIDELINES</a>
            <a href="#" className="hover:text-white transition-colors">HELP</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
