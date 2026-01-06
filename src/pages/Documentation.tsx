import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Upload, Sliders, Download, FileText, Palette, LayoutGrid, HelpCircle } from 'lucide-react';

const Documentation = () => {
    return (
        <PageLayout title="Documentation">
            <section className="mb-12">
                <p className="text-lg text-muted-foreground mb-6">
                    Welcome to the Printify Notes documentation. Learn how to use our tool effectively to convert
                    your dark-background PDFs into print-ready documents.
                </p>
            </section>

            {/* Quick Start */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Quick Start Guide</h2>
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                            1
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Upload className="w-4 h-4 text-emerald-500" />
                                Upload Your PDF
                            </h3>
                            <p className="text-muted-foreground">
                                Drag and drop your PDF file or click to browse. We support all standard PDF files.
                                Your file is processed entirely in your browser - nothing is uploaded to our servers.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                            2
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Sliders className="w-4 h-4 text-emerald-500" />
                                Adjust Settings
                            </h3>
                            <p className="text-muted-foreground">
                                Use the transformation controls to customize your output. Enable color inversion,
                                adjust brightness and contrast, or convert to grayscale.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                            3
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Download className="w-4 h-4 text-emerald-500" />
                                Export & Print
                            </h3>
                            <p className="text-muted-foreground">
                                Preview your pages, select the ones you need, and click Export PDF to download
                                your print-ready document.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-emerald-500" />
                            Color Inversion
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Converts dark backgrounds to light, making PDFs suitable for printing. This feature
                            automatically inverts all colors while preserving readability.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <strong>Best for:</strong> Dark-themed lecture notes, code screenshots, presentations
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-500" />
                            Grayscale Mode
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Removes all colors and converts to black and white. This saves the most ink when
                            printing and is ideal for text-heavy documents.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <strong>Best for:</strong> Study notes, reading materials, draft printing
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Sliders className="w-5 h-5 text-emerald-500" />
                            Brightness & Contrast
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Fine-tune the output by adjusting brightness and contrast. Useful for optimizing
                            readability after color inversion.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <strong>Tip:</strong> Increase brightness by 10-15% after inverting colors
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <LayoutGrid className="w-5 h-5 text-emerald-500" />
                            Multi-Page Layouts
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Combine 2, 3, or 4 pages onto a single sheet. Great for creating handouts or
                            reducing paper usage.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <strong>Options:</strong> Portrait or landscape orientation
                        </p>
                    </div>
                </div>
            </section>

            {/* Supported Platforms */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Supported Platforms</h2>
                <p className="text-muted-foreground mb-4">
                    Printify Notes works with PDF notes from all major educational platforms:
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                    {['Physics Wallah', 'Unacademy', 'Vedantu', 'BYJU\'S', 'Allen Digital', 'Aakash',
                        'Motion', 'Competishun', 'Etoos', 'NPTEL', 'Coursera', 'Khan Academy'].map((platform) => (
                            <span
                                key={platform}
                                className="px-4 py-2 rounded-full bg-secondary text-muted-foreground"
                            >
                                {platform}
                            </span>
                        ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-emerald-500" />
                    Common Questions
                </h2>

                <div className="space-y-4">
                    <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-semibold mb-2">Is my data safe?</h3>
                        <p className="text-muted-foreground">
                            Yes! All processing happens in your browser. Your PDFs never leave your device and
                            are never uploaded to any server.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-semibold mb-2">What file size limit is there?</h3>
                        <p className="text-muted-foreground">
                            There's no hard limit, but larger files may take longer to process depending on your
                            device's capabilities. We recommend files under 50MB for optimal performance.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-semibold mb-2">Which browsers are supported?</h3>
                        <p className="text-muted-foreground">
                            Printify Notes works on all modern browsers including Chrome, Firefox, Safari, and Edge.
                            For best results, use the latest version of your browser.
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-muted-foreground">
                    Have more questions? Check our <Link to="/#faq" className="text-emerald-500 hover:underline">FAQ section</Link> or{' '}
                    <Link to="/contact" className="text-emerald-500 hover:underline">contact us</Link>.
                </p>
            </section>
        </PageLayout>
    );
};

export default Documentation;
