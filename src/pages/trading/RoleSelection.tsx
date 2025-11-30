import React, { useState } from 'react';
import { TrendingUp, Users, Signal, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types/trading';

interface RoleSelectionProps {
  onComplete?: () => void;
}

export function RoleSelection({ onComplete }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useAuthStore();

  const handleContinue = async () => {
    if (!selectedRole) return;
    setIsLoading(true);
    try {
      await updateProfile({ role: selectedRole });
      onComplete?.();
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 'provider' as UserRole,
      title: 'Signal Provider',
      description: 'Share your trading signals with subscribers and build your reputation',
      icon: Signal,
      features: [
        'Publish trading signals',
        'Build subscriber base',
        'Track your performance',
        'Earn from subscriptions',
      ],
      color: 'emerald',
    },
    {
      id: 'receiver' as UserRole,
      title: 'Signal Receiver',
      description: 'Follow top traders and auto-execute their signals on your account',
      icon: Users,
      features: [
        'Follow top providers',
        'Auto-execute trades',
        'Risk management tools',
        'Performance tracking',
      ],
      color: 'blue',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Choose Your Role</h1>
          <p className="text-slate-400 mt-2">
            Select how you want to use TradeSignalApp
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            const colorClasses = role.color === 'emerald'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-blue-500 bg-blue-500/10';

            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? colorClasses
                    : 'hover:border-slate-600'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      role.color === 'emerald' ? 'bg-emerald-500/20' : 'bg-blue-500/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        role.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'
                      }`} />
                    </div>
                    {isSelected && (
                      <CheckCircle className={`w-6 h-6 ${
                        role.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'
                      }`} />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {role.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {role.description}
                  </p>

                  <ul className="space-y-2">
                    {role.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className={`w-4 h-4 ${
                          role.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedRole}
            isLoading={isLoading}
            className="min-w-[200px]"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-slate-500 text-sm mt-4">
            You can change your role later in settings
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
