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
            transition-all duration-700 ease-out
            hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />

          {/* Glass overlay pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%),
                               radial-gradient(circle at 60% 80%, rgba(255,255,255,0.15) 0%, transparent 45%)`
            }} />
          </div>

          {/* Floating particles */}
          <div className="absolute top-4 left-[10%] animate-float-slow">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white/20 fill-white/10" />
          </div>
          <div className="absolute top-[30%] right-[8%] animate-float-medium" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white/25" />
          </div>
          <div className="absolute bottom-[20%] left-[5%] animate-float-slow" style={{ animationDelay: '2s' }}>
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white/15" />
          </div>
          <div className="absolute top-[60%] right-[15%] animate-float-medium" style={{ animationDelay: '0.5s' }}>
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-200/20 fill-yellow-200/10" />
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">

              {/* Left: Icon + Text */}
              <div className="flex-1 text-center lg:text-left">
                {/* Live badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 mb-4 sm:mb-5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">🎉 JEE Mains 2026 Results Out!</span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
                  Predict Your{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">Dream College</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-4 bg-white/20 rounded-sm -skew-x-3" />
                  </span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-lg mx-auto lg:mx-0 mb-4 sm:mb-5 leading-relaxed">
                  Enter your JEE Mains rank and discover which IITs, NITs, IIITs and GFTIs you can get into through JoSAA counselling. <strong className="text-white">100% Free</strong> and instant results.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-5 sm:mb-6">
                  <FeaturePill icon={TrendingUp} text="100% Accurate" />
                  <FeaturePill icon={Trophy} text="All IITs, NITs, IIITs & GFTIs" />
                  <FeaturePill icon={GraduationCap} text="Branch-wise" />
                </div>

                {/* CTA Button */}
                <div className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-orange-600 font-bold text-sm sm:text-base shadow-lg shadow-orange-900/30 group-hover:shadow-xl group-hover:shadow-orange-900/40 transition-all duration-300 group-hover:gap-4">
                  <GraduationCap className="w-5 h-5" />
                  <span>Predict My College Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Right: Visual element */}
              <div className="hidden md:flex flex-col items-center gap-3 flex-shrink-0">
                {/* College rank cards */}
                <div className="space-y-2.5 w-64 lg:w-72">
                  <RankCard
                    rank="1"
                    college="IIT Bombay"
                    branch="Computer Science"
                    color="from-yellow-200/30 to-yellow-100/10"
                    delay="0s"
                  />
                  <RankCard
                    rank="2"
                    college="IIT Delhi"
                    branch="Electrical Engineering"
                    color="from-gray-200/20 to-gray-100/10"
                    delay="0.1s"
                  />
                  <RankCard
                    rank="3"
                    college="IIT Madras"
                    branch="Mechanical Engineering"
                    color="from-amber-200/20 to-amber-100/10"
                    delay="0.2s"
                  />
                  <RankCard
                    rank="4"
                    college="NIT Trichy"
                    branch="Electronics & Comm."
                    color="from-white/15 to-white/5"
                    delay="0.3s"
                  />
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
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs sm:text-sm font-medium border border-white/10">
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
      backdrop-blur-md border border-white/20 
      transform transition-all duration-500 hover:scale-105 hover:border-white/40
      animate-fade-in
    `}
    style={{ animationDelay: delay }}
  >
    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
      #{rank}
    </div>
    <div className="min-w-0">
      <p className="text-white font-semibold text-sm truncate">{college}</p>
      <p className="text-white/65 text-xs truncate">{branch}</p>
    </div>
  </div>
);
