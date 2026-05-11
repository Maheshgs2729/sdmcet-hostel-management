'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { UserIcon, LockIcon } from '@/components/icons';
import { ROLES, EMAIL_ROLE_MAP } from '@/lib/data';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Auto-route based on Google session
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      const email = session.user.email;
      const assignedRole = EMAIL_ROLE_MAP[email] || 'student';
      router.push(`/dashboard/${assignedRole}`);
    }
  }, [status, session, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) { setError('Please select a role'); return; }
    if (!username.trim()) { setError('Please enter your username'); return; }
    if (!password.trim() && !session) { setError('Please enter your password'); return; }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/dashboard/${role}`);
    }, 800);
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    signIn('google', { callbackUrl: '/' });
  };

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen bg-luxury-navy flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full spinner mb-4"></div>
        <p className="text-luxury-champagne font-medium font-serif italic text-lg fade-in">Authenticating your credentials...</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 parallax-bg"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c0d5e9af?q=80&w=2000&auto=format&fit=crop')" }}
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center relative z-10 fade-in">
        
        {/* Editorial Hero Section */}
        <div className="flex-1 text-center md:text-left text-white mb-8 md:mb-0">
          <p className="text-luxury-gold font-bold tracking-[0.3em] uppercase text-xs mb-4">SDM College of Engineering</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-luxury-frost leading-tight mb-6">
            Elevated<br />Living.
          </h1>
          <p className="text-lg text-luxury-champagne/80 font-light max-w-md mx-auto md:mx-0">
            Welcome to the premier hostel management experience. Seamlessly manage your accommodations with our state-of-the-art platform.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md glass-card-premium rounded-2xl p-10 relative overflow-hidden">
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
          
          <h2 className="text-3xl font-serif font-bold text-luxury-navy mb-2">Sign In</h2>
          <p className="text-luxury-charcoal/70 text-sm mb-8 font-light">Access your personalized dashboard</p>

          {/* Continue with Google */}
          <button
            id="google-signin-button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3.5 px-4 bg-luxury-navy text-luxury-frost hover:bg-luxury-blue rounded-xl font-medium transition-smooth btn-press flex items-center justify-center gap-3 shadow-lg disabled:opacity-70"
          >
            {googleLoading ? (
              <><div className="w-5 h-5 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full spinner"></div> Connecting...</>
            ) : (
              <><GoogleIcon /> Continue with Google</>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-luxury-navy/10"></div>
            <span className="text-xs text-luxury-navy/40 font-serif italic tracking-wider uppercase">or sign in manually</span>
            <div className="flex-1 h-px bg-luxury-navy/10"></div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-[#e74c3c]/10 border border-[#e74c3c]/20 rounded-lg text-[#e74c3c] text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-luxury-navy uppercase tracking-wider mb-2" htmlFor="role-select">Login As</label>
              <select
                id="role-select"
                value={role}
                onChange={e => { setRole(e.target.value); setError(''); }}
                className="w-full px-4 py-3 rounded-lg border border-luxury-navy/20 bg-white/50 text-luxury-navy focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-smooth appearance-none cursor-pointer"
              >
                <option value="">— Select your role —</option>
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{r.icon} {r.label}</option>
                ))}
              </select>
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-luxury-navy uppercase tracking-wider mb-2" htmlFor="username-input">Username / USN</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-navy/40"><UserIcon /></div>
                <input id="username-input" type="text" placeholder="e.g., 2SD21CS001" value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-luxury-navy/20 bg-white/50 text-luxury-navy focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-smooth placeholder:text-luxury-navy/30" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-luxury-navy uppercase tracking-wider mb-2" htmlFor="password-input">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-navy/40"><LockIcon /></div>
                <input id="password-input" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-luxury-navy/20 bg-white/50 text-luxury-navy focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-smooth placeholder:text-luxury-navy/30" />
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-button"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-luxury-gold hover:bg-[#b08b49] text-white font-bold tracking-wider uppercase text-sm rounded-xl shadow-lg transition-smooth btn-press disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner"></div> Verifying...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-luxury-navy/40 mt-8 font-serif italic">© 2026 SDMCET Dharwad. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
