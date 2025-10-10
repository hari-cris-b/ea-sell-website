import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do Expert Advisors work?',
    answer: 'Expert Advisors (EAs) are automated trading programs that execute trades based on predefined algorithms and market conditions. Our EAs analyze multiple timeframes, use technical indicators, and implement sophisticated risk management to make trading decisions 24/7 without human intervention.',
    category: 'General'
  },
  {
    question: 'Are the backtesting results realistic?',
    answer: 'Yes, our backtesting uses historical data that includes realistic spread costs, slippage, and commission fees. We test across multiple market conditions including trending and ranging markets, high volatility periods, and various economic events to ensure robust performance.',
    category: 'Performance'
  },
  {
    question: 'What platforms do your EAs support?',
    answer: 'Our Expert Advisors are compatible with MetaTrader 4 (MT4) and MetaTrader 5 (MT5) platforms. They work with most major brokers that support these platforms. We provide detailed installation guides for both platforms.',
    category: 'Technical'
  },
  {
    question: 'How much money do I need to start?',
    answer: 'Our EAs are designed to work with various account sizes. We recommend starting with at least $500-$1000 per EA to allow for proper risk management. The EAs use percentage-based lot sizing, so they scale with your account size.',
    category: 'Getting Started'
  },
  {
    question: 'What is the refund policy?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with your purchase, contact our support team within 30 days for a full refund. No questions asked.',
    category: 'Support'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes! All purchases include lifetime support. We provide email support, detailed documentation, video tutorials, and regular updates. Pro Suite customers also get priority 24/7 support.',
    category: 'Support'
  },
  {
    question: 'Can I use multiple EAs on the same account?',
    answer: 'Yes, you can run multiple EAs on the same trading account, but we recommend monitoring for correlation and ensuring proper risk management. Each EA has different strategies to minimize overlap.',
    category: 'Technical'
  },
  {
    question: 'How often are the EAs updated?',
    answer: 'We regularly update our EAs based on market conditions and new data. Updates are free for all customers and may include performance improvements, new features, or bug fixes. Major updates are announced via email.',
    category: 'Updates'
  },
  {
    question: 'What are the system requirements?',
    answer: 'Our EAs require a computer running Windows, macOS, or Linux with MetaTrader platform installed. For 24/7 operation, we recommend using a VPS (Virtual Private Server). Minimum requirements: 2GB RAM, stable internet connection.',
    category: 'Technical'
  },
  {
    question: 'Can I customize the EA settings?',
    answer: 'EA Bundle and Pro Suite customers have access to customizable settings. You can adjust risk levels, trading hours, lot sizes, and other parameters. Single EA purchases have optimized default settings that work well for most traders.',
    category: 'Customization'
  },
  {
    question: 'Is there a trial version available?',
    answer: 'We offer demo accounts for testing our EAs. Contact our support team to request demo access. You can test the EAs on demo accounts before purchasing to ensure they fit your trading style.',
    category: 'Getting Started'
  },
  {
    question: 'What happens during market news events?',
    answer: 'Our EAs include news filters that can pause trading during high-impact news events to avoid increased volatility and slippage. You can customize which news events to filter and the pause duration.',
    category: 'Risk Management'
  }
];

const categories = ['All', 'General', 'Performance', 'Technical', 'Getting Started', 'Support', 'Updates', 'Customization', 'Risk Management'];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = selectedCategory === 'All'
    ? faqData
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <HelpCircle className="w-4 h-4 mr-2" />
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about our Expert Advisors and trading solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-750 transition-colors"
              >
                <span className="text-white font-semibold pr-4">{faq.question}</span>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-4 border-t border-slate-700">
                  <p className="text-slate-300 leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl p-8 border border-emerald-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-slate-400 mb-6">
              Our expert support team is here to help you succeed with automated trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
