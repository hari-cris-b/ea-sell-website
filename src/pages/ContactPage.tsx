import { Mail, MessageCircle, Clock, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Have questions? We're here to help you succeed with our Expert Advisors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {submitSuccess && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-4 flex items-center">
                <Send className="w-5 h-5 text-emerald-500 mr-3" />
                <p className="text-emerald-400">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us about your inquiry..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-900 transition-all shadow-lg shadow-emerald-600/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-500/10 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                  <p className="text-slate-400 text-sm mb-2">Our support team is ready to help</p>
                  <a href="mailto:support@forexeapro.com" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                    support@forexeapro.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-500/10 rounded-lg mr-4">
                  <MessageCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
                  <p className="text-slate-400 text-sm mb-2">Chat with us on Telegram</p>
                  <a href="#" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                    @ForexEAPro
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-500/10 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
                  <p className="text-slate-400 text-sm mb-2">We typically respond within</p>
                  <p className="text-emerald-500 font-semibold">24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-500/10 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Global Support</h3>
                  <p className="text-slate-400 text-sm">Serving traders worldwide from multiple time zones</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/20 to-slate-900 rounded-xl p-6 border border-emerald-500/20">
              <h3 className="text-lg font-semibold text-white mb-3">Need Instant Help?</h3>
              <p className="text-slate-400 text-sm mb-4">
                Check our FAQ section for quick answers to common questions about installation, usage, and troubleshooting.
              </p>
              <button className="w-full px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg font-medium transition-colors border border-emerald-500/30">
                View FAQ
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-slate-900 rounded-xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Common Inquiries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Pre-Sales Questions',
                description: 'Learn about EA features, pricing, and which product suits your trading style.'
              },
              {
                title: 'Technical Support',
                description: 'Get help with installation, configuration, and troubleshooting issues.'
              },
              {
                title: 'Partnership Inquiries',
                description: 'Interested in becoming an affiliate or collaborating with us? Let\'s talk.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
