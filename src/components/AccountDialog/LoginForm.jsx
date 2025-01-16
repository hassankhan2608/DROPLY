import React, { useRef } from 'react';
import { FiMail, FiKey, FiEye, FiEyeOff, FiLoader, FiAlertCircle } from 'react-icons/fi';

const LoginForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, loading, error }) => {
  const passwordRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Email Address</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <FiMail className="w-4 h-4 text-zinc-500" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="relative z-10 w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg pl-10 pr-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-colors"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Password</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <FiKey className="w-4 h-4 text-zinc-500" />
            </div>
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="relative z-10 w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/50 transition-colors"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <FiEyeOff className="w-4 h-4" />
              ) : (
                <FiEye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-sm text-red-500">
          <FiAlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2.5 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <FiLoader className="w-4 h-4 animate-spin" />}
        Login
      </button>
    </form>
  );
};

export default LoginForm;