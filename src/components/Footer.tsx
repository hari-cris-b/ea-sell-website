import { TrendingUp, Mail, MessageCircle, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-emerald-500" />
              <span className="ml-2 text-xl font-bold text-white">OPTIVEXY INTELLIGENCE</span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Professional Forex Expert Advisors designed by algorithmic trading experts.
              Automate your trading with proven, backtested strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">Expert Advisors</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">Installation Guide</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} OPTIVEXY INTELLIGENCE. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-emerald-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-500 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
