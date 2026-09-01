import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight, Sparkles, Trophy, TrendingUp, Star } from 'lucide-react';

export const JeeCollegeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <a
          href="https://josaacollegepredictor.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          id="jee-college-predictor-banner"
          className={`
            group relative block rounded-2xl sm:rounded-3xl overflow-hidden
            transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            hover:scale-[1.01] hover:shadow-[0_24px_80px_rgba(234,88,12,0.25)]
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />

          {/* Glass overlay */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%),
                               radial-gradient(circle at 60% 80%, rgba(255,255,255,0.15) 0%, transparent 45%)`
            }} />
          </div>

          {/* Floating particles */}
          <div className="absolute top-4 left-[10%] animate-liquid-float">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white/15 fill-white/5" />
          </div>
          <div className="absolute top-[30%] right-[8%] animate-float-medium" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white/20" />
          </div>
          <div className="absolute bottom-[20%] left-[5%] animate-float-slow" style={{ animationDelay: '2s' }}>
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white/10" />
          </div>
          <div className="absolute top-[60%] right-[15%] animate-liquid-float" style={{ animationDelay: '0.5s' }}>
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-200/15 fill-yellow-200/5" />
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">

              {/* Left: Icon + Text */}
              <div className="flex-1 text-center lg:text-left">
                {/* Live badge — glass pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/[0.15] mb-4 sm:mb-5 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">🎉 JEE Mains 2026 Results Out!</span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
                  Predict Your{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">Dream College</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-4 bg-white/[0.15] rounded-sm -skew-x-3" />
                  </span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-lg mx-auto lg:mx-0 mb-4 sm:mb-5 leading-relaxed">
                  Enter your JEE Mains rank and discover which IITs, NITs, IIITs and GFTIs you can get into through JoSAA counselling. <strong className="text-white">100% Free</strong> and instant results.
                </p>

                {/* Feature pills — glass styled */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-5 sm:mb-6">
                  <FeaturePill icon={TrendingUp} text="100% Accurate" />
                  <FeaturePill icon={Trophy} text="All IITs, NITs, IIITs & GFTIs" />
                  <FeaturePill icon={GraduationCap} text="Branch-wise" />
                </div>

                {/* CTA Button — glass styled */}
                <div className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/90 backdrop-blur-sm text-orange-600 font-bold text-sm sm:text-base shadow-[0_8px_32px_rgba(0,0,0,0.15)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:gap-4 group-hover:bg-white">
                  <GraduationCap className="w-5 h-5" />
                  <span>Predict My College Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Right: Visual element */}
              <div className="hidden md:flex flex-col items-center gap-3 flex-shrink-0">
                {/* College rank cards — liquid glass */}
                <div className="space-y-2.5 w-64 lg:w-72">
                  <RankCard rank="1" college="IIT Bombay" branch="Computer Science" color="from-yellow-200/20 to-yellow-100/5" delay="0s" />
                  <RankCard rank="2" college="IIT Delhi" branch="Electrical Engineering" color="from-gray-200/15 to-gray-100/5" delay="0.1s" />
                  <RankCard rank="3" college="IIT Madras" branch="Mechanical Engineering" color="from-amber-200/15 to-amber-100/5" delay="0.2s" />
                  <RankCard rank="4" college="NIT Trichy" branch="Electronics & Comm." color="from-white/10 to-white/[0.03]" delay="0.3s" />
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

const FeaturePill = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.1] backdrop-blur-md text-white/90 text-xs sm:text-sm font-medium border border-white/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
    <Icon className="w-3.5 h-3.5" />
    {text}
  </span>
);

const RankCard = ({
  rank,
  college,
  branch,
  color,
  delay,
}: {
  rank: string;
  college: string;
  branch: string;
  color: string;
  delay: string;
}) => (
  <div
    className={`
      flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${color}
      backdrop-blur-md border border-white/[0.12]
      transform transition-all duration-500 hover:scale-[1.03] hover:border-white/25
      animate-fade-in shadow-[0_4px_16px_rgba(0,0,0,0.1)]
    `}
    style={{ animationDelay: delay }}
  >
    <div className="w-8 h-8 rounded-lg bg-white/[0.15] backdrop-blur-sm flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
      #{rank}
    </div>
    <div className="min-w-0">
      <p className="text-white font-semibold text-sm truncate">{college}</p>
      <p className="text-white/60 text-xs truncate">{branch}</p>
    </div>
  </div>
);
