import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Search, X } from 'lucide-react';

const DashboardLayout = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = role === 'company'
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Talent', path: '/dashboard/discovery' },
        { name: 'Insights', path: '/dashboard/insights' },
        { name: 'Company', path: '/dashboard/profile' },
      ]
    : [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Discovery', path: '/dashboard/discovery' },
        { name: 'Profile', path: '/dashboard/profile' },
      ];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to discovery with search query
      navigate(`/dashboard/discovery?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white font-sans selection:bg-[#8B7CFF] selection:text-white">
      
      {/* Top Navbar */}
      <header className="h-20 bg-[#0B0F19] border-b border-white/5 flex items-center justify-between px-8 z-10 w-full">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight text-white w-48">
          Internova
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                             (item.path === '/dashboard' && location.pathname === '/dashboard/');
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-[-1.25rem] left-0 w-full h-0.5 bg-[#8B7CFF] rounded-t-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 justify-end">
          
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={role === 'company' ? 'Search talent...' : 'Search internships...'}
                    autoFocus
                    className="w-56 bg-[#131B2B] border border-white/10 rounded-xl pl-9 pr-9 py-2 text-sm text-white placeholder-gray-500 focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#131B2B] rounded-xl"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          <button className="text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#8B7CFF] rounded-full border border-[#0B0F19]"></span>
          </button>
          
          <Link to="/dashboard/profile" className="w-9 h-9 rounded-full overflow-hidden border border-white/10 hover:border-[#8B7CFF] transition-colors cursor-pointer bg-[#131B2B] flex items-center justify-center">
             <User className="w-5 h-5 text-gray-400" />
          </Link>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-400 hover:text-white hover:bg-[#1A2235] rounded-xl transition-all border border-transparent hover:border-white/10"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline-block tracking-wider uppercase text-xs">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="flex-1 p-8 pb-20 relative w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#05070A] py-8 px-8 mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
          <div className="text-white text-sm font-bold tracking-widest uppercase mb-4 md:mb-0">
            Internova
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-white transition-colors">CAREER SUPPORT</a>
            <span className="ml-8">© 2026 INTERNOVA. THE VISIONARY CURATOR.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
