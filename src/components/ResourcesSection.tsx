import { BookOpen, Video, FileText, TrendingUp, Users, Lightbulb } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'webinar';
  readTime?: string;
  author?: string;
  category: string;
  featured?: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Getting Started with Expert Advisors: A Complete Guide',
    description: 'Learn the fundamentals of automated trading and how to choose the right EA for your strategy.',
    type: 'guide',
    readTime: '15 min read',
    author: 'Trading Team',
    category: 'Beginners',
    featured: true
  },
  {
    id: '2',
    title: 'Backtesting Strategies: Avoiding Common Pitfalls',
    description: 'Master the art of backtesting with real market data and avoid the most common mistakes.',
    type: 'article',
    readTime: '12 min read',
    author: 'Strategy Analyst',
    category: 'Advanced'
  },
  {
    id: '3',
    title: 'Risk Management in Automated Trading',
    description: 'Essential risk management techniques every automated trader should know.',
    type: 'video',
    readTime: '25 min watch',
    author: 'Risk Expert',
    category: 'Risk Management',
    featured: true
  },
  {
    id: '4',
    title: 'MT4 vs MT5: Which Platform is Right for You?',
    description: 'Compare the two most popular trading platforms and choose the best fit for your needs.',
    type: 'guide',
    readTime: '10 min read',
    author: 'Platform Specialist',
    category: 'Platforms'
  },
  {
    id: '5',
    title: 'Live Trading Webinar: Real Results with Our EAs',
    description: 'Watch our traders demonstrate live results and answer your burning questions.',
    type: 'webinar',
    readTime: '60 min watch',
    author: 'Expert Traders',
    category: 'Live Trading'
  },
  {
    id: '6',
    title: 'Psychology of Automated Trading',
    description: 'Understanding the mental aspects of letting algorithms do the work for you.',
    type: 'article',
    readTime: '8 min read',
    author: 'Trading Psychologist',
    category: 'Psychology'
  }
];

const categories = ['All', 'Beginners', 'Advanced', 'Risk Management', 'Platforms', 'Live Trading', 'Psychology'];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="w-5 h-5" />;
    case 'guide':
      return <BookOpen className="w-5 h-5" />;
    case 'webinar':
      return <Users className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'video':
      return 'text-red-500 bg-red-500/10';
    case 'guide':
      return 'text-blue-500 bg-blue-500/10';
    case 'webinar':
      return 'text-purple-500 bg-purple-500/10';
    default:
      return 'text-emerald-500 bg-emerald-500/10';
  }
};

export default function ResourcesSection() {
  const featuredResources = resources.filter(r => r.featured);
  const regularResources = resources.filter(r => !r.featured);

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Lightbulb className="w-4 h-4 mr-2" />
              Trading Education Center
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Master Automated Trading
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Free educational resources to help you succeed with automated trading. From beginner guides to advanced strategies.
          </p>
        </div>

        {/* Featured Resources */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredResources.map((resource) => (
              <div
                key={resource.id}
                className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </div>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {resource.title}
                  </h4>

                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>{resource.readTime}</span>
                      {resource.author && (
                        <>
                          <span>•</span>
                          <span>{resource.author}</span>
                        </>
                      )}
                    </div>

                    <button className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors group-hover:translate-x-1 transform duration-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-white"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map((resource) => (
              <div
                key={resource.id}
                className="group bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">
                    {resource.category}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {resource.title}
                </h4>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    {resource.readTime}
                  </div>
                  <button className="text-emerald-500 hover:text-emerald-400 text-sm font-semibold transition-colors">
                    Read →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20">
            <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Trading?</h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Put your knowledge into action with our proven Expert Advisors. Start with a free demo account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
                Start Free Demo
              </button>
              <button className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
                Browse Expert Advisors
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
