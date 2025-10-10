import { Shield, Lock, Award, CheckCircle, CreditCard, Users } from 'lucide-react';

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'SSL Secured',
    description: '256-bit SSL encryption protects your data',
    color: 'text-blue-500'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Secure Payments',
    description: 'PCI DSS compliant payment processing',
    color: 'text-green-500'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: '30-Day Guarantee',
    description: 'Money back if not completely satisfied',
    color: 'text-emerald-500'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Verified Reviews',
    description: 'All testimonials from real customers',
    color: 'text-purple-500'
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Instant Delivery',
    description: 'Download immediately after purchase',
    color: 'text-orange-500'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '10,000+ Traders',
    description: 'Trusted by traders worldwide',
    color: 'text-indigo-500'
  }
];

interface TrustBadgesProps {
  layout?: 'grid' | 'horizontal';
  showDescriptions?: boolean;
  className?: string;
}

export default function TrustBadges({
  layout = 'grid',
  showDescriptions = true,
  className = ''
}: TrustBadgesProps) {
  if (layout === 'horizontal') {
    return (
      <div className={`flex flex-wrap justify-center items-center gap-6 ${className}`}>
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2 text-slate-300">
            <div className={`${badge.color} bg-slate-800 p-2 rounded-lg`}>
              {badge.icon}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-white">{badge.title}</div>
              {showDescriptions && (
                <div className="text-xs text-slate-400">{badge.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ${className}`}>
      {trustBadges.map((badge, index) => (
        <div
          key={index}
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 text-center group hover:shadow-lg hover:shadow-slate-900/50"
        >
          <div className={`${badge.color} bg-slate-900 p-3 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
            {badge.icon}
          </div>
          <h3 className="text-white font-semibold mb-2">{badge.title}</h3>
          {showDescriptions && (
            <p className="text-slate-400 text-sm leading-relaxed">{badge.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
