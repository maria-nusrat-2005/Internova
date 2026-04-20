import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const DashboardLayout = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Discovery', path: '/dashboard/discovery' },
    { name: 'Profile', path: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
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
            // Very simple active check
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
        <div className="flex items-center gap-6 w-48 justify-end">
          <button className="text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#8B7CFF] rounded-full border border-[#0B0F19]"></span>
          </button>
          
          <Link to="/dashboard/profile" className="w-9 h-9 rounded-full overflow-hidden border border-white/10 hover:border-[#8B7CFF] transition-colors cursor-pointer bg-[#131B2B] flex items-center justify-center">
             <User className="w-5 h-5 text-gray-400" />
          </Link>
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
