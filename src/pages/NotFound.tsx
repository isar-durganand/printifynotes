import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FileText, Home, Wrench, Merge, Image, Gauge, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const tools = [
    { name: "Merge PDF", href: "/tools/merge-pdf", icon: Merge, color: "text-[#007AFF]" },
    { name: "Compress PDF", href: "/tools/compress-pdf", icon: Gauge, color: "text-amber-500" },
    { name: "Image to PDF", href: "/tools/image-to-pdf", icon: Image, color: "text-purple-500" },
    { name: "Extract Pages", href: "/tools/extract-pages", icon: Scissors, color: "text-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-xl w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-3.5 rounded-[18px] bg-[#007AFF] shadow-md shadow-[#007AFF]/20">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl sm:text-9xl font-black text-[#007AFF] mb-2 tracking-tighter">404</h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track with our free PDF tools.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link to="/">
            <Button size="lg" className="rounded-[12px] bg-[#007AFF] hover:bg-[#007AFF]/90 text-white font-semibold gap-2 shadow-md shadow-[#007AFF]/20 active:scale-[0.96] transition-transform">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
          <Link to="/tools">
            <Button size="lg" variant="outline" className="rounded-[12px] font-semibold gap-2 active:scale-[0.96] transition-transform">
              <Wrench className="w-4 h-4" />
              View All Tools
            </Button>
          </Link>
        </div>

        {/* Popular Tools */}
        <div className="border-t border-black/[0.08] dark:border-white/[0.1] pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Or try one of our popular tools:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="p-4 rounded-[20px] bg-white dark:bg-[#1C1C1E] hairline-border shadow-sm hover:border-[#007AFF]/50 hover:shadow-md transition-all duration-150 active:scale-[0.96] group"
              >
                <tool.icon className={`w-6 h-6 ${tool.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                <div className="text-xs font-bold text-foreground">{tool.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Helpful Info */}
        <div className="mt-10 p-6 rounded-[24px] bg-white dark:bg-[#1C1C1E] hairline-border text-left shadow-sm">
          <h3 className="font-bold tracking-tight text-sm text-foreground mb-3">Looking for something specific?</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <li>• <strong className="text-foreground">Dark PDF Converter:</strong> Convert dark background PDFs for printing on the <Link to="/" className="text-[#007AFF] font-medium hover:underline">homepage</Link></li>
            <li>• <strong className="text-foreground">All PDF Tools:</strong> Visit our <Link to="/tools" className="text-[#007AFF] font-medium hover:underline">tools page</Link> for merge, compress, convert, and extract</li>
            <li>• <strong className="text-foreground">Help & Guides:</strong> Check our <Link to="/blog" className="text-[#007AFF] font-medium hover:underline">blog</Link> for tips and tutorials</li>
            <li>• <strong className="text-foreground">Contact Us:</strong> Have questions? <Link to="/contact" className="text-[#007AFF] font-medium hover:underline">Reach out to us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
