import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image?: string;
}

const blogPosts: BlogPost[] = [
    {
        slug: 'neet-2027-study-plan',
        title: 'How to Prepare for NEET 2027: Complete Study Plan & Free Resources',
        excerpt: 'A phase-by-phase study plan for NEET 2027 with daily schedules, subject strategies, free resources, and smart printing tips.',
        date: 'August 5, 2026',
        readTime: '14 min read',
        category: 'Study Plan',
    },
    {
        slug: 'pdf-vs-printed-notes-science',
        title: 'PDF vs Printed Notes: The Science Behind Better Exam Performance',
        excerpt: 'What does peer-reviewed research say about digital vs paper learning? Discover the encoding hypothesis, spatial memory advantage, and the optimal hybrid strategy.',
        date: 'August 2, 2026',
        readTime: '11 min read',
        category: 'Research',
    },
    {
        slug: 'choosing-paper-printing-notes',
        title: 'Complete Guide to Choosing the Right Paper for Printing Study Notes',
        excerpt: 'GSM, brightness, inkjet vs laser — learn which paper types work best for different study materials and save money with smart paper choices.',
        date: 'July 28, 2026',
        readTime: '9 min read',
        category: 'Guide',
    },
    {
        slug: 'study-effectively-with-printed-notes',
        title: 'How to Study Effectively with Printed Notes: A Complete Guide',
        excerpt: 'Research shows printed notes lead to better retention. Learn active reading methods, annotation techniques, and study schedules that work.',
        date: 'January 28, 2026',
        readTime: '8 min read',
        category: 'Study Tips',
    },
    {
        slug: 'cbse-vs-icse-notes-printing',
        title: 'CBSE vs ICSE: Which Board\'s Notes Should You Print?',
        excerpt: 'Different boards need different approaches. Learn what to print for CBSE vs ICSE and how to optimize for each.',
        date: 'January 25, 2026',
        readTime: '7 min read',
        category: 'Guide',
    },
    {
        slug: 'free-jee-preparation-resources',
        title: 'Top 10 Free Resources for JEE Preparation in 2026',
        excerpt: 'Crack JEE without expensive coaching. Discover free resources from PW, Unacademy, Khan Academy, and more.',
        date: 'January 22, 2026',
        readTime: '10 min read',
        category: 'Resources',
    },
    {
        slug: 'organize-study-materials',
        title: 'How to Organize Your Study Materials Like a Topper',
        excerpt: 'Learn the folder system, three-binder method, and weekly organization routine used by top-performing students.',
        date: 'January 18, 2026',
        readTime: '6 min read',
        category: 'Study Tips',
    },
    {
        slug: 'digital-vs-physical-notes',
        title: 'Digital vs Physical Notes: Which is Better for Learning?',
        excerpt: 'The science behind learning with printed vs digital notes. Find out when to use each for maximum retention.',
        date: 'January 15, 2026',
        readTime: '9 min read',
        category: 'Analysis',
    },
    {
        slug: 'best-printers-for-students-india',
        title: 'Best Printers for Students in India 2026: Complete Buying Guide',
        excerpt: 'Compare inkjet, ink tank, and laser printers. Save ₹50,000 over 4 years with the right choice.',
        date: 'January 12, 2026',
        readTime: '12 min read',
        category: 'Buying Guide',
    },
    {
        slug: 'print-vedantu-notes',
        title: 'How to Print Vedantu Notes: Complete Tutorial',
        excerpt: 'Step-by-step guide to download and convert Vedantu dark-themed PDFs for ink-efficient printing.',
        date: 'January 8, 2026',
        readTime: '5 min read',
        category: 'Tutorial',
    },
    {
        slug: 'reduce-eye-strain-when-studying',
        title: 'Reducing Eye Strain: When to Print vs Read Digital',
        excerpt: 'Protect your eyes during long study sessions. Learn when to switch from screen to paper for better eye health.',
        date: 'January 5, 2026',
        readTime: '7 min read',
        category: 'Health',
    },
    {
        slug: 'how-to-print-physics-wallah-notes',
        title: 'How to Print Physics Wallah (PW) Notes Without Wasting Ink',
        excerpt: 'Learn the best techniques to convert and print your PW lecture notes while saving up to 60% on ink costs. Perfect for NEET and JEE preparation.',
        date: 'January 5, 2026',
        readTime: '5 min read',
        category: 'Tutorial',
    },
    {
        slug: 'best-pdf-converters-for-students',
        title: 'Best PDF Converters for Students in 2026: Complete Guide',
        excerpt: 'Compare the top PDF conversion tools available for students. Find out which ones offer the best features for printing study materials.',
        date: 'January 3, 2026',
        readTime: '8 min read',
        category: 'Guide',
    },
    {
        slug: 'save-ink-printing-tips',
        title: '10 Tips to Save Ink When Printing Study Notes',
        excerpt: 'Maximize your ink savings with these proven techniques. From font choices to color settings, learn how to print more pages with less ink.',
        date: 'January 1, 2026',
        readTime: '6 min read',
        category: 'Tips',
    },
    {
        slug: 'convert-unacademy-slides-for-printing',
        title: 'Step-by-Step: Converting Unacademy Slides for Printing',
        excerpt: 'A complete walkthrough on how to download and convert Unacademy dark-mode slides into print-friendly PDFs using free tools.',
        date: 'December 28, 2025',
        readTime: '7 min read',
        category: 'Tutorial',
    },
    {
        slug: 'eco-friendly-printing-for-students',
        title: 'Eco-Friendly Printing: A Student\'s Guide to Sustainable Study',
        excerpt: 'Learn how to reduce your environmental impact while still having the printed materials you need for effective studying.',
        date: 'December 25, 2025',
        readTime: '5 min read',
        category: 'Sustainability',
    },
    {
        slug: 'neet-jee-notes-printing-guide',
        title: 'Ultimate Guide to Printing NEET & JEE Preparation Notes',
        excerpt: 'Everything you need to know about printing coaching notes for competitive exam preparation. Covers all major platforms.',
        date: 'December 20, 2025',
        readTime: '10 min read',
        category: 'Guide',
    },
];

const Blog = () => {
    return (
        <PageLayout
            title="Blog"
            description="Tips, tutorials, and guides for printing study materials efficiently. Learn how to print Physics Wallah notes, Unacademy slides, and save ink on coaching PDFs."
            keywords="printify notes blog, print pw notes tutorial, save ink printing, unacademy notes printing guide, neet jee study material printing"
        >
            <section className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                    Guides & Tutorials
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                    Printify Notes Blog
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Tips, tutorials, and guides to help you print study materials efficiently.
                    Learn how to save ink, convert dark PDFs, and optimize your printing workflow.
                </p>
            </section>

            {/* Featured Post */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">Featured Article</h2>
                <Link
                    to={`/blog/${blogPosts[0].slug}`}
                    className="block p-6 sm:p-8 md:p-10 rounded-[28px] bg-card hairline-border shadow-sm hover:border-[#007AFF]/40 hover:shadow-md transition-all duration-200 active:scale-[0.98] group"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide mb-4">
                        {blogPosts[0].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-[#007AFF] transition-colors text-foreground">
                        {blogPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
                        {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#007AFF]" />
                            {blogPosts[0].date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#007AFF]" />
                            {blogPosts[0].readTime}
                        </span>
                    </div>
                </Link>
            </section>

            {/* All Posts */}
            <section>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {blogPosts.slice(1).map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="block p-6 sm:p-7 rounded-[24px] bg-card hairline-border shadow-sm hover:border-[#007AFF]/40 hover:shadow-md transition-all duration-200 active:scale-[0.98] group"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="w-3.5 h-3.5 text-[#007AFF]" />
                                <span className="text-xs font-semibold text-[#007AFF]">{post.category}</span>
                            </div>
                            <h3 className="text-lg font-bold tracking-tight mb-2.5 group-hover:text-[#007AFF] transition-colors line-clamp-2 text-foreground">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                    {post.readTime}
                                </span>
                                <span className="flex items-center gap-1 text-[#007AFF] font-medium group-hover:gap-2 transition-all">
                                    Read <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Explore Tools CTA */}
            <section className="mt-16 p-8 sm:p-10 rounded-[32px] bg-[#007AFF]/5 hairline-border border-[#007AFF]/20 text-center shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-foreground">Ready to Try Our Tools?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    Put these tips into practice with our free PDF tools. Convert dark PDFs,
                    merge files, compress documents, and more — all in your browser.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/" className="px-6 py-3 rounded-[12px] bg-[#007AFF] text-white font-semibold hover:bg-[#007AFF]/90 active:scale-[0.96] transition-all shadow-md shadow-[#007AFF]/20 text-sm">
                        Try Dark PDF Converter
                    </Link>
                    <Link to="/tools" className="px-6 py-3 rounded-[12px] bg-card hairline-border text-foreground font-semibold hover:border-[#007AFF]/50 active:scale-[0.96] transition-all text-sm">
                        View All Tools
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
};

export default Blog;
