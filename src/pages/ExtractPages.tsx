import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfPageExtractor } from '@/components/tools/PdfPageExtractor';
import { Shield, Zap, Check, Scissors, FileText, BookOpen } from 'lucide-react';

const ExtractPages: React.FC = () => {
    return (
        <PageLayout
            title="Extract PDF Pages Online Free - Split PDF Documents"
            description="Free PDF page extractor - select and extract specific pages from any PDF to create a new document. Remove unwanted pages, split PDFs, extract chapters. No signup, 100% private, works in browser."
            keywords="extract pdf pages, split pdf, pdf page extractor, remove pages from pdf, pdf splitter free, extract pages from pdf online, delete pdf pages, separate pdf pages, pdf page remover, split pdf online free"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Extract PDF Pages - Free & Secure
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Select specific pages from your PDF to create a new document.
                        Perfect for extracting chapters, removing unwanted pages, or splitting documents.
                    </p>
                </div>

                <PdfPageExtractor />

                {/* How to use */}
                <div className="mt-12 p-6 rounded-xl bg-muted/50">
                    <h2 className="text-xl font-semibold mb-4">How to Extract Pages</h2>
                    <ol className="space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">1</span>
                            <span>Upload your PDF file</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">2</span>
                            <span>Click pages to select/deselect or use range input (e.g., "1-5, 8, 10-12")</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">3</span>
                            <span>Click "Extract Pages" to download selected pages as a new PDF</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Why Use Our PDF Page Extractor?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-3">
                                <Scissors className="w-5 h-5 text-pink-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Visual Page Selection</h3>
                            <p className="text-sm text-muted-foreground">
                                See thumbnails of all pages and click to select exactly which ones you want. No guessing page numbers.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                                <Shield className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="font-semibold mb-2">100% Private</h3>
                            <p className="text-sm text-muted-foreground">
                                Your PDFs are processed entirely in your browser. Files never leave your device. Perfect for sensitive documents.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                                <BookOpen className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Range Selection</h3>
                            <p className="text-sm text-muted-foreground">
                                Use page ranges like "1-5, 8, 10-12" for quick selection. Great for extracting specific chapters or sections.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                                <Zap className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Instant Results</h3>
                            <p className="text-sm text-muted-foreground">
                                No waiting for uploads. Extract pages from large PDFs in seconds, directly in your browser.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use cases */}
                <div className="mt-12 p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-semibold mb-4">Popular Uses for Page Extraction</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                            <h3 className="font-semibold mb-2">📚 Extract Chapters</h3>
                            <p className="text-sm text-muted-foreground">
                                Pull out specific chapters from textbooks for focused study sessions.
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                            <h3 className="font-semibold mb-2">🗑️ Remove Pages</h3>
                            <p className="text-sm text-muted-foreground">
                                Select all pages except the ones you don't need to create a clean document.
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                            <h3 className="font-semibold mb-2">📄 Split Documents</h3>
                            <p className="text-sm text-muted-foreground">
                                Divide large PDFs into smaller, more manageable files.
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                            <h3 className="font-semibold mb-2">🖨️ Print Selection</h3>
                            <p className="text-sm text-muted-foreground">
                                Extract only the pages you want to print to save paper and ink.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">How do I select specific pages?</h3>
                            <p className="text-sm text-muted-foreground">
                                You can click on individual page thumbnails to select/deselect them. Alternatively, use the page range input to specify pages like "1-5, 8, 10-15". This is great for quickly selecting large ranges of pages.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Can I remove pages instead of extracting?</h3>
                            <p className="text-sm text-muted-foreground">
                                Yes! To remove specific pages, simply select all the pages you want to keep (use "Select All" then deselect unwanted pages) and extract. The result will be a PDF without those unwanted pages.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Does extracting affect PDF quality?</h3>
                            <p className="text-sm text-muted-foreground">
                                No, extracted pages maintain their original quality. We directly copy pages from the source PDF without any re-encoding or compression. All text, images, and formatting are preserved exactly.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Is there a page limit?</h3>
                            <p className="text-sm text-muted-foreground">
                                Since processing happens in your browser, there's no server-imposed limit. You can work with PDFs of hundreds of pages. The practical limit depends on your device's memory.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Are my PDF files secure?</h3>
                            <p className="text-sm text-muted-foreground">
                                Absolutely. Your files never leave your device. All page extraction happens locally in your browser using JavaScript. We don't upload, store, or have access to your documents.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Can I reorder the extracted pages?</h3>
                            <p className="text-sm text-muted-foreground">
                                The extracted PDF keeps pages in their original order. If you need to reorder pages, first extract them, then use our <a href="/tools/merge-pdf" className="text-emerald-500 hover:underline">PDF Merger</a> to arrange them in your preferred order.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-12 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">💡 Pro Tips for Extracting Pages</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use page ranges like "1-10" for the first 10 pages or "15-" for page 15 to the end.</li>
                        <li>• Combine ranges: "1-5, 8, 12-15" extracts pages 1 through 5, page 8, and pages 12 through 15.</li>
                        <li>• Click "Select All" then deselect specific pages to quickly remove unwanted content.</li>
                        <li>• After extracting, use our <a href="/tools/compress-pdf" className="text-emerald-500 hover:underline">PDF Compressor</a> if you need a smaller file size.</li>
                        <li>• Need to combine extracted pages from multiple PDFs? Use our <a href="/tools/merge-pdf" className="text-emerald-500 hover:underline">PDF Merger</a>.</li>
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
};

export default ExtractPages;
