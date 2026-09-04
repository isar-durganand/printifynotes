import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Footer } from '@/components/landing/Footer';
import { FloatingSocial } from '@/components/FloatingSocial';
import { IOSRubberBand } from '@/components/IOSRubberBand';

interface PageLayoutProps {
    title: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    noIndex?: boolean;
    schemaType?: 'Article' | 'WebPage' | 'FAQPage' | 'HowTo' | 'SoftwareApplication';
    datePublished?: string;
    dateModified?: string;
    hideDefaultTitle?: boolean;
    noProse?: boolean;
    maxWidth?: string;
    children: React.ReactNode;
}

export const PageLayout = ({
    title,
    description,
    keywords,
    ogImage,
    noIndex = false,
    schemaType = 'WebPage',
    datePublished,
    dateModified,
    hideDefaultTitle = false,
    noProse = false,
    maxWidth = 'max-w-4xl',
    children
}: PageLayoutProps) => {
    const location = useLocation();
    const fullUrl = `https://www.printifynotes.in${location.pathname}`;
    const currentDate = new Date().toISOString().split('T')[0];

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Generate SEO-optimized description
    const generateDescription = () => {
        if (description) return description;
        return `${title} - Free online PDF tools by Printify Notes. Convert dark PDFs, merge files, compress, extract pages. 100% private, no signup required. Perfect for NEET & JEE students.`;
    };

    // Generate comprehensive keywords
    const generateKeywords = () => {
        const baseKeywords = 'printify notes, free pdf tools, pdf converter, student tools, neet preparation, jee preparation';
        if (keywords) return `${keywords}, ${baseKeywords}`;
        return `${title.toLowerCase()}, ${baseKeywords}`;
    };

    // Generate breadcrumb path
    const generateBreadcrumbs = () => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [
            { position: 1, name: 'Home', item: 'https://www.printifynotes.in/' }
        ];

        let currentPath = '';
        pathParts.forEach((part, index) => {
            currentPath += `/${part}`;
            const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
            breadcrumbs.push({
                position: index + 2,
                name: index === pathParts.length - 1 ? title : name,
                item: `https://www.printifynotes.in${currentPath}`
            });
        });

        return breadcrumbs;
    };

    // Schema.org structured data
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        name: title,
        description: generateDescription(),
        url: fullUrl,
        datePublished: datePublished || '2024-01-01',
        dateModified: dateModified || currentDate,
        publisher: {
            '@type': 'Organization',
            name: 'Printify Notes',
            url: 'https://www.printifynotes.in',
            logo: 'https://www.printifynotes.in/logo.png'
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullUrl
        },
        inLanguage: 'en-IN'
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: generateBreadcrumbs().map(item => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            item: item.item
        }))
    };

    const seoDescription = generateDescription();
    const seoKeywords = generateKeywords();
    const seoImage = ogImage || 'https://www.printifynotes.in/og-image.png';

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{title} | Printify Notes - Free PDF Tools</title>
                <meta name="title" content={`${title} | Printify Notes`} />
                <meta name="description" content={seoDescription} />
                <meta name="keywords" content={seoKeywords} />
                <meta name="author" content="Printify Notes" />

                {/* Robots */}
                {noIndex ? (
                    <meta name="robots" content="noindex, nofollow" />
                ) : (
                    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
                )}

                {/* Canonical */}
                <link rel="canonical" href={fullUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={fullUrl} />
                <meta property="og:title" content={`${title} | Printify Notes`} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={seoImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={title} />
                <meta property="og:site_name" content="Printify Notes" />
                <meta property="og:locale" content="en_IN" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@printifynotes" />
                <meta name="twitter:url" content={fullUrl} />
                <meta name="twitter:title" content={`${title} | Printify Notes`} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={seoImage} />
                <meta name="twitter:image:alt" content={title} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            </Helmet>

            <IOSRubberBand>
                <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
                    <div>
                        {/* Header with improved accessibility and iOS Blur */}
                        <header className="sticky top-0 z-40 py-2 sm:py-3 px-3 sm:px-4 bg-background/80 backdrop-blur-2xl border-b border-foreground/[0.08]" role="banner">
                            <div className="max-w-4xl mx-auto">
                                <nav
                                    className="rounded-2xl px-3 sm:px-5 py-2 sm:py-2.5 bg-card/60 backdrop-blur-md border border-border/80"
                                    role="navigation"
                                    aria-label="Page navigation"
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <Link
                                            to="/"
                                            className="flex items-center gap-2.5 sm:gap-3 group ios-press active:scale-[0.96] transition-transform"
                                            aria-label="Printify Notes - Go to homepage"
                                        >
                                            <div className="p-1.5 sm:p-2 rounded-xl bg-[#007AFF] text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.05]">
                                                <FileText className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                                            </div>
                                            <div>
                                                <span className="text-base sm:text-lg font-semibold text-foreground tracking-tight">Printify Notes</span>
                                                <p className="text-xs text-muted-foreground hidden sm:block">Free PDF Tools</p>
                                            </div>
                                        </Link>
                                        <Link
                                            to="/"
                                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-all duration-200 px-3 py-2 rounded-xl hover:bg-foreground/[0.04] ios-press active:scale-[0.96]"
                                            aria-label="Go back to home page"
                                        >
                                            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                                            <span className="hidden xs:inline">Home</span>
                                        </Link>
                                    </div>
                                </nav>
                            </div>

                            {/* Breadcrumb Navigation */}
                            <nav
                                className="max-w-4xl mx-auto mt-2 px-2"
                                aria-label="Breadcrumb"
                            >
                                <ol className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
                                    {generateBreadcrumbs().map((crumb, index, arr) => (
                                        <li
                                            key={crumb.position}
                                            className="flex items-center gap-2"
                                            itemProp="itemListElement"
                                            itemScope
                                            itemType="https://schema.org/ListItem"
                                        >
                                            {index === arr.length - 1 ? (
                                                <span
                                                    className="text-foreground font-medium"
                                                    itemProp="name"
                                                >
                                                    {crumb.name}
                                                </span>
                                            ) : (
                                                <>
                                                    <Link
                                                        to={crumb.item.replace('https://www.printifynotes.in', '')}
                                                        className="hover:text-[#007AFF] transition-colors"
                                                        itemProp="item"
                                                    >
                                                        <span itemProp="name">{crumb.name}</span>
                                                    </Link>
                                                    <span aria-hidden="true">/</span>
                                                </>
                                            )}
                                            <meta itemProp="position" content={String(crumb.position)} />
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </header>

                        {/* Main Content with Schema markup */}
                        <main
                            className={`container mx-auto px-4 py-8 sm:py-12 ${maxWidth}`}
                            role="main"
                            id="main-content"
                        >
                            <article itemScope itemType={`https://schema.org/${schemaType}`}>
                                {!hideDefaultTitle && (
                                    <h1
                                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 tracking-[-0.022em] leading-tight"
                                        itemProp="headline"
                                    >
                                        {title}
                                    </h1>
                                )}
                                <meta itemProp="description" content={seoDescription} />
                                <meta itemProp="url" content={fullUrl} />
                                <div
                                    className={noProse ? "" : "prose prose-invert max-w-none prose-sm sm:prose-base"}
                                    itemProp="articleBody"
                                >
                                    {children}
                                </div>
                            </article>
                        </main>
                    </div>

                    {/* Footer */}
                    <Footer />

                    {/* Floating Social */}
                    <FloatingSocial />
                </div>
            </IOSRubberBand>
        </>
    );
};
