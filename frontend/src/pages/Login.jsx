import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import { loginUser, clearError } from "../../features/auth/authSlice.js";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleChange = (e) => {
    dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

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
            Find Your <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Perfect</span><br />Internship
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-md">
            AI-powered matching based on your skills, projects, and career goals.
          </p>
          <div className="flex gap-10">
            {[["2,400+", "Companies"], ["18K+", "Students Placed"], ["94%", "Match Rate"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-extrabold text-blue-400">{n}</div>
                <div className="text-sm text-slate-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex items-center justify-center w-full lg:w-[460px] px-8 bg-[#111827] border-l border-white/5">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">🚀</div>
            <span className="font-display text-xl font-bold">Inter<span className="text-blue-400">nova</span></span>
          </div>

          <h2 className="font-display text-3xl font-bold mb-1">Welcome back 👋</h2>
          <p className="text-slate-400 text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Your password"
                  required
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-blue-400 hover:underline">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                  </svg>
                  Signing in…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline font-medium">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}