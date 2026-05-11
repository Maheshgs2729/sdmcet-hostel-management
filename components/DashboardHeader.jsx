'use client';
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function DashboardHeader({ title, subtitle, initials, gradientFrom, gradientTo, roleBadge, roleIcon, badgeBg, badgeText }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (session) {
      await signOut({ redirect: false });
    }
    router.push('/');
  };

  return (
    <header className="bg-luxury-navy border-b border-luxury-gold/20 shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-luxury-gold bg-luxury-navy flex items-center justify-center text-luxury-gold font-serif font-bold text-lg shadow-sm">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-luxury-frost leading-tight tracking-wide">{title}</h1>
            <p className="text-xs text-luxury-champagne/70 uppercase tracking-widest">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {session?.user?.image && (
            <img src={session.user.image} alt="User avatar" className="hidden sm:block w-9 h-9 rounded-full border border-luxury-gold/50" referrerPolicy="no-referrer" />
          )}
          <span className="hidden sm:inline-block px-3 py-1 bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-bold uppercase tracking-wider rounded-full">
            {roleIcon} {roleBadge}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-luxury-frost/70 hover:text-white hover:bg-white/10 rounded-lg transition-smooth"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
