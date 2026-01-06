import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Blog post content data
const blogContent: Record<string, {
    title: string;
    date: string;
    readTime: string;
    category: string;
    content: React.ReactNode;
}> = {
    'how-to-print-physics-wallah-notes': {
        title: 'How to Print Physics Wallah (PW) Notes Without Wasting Ink',
        date: 'January 5, 2026',
        readTime: '5 min read',
        category: 'Tutorial',
        content: (
            <>
                <p className="text-lg text-muted-foreground mb-6">
                    Physics Wallah (PW) has become one of the most popular educational platforms for NEET and JEE preparation.
                    However, their dark-themed PDF notes can be a nightmare to print, consuming excessive ink and resulting in
                    poor readability on paper. In this guide, we'll show you how to convert PW notes for efficient printing.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">The Problem with Dark-Themed PDFs</h2>
                <p className="text-muted-foreground mb-4">
                    When you try to print a PDF with a dark background directly, your printer uses enormous amounts of ink
                    to reproduce that dark background on every page. This leads to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                    <li>Extremely high ink costs (up to 5x more ink usage)</li>
                    <li>Slower printing speeds</li>
                    <li>Poor text readability on some printers</li>
                    <li>Environmental waste</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 mt-8">Step-by-Step Solution</h2>

                <h3 className="text-xl font-medium mb-3 mt-6">Step 1: Download Your PW Notes</h3>
                <p className="text-muted-foreground mb-4">
                    First, download the PDF notes from your Physics Wallah course. Make sure you have the complete
                    lecture notes saved to your device.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">Step 2: Open Printify Notes</h3>
                <p className="text-muted-foreground mb-4">
                    Navigate to <a href="/" className="text-emerald-500 hover:underline">Printify Notes</a> in your web browser.
                    The tool works entirely in your browser, so your notes never leave your device.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">Step 3: Upload Your PDF</h3>
                <p className="text-muted-foreground mb-4">
                    Drag and drop your PW notes PDF or click to browse. The tool will process each page and display
                    them as thumbnails.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">Step 4: Adjust Settings</h3>
                <p className="text-muted-foreground mb-4">
                    For Physics Wallah notes, we recommend these settings:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                    <li><strong>Invert Colors:</strong> Enable to convert dark to light background</li>
                    <li><strong>Brightness:</strong> Increase slightly (around 10-15%)</li>
                    <li><strong>Contrast:</strong> Keep at default or slightly increase</li>
                    <li><strong>Grayscale:</strong> Optional - saves even more ink</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">Step 5: Export and Print</h3>
                <p className="text-muted-foreground mb-4">
                    Click "Export PDF" to download your print-ready notes. You can now print them normally with
                    significantly reduced ink usage.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">Pro Tips for Even More Savings</h2>
                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                    <li>Use the "2 pages per sheet" option to save paper</li>
                    <li>Enable grayscale mode for maximum ink savings (up to 60% less ink)</li>
                    <li>Exclude cover pages and blank pages before exporting</li>
                    <li>Print in draft mode for internal use notes</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 mt-8">Conclusion</h2>
                <p className="text-muted-foreground mb-4">
                    By using Printify Notes to convert your Physics Wallah notes before printing, you can save
                    significant money on ink while getting clear, readable printed materials for your NEET or JEE
                    preparation. The best part? It's completely free and your files stay private.
                </p>
            </>
        ),
    },
    'best-pdf-converters-for-students': {
        title: 'Best PDF Converters for Students in 2026: Complete Guide',
        date: 'January 3, 2026',
        readTime: '8 min read',
        category: 'Guide',
        content: (
            <>
                <p className="text-lg text-muted-foreground mb-6">
                    As a student, you deal with countless PDFs - lecture notes, research papers, textbooks, and study
                    materials. Having the right PDF tools can make a huge difference in your productivity. Here's our
                    comprehensive guide to the best PDF converters and tools for students in 2026.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">What to Look for in a Student PDF Tool</h2>
                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                    <li><strong>Free or affordable:</strong> Students are on a budget</li>
                    <li><strong>Privacy-focused:</strong> Your study materials should stay private</li>
                    <li><strong>Easy to use:</strong> No steep learning curve</li>
                    <li><strong>Works on any device:</strong> Desktop, tablet, or phone</li>
                    <li><strong>No account required:</strong> Quick access when needed</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 mt-8">Top PDF Converters for Students</h2>

                <h3 className="text-xl font-medium mb-3 mt-6">1. Printify Notes - Best for Printing Coaching Notes</h3>
                <p className="text-muted-foreground mb-4">
                    Perfect for students who need to print dark-themed lecture notes from platforms like Physics Wallah,
                    Unacademy, or Vedantu. Converts dark backgrounds to light for ink-efficient printing.
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                    <li>✅ Completely free</li>
                    <li>✅ No file uploads (100% private)</li>
                    <li>✅ Color inversion and grayscale options</li>
                    <li>✅ Multi-page layouts</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">2. Smallpdf - Best All-in-One Solution</h3>
                <p className="text-muted-foreground mb-4">
                    A versatile online tool for various PDF operations including conversion, compression, and editing.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">3. PDF24 - Best Free Desktop Tool</h3>
                <p className="text-muted-foreground mb-4">
                    A comprehensive free desktop application with many PDF manipulation features.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">Choosing the Right Tool</h2>
                <p className="text-muted-foreground mb-4">
                    The best tool depends on your specific needs. For printing coaching notes with dark backgrounds,
                    Printify Notes is the clear choice. For general PDF manipulation, consider Smallpdf or PDF24.
                </p>
            </>
        ),
    },
    'save-ink-printing-tips': {
        title: '10 Tips to Save Ink When Printing Study Notes',
        date: 'January 1, 2026',
        readTime: '6 min read',
        category: 'Tips',
        content: (
            <>
                <p className="text-lg text-muted-foreground mb-6">
                    Printer ink is expensive, and students often need to print hundreds of pages of study material.
                    Here are 10 proven tips to significantly reduce your ink usage without sacrificing readability.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">1. Convert Dark PDFs to Light</h2>
                <p className="text-muted-foreground mb-4">
                    Dark backgrounds consume up to 5 times more ink. Use tools like Printify Notes to invert colors
                    before printing.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">2. Print in Grayscale</h2>
                <p className="text-muted-foreground mb-4">
                    Color ink is more expensive than black. Unless color is essential, always print in grayscale.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">3. Use Draft Mode</h2>
                <p className="text-muted-foreground mb-4">
                    Most printers have a draft or economy mode that uses less ink. Perfect for personal study notes.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">4. Print Multiple Pages Per Sheet</h2>
                <p className="text-muted-foreground mb-4">
                    Printing 2 or 4 pages per sheet reduces both paper and ink usage significantly.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">5. Choose Ink-Efficient Fonts</h2>
                <p className="text-muted-foreground mb-4">
                    Some fonts use less ink than others. Garamond, Century Gothic, and Times New Roman are efficient choices.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">6. Remove Unnecessary Images</h2>
                <p className="text-muted-foreground mb-4">
                    Images consume a lot of ink. If they're not essential, consider removing them before printing.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">7. Avoid Printing Headers/Footers</h2>
                <p className="text-muted-foreground mb-4">
                    Unnecessary headers, footers, and page numbers add up over hundreds of pages.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">8. Preview Before Printing</h2>
                <p className="text-muted-foreground mb-4">
                    Always preview to avoid printing unwanted pages or incorrect settings.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">9. Keep Your Printer Maintained</h2>
                <p className="text-muted-foreground mb-4">
                    Regular nozzle cleaning and proper maintenance ensures efficient ink usage.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-8">10. Consider Duplex Printing</h2>
                <p className="text-muted-foreground mb-4">
                    While this saves paper more than ink, it reduces overall printing costs.
                </p>
            </>
        ),
    },
};

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

    return (
        <PageLayout title={post.title}>
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium">
                    {post.category}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                </span>
            </div>

            {/* Article content */}
            <article className="mb-12">
                {post.content}
            </article>

            {/* Share/Save buttons */}
            <div className="flex items-center gap-4 py-6 border-t border-border">
                <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
                <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                </Button>
            </div>

            {/* Back to blog */}
            <div className="mt-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-500 hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all articles
                </Link>
            </div>
        </PageLayout>
    );
};

export default BlogPost;
