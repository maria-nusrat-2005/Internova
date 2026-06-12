import { useAppSelector } from "../../app/hooks.js";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";

export default function StudentDashboard() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const stats = [
    { icon: "💼", number: "12", label: "Matched Internships" },
    { icon: "📨", number: "3",  label: "Applications Sent" },
    { icon: "⭐", number: "94%", label: "Profile Match Score" },
    { icon: "🔖", number: "5",  label: "Bookmarked" },
  ];

  const mockInternships = [
    { id: 1, title: "Frontend Developer Intern", company: "TechCorp BD", location: "Dhaka", type: "onsite", stipend: 8000, match: 95, skills: ["React", "Tailwind"] },
    { id: 2, title: "Backend Developer Intern", company: "StartupX", location: "Remote", type: "remote", stipend: 6000, match: 87, skills: ["Node.js", "MongoDB"] },
    { id: 3, title: "UI/UX Design Intern",      company: "DesignHub", location: "Dhaka", type: "hybrid", stipend: 5000, match: 72, skills: ["Figma", "CSS"] },
  ];

  const matchColor = (score) => {
    if (score >= 90) return "text-emerald-400 bg-emerald-400/10";
    if (score >= 70) return "text-yellow-400 bg-yellow-400/10";
    return "text-red-400 bg-red-400/10";
  };

  const matchDot = (score) => {
    if (score >= 90) return "🟢";
    if (score >= 70) return "🟡";
    return "🔴";
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Topbar */}
      <header className="h-16 bg-[#111827] border-b border-white/8 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">🚀</div>
          <span className="font-display text-xl font-bold">Inter<span className="text-blue-400">nova</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="text-sm text-slate-400 hover:text-white transition-colors">Profile</Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
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
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="font-display text-3xl font-extrabold mb-1">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-400">Here are your top internship matches today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-display text-3xl font-extrabold text-blue-400">{s.number}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Internship matches */}
        <h2 className="font-display text-xl font-bold mb-4">🎯 Top Matches for You</h2>
        <div className="space-y-4">
          {mockInternships.map((job) => (
            <div key={job.id} className="card p-5 flex items-start justify-between gap-4 hover:border-blue-500/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{job.title}</h3>
                  <span className="text-xs">{matchDot(job.match)}</span>
                </div>
                <p className="text-sm text-slate-400 mb-3">{job.company} · {job.location} · <span className="capitalize">{job.type}</span></p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((sk) => (
                    <span key={sk} className="text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">{sk}</span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className={`text-sm font-bold px-3 py-1 rounded-lg mb-2 ${matchColor(job.match)}`}>
                  {job.match}% match
                </div>
                <div className="text-xs text-slate-500">৳{job.stipend.toLocaleString()}/mo</div>
                <button className="mt-2 text-xs px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}