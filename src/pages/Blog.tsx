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
        <PageLayout title="Blog">
            <section className="mb-12">
                <p className="text-lg text-muted-foreground mb-8">
                    Tips, tutorials, and guides to help you print study materials efficiently.
                    Learn how to save ink, convert dark PDFs, and optimize your printing workflow.
                </p>
            </section>

            {/* Featured Post */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-6">Featured Article</h2>
                <Link
                    to={`/blog/${blogPosts[0].slug}`}
                    className="block p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-colors group"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4">
                        {blogPosts[0].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-500 transition-colors">
                        {blogPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {blogPosts[0].date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {blogPosts[0].readTime}
                        </span>
                    </div>
                </Link>
            </section>

            {/* All Posts */}
            <section>
                <h2 className="text-xl font-semibold mb-6">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.slice(1).map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="block p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-colors group"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Tag className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm text-emerald-500">{post.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 group-hover:text-emerald-500 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                                <span className="flex items-center gap-1 text-emerald-500 group-hover:gap-2 transition-all">
                                    Read <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="mt-16 p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Get the latest tips, tutorials, and updates about PDF conversion and printing
                    delivered directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                    <button className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
                        Subscribe
                    </button>
                </div>
            </section>
        </PageLayout>
    );
};

export default Blog;
