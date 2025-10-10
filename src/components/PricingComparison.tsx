import { Check, X, Star, Zap } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  missingFeatures?: string[];
  popular?: boolean;
  badge?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Single EA',
    price: 299,
    description: 'Perfect for focused traders',
    features: [
      'One Expert Advisor',
      'Lifetime License',
      'Free Updates',
      'Email Support',
      'User Manual',
      'Installation Guide'
    ],
    missingFeatures: [
      'Multiple EAs',
      'Priority Support',
      'Custom Settings',
      'Strategy Customization'
    ]
  },
  {
    name: 'EA Bundle',
    price: 699,
    originalPrice: 996,
    description: 'Most popular choice',
    features: [
      '4 Expert Advisors',
      'Lifetime License',
      'Free Updates',
      'Priority Email Support',
      'All User Manuals',
      'Installation Guides',
      'Strategy Customization',
      'Custom Settings Access'
    ],
    popular: true,
    badge: 'Best Value'
  },
  {
    name: 'Pro Suite',
    price: 1299,
    originalPrice: 1996,
    description: 'Complete trading solution',
    features: [
      'All 8 Expert Advisors',
      'Lifetime License',
      'Free Updates',
      '24/7 Priority Support',
      'All Documentation',
      'Custom Strategy Development',
      'VPS Setup Assistance',
      'Monthly Performance Reports',
      'Risk Management Tools',
      'Advanced Analytics'
    ]
  }
];

export default function PricingComparison() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Pricing Plans
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Trading Advantage
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Select the perfect package for your trading goals. All plans include lifetime access and free updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-900 rounded-2xl border transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 mb-4">{plan.description}</p>

                  <div className="flex items-center justify-center mb-4">
                    {plan.originalPrice && (
                      <span className="text-lg text-slate-500 line-through mr-3">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400 ml-2">one-time</span>
                  </div>

                  {plan.originalPrice && (
                    <div className="inline-flex items-center px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium">
                      Save ${(plan.originalPrice - plan.price).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}

                  {plan.missingFeatures && plan.missingFeatures.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center opacity-50">
                      <X className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {plan.popular ? 'Get Started Now' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-full mb-4">
                  <Star className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">30-Day Guarantee</h4>
                <p className="text-slate-400 text-sm">Not satisfied? Get a full refund within 30 days.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-full mb-4">
                  <Check className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Lifetime Updates</h4>
                <p className="text-slate-400 text-sm">Free updates and improvements for life.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-full mb-4">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Expert Support</h4>
                <p className="text-slate-400 text-sm">Get help from our trading experts anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
