import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Upload, Sliders, Download, FileText, Palette, LayoutGrid, HelpCircle } from 'lucide-react';

const Documentation = () => {
    return (
        <PageLayout
            title="Documentation"
            description="Complete guide to using Printify Notes. Learn how to convert dark PDF notes to print-friendly format, adjust settings, and export documents."
            keywords="printify notes documentation, pdf converter guide, how to convert dark pdf, print coaching notes tutorial"
        >
            <section className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                    User Guide
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                    Documentation
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Welcome to the Printify Notes documentation. Learn how to use our tool effectively to convert
                    your dark-background PDFs into print-ready documents.
                </p>
            </section>

            {/* Quick Start */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">Quick Start Guide</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <div className="w-10 h-10 rounded-[12px] bg-[#007AFF] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-md shadow-[#007AFF]/20">
                            1
                        </div>
                        <div>
                            <h3 className="font-bold tracking-tight mb-1.5 flex items-center gap-2 text-foreground">
                                <Upload className="w-4 h-4 text-[#007AFF]" />
                                Upload Your PDF
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Drag and drop your PDF file or click to browse. We support all standard PDF files.
                                Your file is processed entirely in your browser - nothing is uploaded to our servers.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <div className="w-10 h-10 rounded-[12px] bg-[#007AFF] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-md shadow-[#007AFF]/20">
                            2
                        </div>
                        <div>
                            <h3 className="font-bold tracking-tight mb-1.5 flex items-center gap-2 text-foreground">
                                <Sliders className="w-4 h-4 text-[#007AFF]" />
                                Adjust Settings
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Use the transformation controls to customize your output. Enable color inversion,
                                adjust brightness and contrast, or convert to grayscale.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <div className="w-10 h-10 rounded-[12px] bg-[#007AFF] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-md shadow-[#007AFF]/20">
                            3
                        </div>
                        <div>
                            <h3 className="font-bold tracking-tight mb-1.5 flex items-center gap-2 text-foreground">
                                <Download className="w-4 h-4 text-[#007AFF]" />
                                Export & Print
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Preview your pages, select the ones you need, and click Export PDF to download
                                your print-ready document.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
                            <Palette className="w-5 h-5 text-[#007AFF]" />
                            Color Inversion
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Converts dark backgrounds to light, making PDFs suitable for printing. This feature
                            automatically inverts all colors while preserving readability.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Best for:</strong> Dark-themed lecture notes, code screenshots, presentations
                        </p>
                    </div>

                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
                            <FileText className="w-5 h-5 text-[#007AFF]" />
                            Grayscale Mode
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Removes all colors and converts to black and white. This saves the most ink when
                            printing and is ideal for text-heavy documents.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Best for:</strong> Study notes, reading materials, draft printing
                        </p>
                    </div>

                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
                            <Sliders className="w-5 h-5 text-[#007AFF]" />
                            Brightness & Contrast
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Fine-tune the output by adjusting brightness and contrast. Useful for optimizing
                            readability after color inversion.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Tip:</strong> Increase brightness by 10-15% after inverting colors
                        </p>
                    </div>

                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
                            <LayoutGrid className="w-5 h-5 text-[#007AFF]" />
                            Multi-Page Layouts
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Combine 2, 3, or 4 pages onto a single sheet. Great for creating handouts or
                            reducing paper usage.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Options:</strong> Portrait or landscape orientation
                        </p>
                    </div>
                </div>
            </section>

            {/* Supported Platforms */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4 text-foreground">Supported Platforms</h2>
                <p className="text-muted-foreground mb-4 text-sm">
                    Printify Notes works with PDF notes from all major educational platforms:
                </p>
                <div className="flex flex-wrap gap-2.5 mb-6">
                    {['Physics Wallah', 'Unacademy', 'Vedantu', 'BYJU\'S', 'Allen Digital', 'Aakash',
                        'Motion', 'Competishun', 'Etoos', 'NPTEL', 'Coursera', 'Khan Academy'].map((platform) => (
                            <span
                                key={platform}
                                className="px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-xs font-medium text-foreground hairline-border shadow-none"
                            >
                                {platform}
                            </span>
                        ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 flex items-center gap-2 text-foreground">
                    <HelpCircle className="w-5 h-5 text-[#007AFF]" />
                    Common Questions
                </h2>

                <div className="space-y-3.5">
                    <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                        <h3 className="font-bold tracking-tight mb-2 text-foreground">Is my data safe?</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Yes! All processing happens in your browser. Your PDFs never leave your device and
                            are never uploaded to any server.
                        </p>
                    </div>

                    <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                        <h3 className="font-bold tracking-tight mb-2 text-foreground">What file size limit is there?</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            There's no hard limit, but larger files may take longer to process depending on your
                            device's capabilities. We recommend files under 50MB for optimal performance.
                        </p>
                    </div>

                    <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                        <h3 className="font-bold tracking-tight mb-2 text-foreground">Which browsers are supported?</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Printify Notes works on all modern browsers including Chrome, Firefox, Safari, and Edge.
                            For best results, use the latest version of your browser.
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-muted-foreground text-sm">
                    Have more questions? Check our <Link to="/#faq" className="text-[#007AFF] font-medium hover:underline">FAQ section</Link> or{' '}
                    <Link to="/contact" className="text-[#007AFF] font-medium hover:underline">contact us</Link>.
                </p>
            </section>
        </PageLayout>
    );
};

export default Documentation;
