import { Github, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-gray-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Responsive Grid System */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          
          {/* Logo Section - Mobile: Center, Desktop: Left */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white transition-all hover:text-cyan-400 cursor-pointer">
              MY BRAND
            </h2>
            <p className="text-sm mt-2 max-w-xs">Building the future of web, one component at a time.</p>
          </div>

          {/* Social Icons - Mobile: Center, Desktop: Right */}
          <div className="flex gap-6">
            <Github className="hover:text-white transition-transform hover:-translate-y-1 cursor-pointer" size={20} />
            <Instagram className="hover:text-pink-500 transition-transform hover:-translate-y-1 cursor-pointer" size={20} />
            <Twitter className="hover:text-sky-400 transition-transform hover:-translate-y-1 cursor-pointer" size={20} />
            <Linkedin className="hover:text-blue-600 transition-transform hover:-translate-y-1 cursor-pointer" size={20} />
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Section - Stacked on Mobile, Row on Desktop */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest gap-4">
          
          <p className="order-2 md:order-1">
            &copy; {new Date().getFullYear()} My Company. All rights reserved.
          </p>

          <div className="flex items-center gap-1 order-1 md:order-2">
            Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> in India
          </div>

          <div className="flex gap-6 order-3">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;