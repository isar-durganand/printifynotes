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
                <p className="text-muted-foreground mb-8">
                    Sorry, the article you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/blog">
                    <Button>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Button>
                </Link>
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
            <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--accent-highlight))] to-[hsl(var(--accent-highlight)/0.8)] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold" aria-hidden="true">DI</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Durganand Ishar</p>
                    <p className="text-xs text-muted-foreground">BTech CSE Student, MRIIRS · Creator of Printify Notes</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--accent-highlight))]/10 text-[hsl(var(--accent-highlight))] font-medium">
                        {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                    </span>
                </div>
            </div>

            {/* Article content */}
            <article className="mb-12">
                {post.content}
            </article>

            {/* Author Bio */}
            <AuthorBio publishDate={post.date} updateDate="August 19, 2026" />

            {/* Share/Save buttons */}
            <div className="flex items-center gap-4 py-6 mt-8 border-t border-border">
                <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
                <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                </Button>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
                <section className="mt-12 pt-8 border-t border-border">
                    <h2 className="text-xl font-semibold mb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {relatedPosts.map((related: any) => (
                            <Link
                                key={related.slug}
                                to={`/blog/${related.slug}`}
                                className="block p-4 rounded-xl bg-card border border-border hover:border-[hsl(var(--accent-highlight))]/50 transition-colors group"
                            >
                                <span className="text-xs text-[hsl(var(--accent-highlight))] font-medium mb-2 block">{related.category}</span>
                                <h3 className="text-sm font-semibold mb-2 group-hover:text-[hsl(var(--accent-highlight))] transition-colors line-clamp-2">
                                    {related.title}
                                </h3>
                                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />
                                    {related.readTime}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Back to blog */}
            <div className="mt-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-[hsl(var(--accent-highlight))] hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all articles
                </Link>
            </div>
        </PageLayout>
    );
};

export default BlogPost;
