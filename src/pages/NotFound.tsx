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
    { name: "Merge PDF", href: "/tools/merge-pdf", icon: Merge, color: "text-blue-500" },
    { name: "Compress PDF", href: "/tools/compress-pdf", icon: Gauge, color: "text-orange-500" },
    { name: "Image to PDF", href: "/tools/image-to-pdf", icon: Image, color: "text-purple-500" },
    { name: "Extract Pages", href: "/tools/extract-pages", icon: Scissors, color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-xl bg-emerald-500">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-extrabold text-emerald-500 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track with our free PDF tools.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link to="/">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 gap-2">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
          <Link to="/tools">
            <Button size="lg" variant="outline" className="gap-2">
              <Wrench className="w-4 h-4" />
              View All Tools
            </Button>
          </Link>
        </div>

        {/* Popular Tools */}
        <div className="border-t border-border pt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Or try one of our popular tools:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="p-4 rounded-xl border bg-card hover:border-emerald-500/50 transition-colors group"
              >
                <tool.icon className={`w-6 h-6 ${tool.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                <div className="text-sm font-medium">{tool.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Helpful Info */}
        <div className="mt-12 p-6 rounded-xl bg-muted/50 text-left">
          <h3 className="font-semibold mb-3">Looking for something specific?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Dark PDF Converter:</strong> Convert dark background PDFs for printing on the <Link to="/" className="text-emerald-500 hover:underline">homepage</Link></li>
            <li>• <strong>All PDF Tools:</strong> Visit our <Link to="/tools" className="text-emerald-500 hover:underline">tools page</Link> for merge, compress, convert, and extract</li>
            <li>• <strong>Help & Guides:</strong> Check our <Link to="/blog" className="text-emerald-500 hover:underline">blog</Link> for tips and tutorials</li>
            <li>• <strong>Contact Us:</strong> Have questions? <Link to="/contact" className="text-emerald-500 hover:underline">Reach out to us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
