import { Newspaper, Calendar, TrendingUp, BookOpen, Bell } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              Coming Soon
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">Trading Blog & Resources</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Expert insights, strategy breakdowns, EA updates, and forex education - all in one place
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-12 border border-slate-800 text-center mb-12 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-12 h-12 text-emerald-500" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Our Blog is Under Construction</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                We're working hard to bring you valuable content about forex trading, Expert Advisors,
                market analysis, and trading strategies. Stay tuned for updates!
              </p>

              <div className="inline-block bg-slate-800 rounded-lg p-6 mb-8">
                <h3 className="text-white font-semibold mb-3">What to Expect:</h3>
                <ul className="text-left space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Weekly market analysis and trading insights</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Detailed strategy breakdowns and tutorials</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Expert Advisor updates and optimization tips</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Risk management best practices</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Success stories from our community</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-emerald-950/20 to-slate-800 rounded-lg p-6 border border-emerald-500/20">
                <div className="flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-emerald-500 mr-2" />
                  <h3 className="text-xl font-semibold text-white">Get Notified</h3>
                </div>
                <p className="text-slate-400 mb-4">
                  Be the first to know when we launch our blog. Subscribe to receive updates directly to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-900 transition-all shadow-lg shadow-emerald-600/50">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
                title: 'Market Analysis',
                description: 'Expert analysis of forex market trends and opportunities'
              },
              {
                icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
                title: 'Educational Content',
                description: 'Learn trading strategies and improve your skills'
              },
              {
                icon: <Newspaper className="w-8 h-8 text-emerald-500" />,
                title: 'EA Updates',
                description: 'Latest updates and improvements to our Expert Advisors'
              }
            ].map((category, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-slate-800 rounded-lg">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-sm text-slate-400">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
