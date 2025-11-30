import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { LandingPage } from './LandingPage';
import { AuthPage } from './AuthPage';
import { RoleSelection } from './RoleSelection';
import { ProviderDashboard } from './ProviderDashboard';
import { ReceiverDashboard } from './ReceiverDashboard';
import { TrendingUp, LogOut, User, Settings, Bell } from 'lucide-react';
import { Button } from '../../components/ui/button';

type AppView = 'landing' | 'auth' | 'role-selection' | 'dashboard';

export function TradingApp() {
  const { user, profile, isLoading, isAuthenticated, initialize, signOut } = useAuthStore();
  const [view, setView] = useState<AppView>('landing');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initialize().then(() => setInitialized(true));
  }, [initialize]);

  useEffect(() => {
    if (!initialized) return;

    if (isAuthenticated && profile) {
      if (!profile.role || profile.role === 'receiver') {
        // Check if role was explicitly set
        setView('dashboard');
      } else {
        setView('dashboard');
      }
    } else if (!isAuthenticated) {
      setView('landing');
    }
  }, [isAuthenticated, profile, initialized]);

  const handleGetStarted = () => setView('auth');
  const handleLogin = () => setView('auth');
  const handleAuthSuccess = () => {
    if (profile && profile.role) {
      setView('dashboard');
    } else {
      setView('role-selection');
    }
  };
  const handleRoleComplete = () => setView('dashboard');
  const handleSignOut = async () => {
    await signOut();
    setView('landing');
  };

  if (isLoading || !initialized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Landing page
  if (view === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} onLogin={handleLogin} />;
  }

  // Auth page
  if (view === 'auth') {
    return <AuthPage onSuccess={handleAuthSuccess} />;
  }

  // Role selection
  if (view === 'role-selection') {
    return <RoleSelection onComplete={handleRoleComplete} />;
  }

  // Dashboard with navigation
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">TradeSignalApp</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 capitalize">
                  {profile?.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-white">
                    {profile?.full_name || 'User'}
                  </div>
                  <div className="text-xs text-slate-400">{user?.email}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-10 h-10 rounded-full" />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Sign Out */}
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {profile?.role === 'provider' ? (
          <ProviderDashboard />
        ) : (
          <ReceiverDashboard />
        )}
      </main>
    </div>
  );
}

export default TradingApp;
