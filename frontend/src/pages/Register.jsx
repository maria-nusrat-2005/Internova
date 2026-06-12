import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import { registerUser, clearError } from "../../features/auth/authSlice.js";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "student" });
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleChange = (e) => {
    dispatch(clearError());
    setLocalError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    const { confirmPassword, ...submitData } = form;
    dispatch(registerUser(submitData));
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-center flex-1 px-16 relative overflow-hidden bg-gradient-to-br from-[#0d1426] to-[#111827]">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full -top-20 -left-20 blur-3xl" />
        <div className="absolute w-80 h-80 bg-violet-500/10 rounded-full -bottom-10 right-10 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xl">🚀</div>
            <span className="font-display text-2xl font-bold">Inter<span className="text-blue-400">nova</span></span>
          </div>
          <h1 className="font-display text-5xl font-extrabold leading-tight mb-5">
            Start Your <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Career</span><br />Journey Today
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Join thousands of students who found their dream internships through Internova's smart matching system.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex items-center justify-center w-full lg:w-[500px] px-8 py-12 bg-[#111827] border-l border-white/5 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">🚀</div>
            <span className="font-display text-xl font-bold">Inter<span className="text-blue-400">nova</span></span>
          </div>

          <h2 className="font-display text-3xl font-bold mb-1">Join Internova 🎓</h2>
          <p className="text-slate-400 text-sm mb-8">Create your free account today</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { value: "student", icon: "🎓", label: "Student", desc: "Find internships" },
              { value: "company", icon: "🏢", label: "Company", desc: "Post openings" },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setForm({ ...form, role: r.value })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  form.role === r.value
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="text-2xl mb-1">{r.icon}</div>
                <div className="text-sm font-semibold">{r.label}</div>
                <div className="text-xs text-slate-500">{r.desc}</div>
              </button>
            ))}
          </div>

          {displayError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              ❌ {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Maria Nusrat"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@university.edu"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                required
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                  </svg>
                  Creating account…
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}