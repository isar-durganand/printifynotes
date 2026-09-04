import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { AuthorBio } from '@/components/AuthorBio';
import { Button } from '@/components/ui/button';
import { blogContent, relatedMap } from '@/data/blogContent';

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? blogContent[slug] : null;

    if (!post) {
        return (
            <PageLayout title="Article Not Found">
                <div className="text-center py-12 max-w-md mx-auto">
                    <p className="text-muted-foreground mb-6">
                        Sorry, the article you're looking for doesn't exist or has been moved.
                    </p>
                    <Link to="/blog">
                        <Button className="rounded-[12px] bg-[#007AFF] hover:bg-[#007AFF]/90 text-white active:scale-[0.96] transition-transform">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>
            </PageLayout>
        );
    }

    // Build related articles
    const relatedSlugs = slug ? (relatedMap[slug] || []) : [];
    const relatedPosts = relatedSlugs
        .map(s => blogContent[s] ? { slug: s, ...blogContent[s] } : null)
        .filter(Boolean);

    return (
        <PageLayout
            title={post.title}
            description={post.description}
            schemaType="Article"
            datePublished={post.dateISO}
            dateModified="2026-08-19"
        >
            {/* Author byline — visible at top for E-E-A-T */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8 p-4 sm:p-5 rounded-[22px] bg-card hairline-border shadow-sm">
                <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#007AFF] to-[#0051D5] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-sm font-bold tracking-tight" aria-hidden="true">DI</span>
                </div>
                <div className="flex-1 min-w-[180px]">
                    <p className="text-sm font-semibold text-foreground">Durganand Ishar</p>
                    <p className="text-xs text-muted-foreground">BTech CSE Student, MRIIRS · Creator of Printify Notes</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="px-2.5 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] font-semibold">
                        {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#007AFF]" />
                        {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#007AFF]" />
                        {post.readTime}
                    </span>
                </div>
            </div>

            {/* Article content */}
            <article className="mb-12 prose prose-neutral dark:prose-invert max-w-none">
                {post.content}
            </article>

            {/* Author Bio */}
            <AuthorBio publishDate={post.date} updateDate="August 19, 2026" />

            {/* Share/Save buttons */}
            <div className="flex items-center gap-3 py-6 mt-8 border-t border-black/[0.08] dark:border-white/[0.1]">
                <Button variant="outline" size="sm" className="rounded-[10px] active:scale-[0.96] transition-transform">
                    <Share2 className="w-4 h-4 mr-2 text-[#007AFF]" />
                    Share
                </Button>
                <Button variant="outline" size="sm" className="rounded-[10px] active:scale-[0.96] transition-transform">
                    <Bookmark className="w-4 h-4 mr-2 text-[#007AFF]" />
                    Save
                </Button>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
                <section className="mt-12 pt-8 border-t border-black/[0.08] dark:border-white/[0.1]">
                    <h2 className="text-xl font-bold tracking-tight mb-6 text-foreground">Related Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {relatedPosts.map((related: any) => (
                            <Link
                                key={related.slug}
                                to={`/blog/${related.slug}`}
                                className="block p-5 rounded-[20px] bg-card hairline-border shadow-sm hover:border-[#007AFF]/40 hover:shadow-md transition-all active:scale-[0.98] group"
                            >
                                <span className="text-xs text-[#007AFF] font-semibold mb-2 block">{related.category}</span>
                                <h3 className="text-sm font-bold tracking-tight mb-2 group-hover:text-[#007AFF] transition-colors line-clamp-2 text-foreground">
                                    {related.title}
                                </h3>
                                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    {related.readTime}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Back to blog */}
            <div className="mt-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-[#007AFF] font-medium hover:underline text-sm active:scale-[0.96] transition-transform">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all articles
                </Link>
            </div>
        </PageLayout>
    );
};

export default BlogPost;
