import { Target, Users, Award, TrendingUp, BarChart3, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About ForexEA Pro</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Empowering traders worldwide with intelligent, reliable, and profitable automated trading solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-3xl"></div>
            <img
              src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Trading Analysis"
              className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Founded by a team of experienced algorithmic traders and software engineers, ForexEA Pro was born from a simple mission: to democratize access to professional-grade automated trading tools.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              After years of trading manually and witnessing countless traders struggle with emotional decision-making and time constraints, we decided to leverage our expertise in both forex markets and artificial intelligence to create Expert Advisors that truly work.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Today, we serve thousands of traders worldwide, from beginners to professionals, helping them automate their trading strategies and achieve consistent results in the forex market.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10 text-emerald-500" />,
                title: 'Transparency',
                description: 'We provide real backtest results and performance metrics. No inflated claims, just honest data.'
              },
              {
                icon: <Shield className="w-10 h-10 text-emerald-500" />,
                title: 'Security',
                description: 'Your capital protection is our priority. All EAs include robust risk management features.'
              },
              {
                icon: <Users className="w-10 h-10 text-emerald-500" />,
                title: 'Support',
                description: 'Dedicated customer support to help you succeed. We\'re here for you every step of the way.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-slate-800 rounded-lg w-fit">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-slate-900 rounded-2xl p-12 border border-slate-800">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
                title: 'Rigorous Testing',
                description: 'Every EA undergoes extensive backtesting with 5-10 years of historical data across multiple market conditions before release.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
                title: 'Proven Performance',
                description: 'Our EAs have generated consistent profits for thousands of traders worldwide with documented track records.'
              },
              {
                icon: <Award className="w-8 h-8 text-emerald-500" />,
                title: 'Expert Development',
                description: 'Built by professional traders and developers with decades of combined experience in forex and algorithmic trading.'
              },
              {
                icon: <Users className="w-8 h-8 text-emerald-500" />,
                title: 'Active Community',
                description: 'Join a thriving community of traders sharing strategies, tips, and success stories in our exclusive forums.'
              }
            ].map((reason, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 p-3 bg-slate-800 rounded-lg h-fit">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-950 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">Our Commitment</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              We're committed to continuous improvement and innovation. Every EA receives regular updates based on market conditions and user feedback. When you buy from us, you're not just getting a product – you're joining a partnership for long-term trading success.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {[
                { value: '10,000+', label: 'Active Users' },
                { value: '99%', label: 'Satisfaction Rate' },
                { value: '24/7', label: 'Support Available' },
                { value: '5+ Years', label: 'In Business' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
