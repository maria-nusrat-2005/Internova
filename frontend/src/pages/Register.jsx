import React, { useState } from 'react';
import { Mail, Lock, User, Briefcase, Loader2, BookOpen } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'student'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: formData.role })
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Registration failed');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Network error. Ensure backend is running.');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm">Join the network to start your journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider uppercase">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-12 pr-4 py-3 bg-[#06090F] border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] transition-all text-sm"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider uppercase">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-12 pr-4 py-3 bg-[#06090F] border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] transition-all text-sm"
              placeholder="name@internova.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider uppercase">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-12 pr-4 py-3 bg-[#06090F] border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF] transition-all text-sm tracking-widest"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-2 tracking-wider uppercase">Account Type</label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`
              flex items-center justify-center py-3 px-4 rounded-lg border cursor-pointer transition-all duration-200
              ${formData.role === 'student' 
                ? 'bg-[#8B7CFF]/10 border-[#8B7CFF]/50 text-[#8B7CFF]' 
                : 'bg-[#06090F] border-white/5 text-gray-500 hover:bg-[#0A0E17] hover:text-gray-300'}
            `}>
              <input 
                type="radio" 
                name="role" 
                value="student" 
                checked={formData.role === 'student'}
                onChange={handleChange}
                className="sr-only" 
              />
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">Student</span>
            </label>
            <label className={`
              flex items-center justify-center py-3 px-4 rounded-lg border cursor-pointer transition-all duration-200
              ${formData.role === 'company' 
                ? 'bg-[#8B7CFF]/10 border-[#8B7CFF]/50 text-[#8B7CFF]' 
                : 'bg-[#06090F] border-white/5 text-gray-500 hover:bg-[#0A0E17] hover:text-gray-300'}
            `}>
              <input 
                type="radio" 
                name="role" 
                value="company" 
                checked={formData.role === 'company'}
                onChange={handleChange}
                className="sr-only" 
              />
              <Briefcase className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">Company</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3.5 px-4 rounded-lg shadow-sm text-sm font-bold text-[#131B2B] bg-[#8B7CFF] hover:bg-white focus:outline-none transition-all duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-[#131B2B]" /> : 'Create Account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
