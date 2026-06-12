import { useAppSelector } from "../../app/hooks.js";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";

export default function CompanyDashboard() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const stats = [
    { icon: "📋", number: "4",  label: "Active Listings" },
    { icon: "👥", number: "23", label: "Total Applicants" },
    { icon: "🎯", number: "8",  label: "Shortlisted" },
    { icon: "✅", number: "2",  label: "Hired" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <header className="h-16 bg-[#111827] border-b border-white/8 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">🚀</div>
          <span className="font-display text-xl font-bold">Inter<span className="text-blue-400">nova</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="text-sm text-slate-400 hover:text-white">Profile</Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || "C"}
          </div>
          <span className="text-sm text-slate-300 hidden sm:block">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-slate-500 hover:text-red-400 border border-white/10 hover:border-red-400/30 px-3 py-1.5 rounded-lg transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl font-extrabold mb-1">Company Dashboard 🏢</h1>
            <p className="text-slate-400">Manage your internship listings and applications.</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
            + Post Internship
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-display text-3xl font-extrabold text-violet-400">{s.number}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-xl font-bold mb-4">📋 Your Listings</h2>
        <div className="card p-6 text-center text-slate-500">
          <div className="text-4xl mb-3">📭</div>
          <p>No internships posted yet.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-xl hover:bg-blue-600 transition-colors">
            Post Your First Internship
          </button>
        </div>
      </main>
    </div>
  );
}