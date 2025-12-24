import { Link } from 'react-router-dom';
import { BookOpen, Download, Sparkles } from 'lucide-react';

const ResourcesBanner = () => {
  return (
    <Link to="/resources" className="block group">
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl mx-4 my-6 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce delay-300" style={{ animationDuration: '3s' }} />
        </div>
        
        {/* Floating icons */}
        <div className="absolute top-4 right-8 animate-bounce opacity-60" style={{ animationDuration: '2s' }}>
          <BookOpen className="w-8 h-8 text-white/40" />
        </div>
        <div className="absolute bottom-4 left-12 animate-bounce opacity-60 delay-500" style={{ animationDuration: '2.5s' }}>
          <Download className="w-6 h-6 text-white/40" />
        </div>
        <div className="absolute top-6 left-1/2 animate-pulse opacity-70">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Chia sẻ tài liệu học tập miễn phí
              </h2>
              <p className="text-white/80 mt-1 text-sm md:text-base">
                Toán, Tiếng Việt, Tiếng Anh, Lịch sử - Địa lý và nhiều hơn nữa
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
            <span className="text-white font-semibold">Khám phá ngay</span>
            <svg 
              className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-4 flex justify-center">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white font-medium text-sm">Nhấn để xem</span>
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourcesBanner;
