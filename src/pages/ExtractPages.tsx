import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfPageExtractor } from '@/components/tools/PdfPageExtractor';
import { Shield, Zap, Check, Scissors, BookOpen } from 'lucide-react';

const ExtractPages: React.FC = () => {
    return (
        <PageLayout
            title="Extract PDF Pages Online Free - Split PDF Documents"
            description="Free PDF page extractor - select and extract specific pages from any PDF to create a new document. Remove unwanted pages, split PDFs, extract chapters. No signup, 100% private, works in browser."
            keywords="extract pdf pages, split pdf, pdf page extractor, remove pages from pdf, pdf splitter free, extract pages from pdf online, delete pdf pages, separate pdf pages, pdf page remover, split pdf online free"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                        Page Extractor
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                        Extract PDF Pages - Free & Secure
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Select specific pages from your PDF to create a new document.
                        Perfect for extracting chapters, removing unwanted pages, or splitting documents.
                    </p>
                </div>

                <PdfPageExtractor />

                {/* How to use */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">How to Extract Pages</h2>
                    <ol className="space-y-3.5 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">1</span>
                            <span>Upload your PDF file</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">2</span>
                            <span>Click pages to select/deselect or use range input (e.g., "1-5, 8, 10-12")</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">3</span>
                            <span>Click "Extract Pages" to download selected pages as a new PDF</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-center text-foreground">Why Use Our PDF Page Extractor?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Scissors className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Visual Page Selection</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                See thumbnails of all pages and click to select exactly which ones you want. No guessing page numbers.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Shield className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">100% Private</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your PDFs are processed entirely in your browser. Files never leave your device. Perfect for sensitive documents.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <BookOpen className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Range Selection</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Use page ranges like "1-5, 8, 10-12" for quick selection. Great for extracting specific chapters or sections.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Zap className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Instant Results</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No waiting for uploads. Extract pages from large PDFs in seconds, directly in your browser.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use cases */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">Popular Uses for Page Extraction</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.04] hairline-border">
                            <h3 className="font-bold tracking-tight mb-1.5 text-foreground">📚 Extract Chapters</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Pull out specific chapters from textbooks for focused study sessions.
                            </p>
                        </div>
                        <div className="p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.04] hairline-border">
                            <h3 className="font-bold tracking-tight mb-1.5 text-foreground">🗑️ Remove Pages</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Select all pages except the ones you don't need to create a clean document.
                            </p>
                        </div>
                        <div className="p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.04] hairline-border">
                            <h3 className="font-bold tracking-tight mb-1.5 text-foreground">📄 Split Documents</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Divide large PDFs into smaller, more manageable files.
                            </p>
                        </div>
                        <div className="p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.04] hairline-border">
                            <h3 className="font-bold tracking-tight mb-1.5 text-foreground">🖨️ Print Selection</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Extract only the pages you want to print to save paper and ink.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground">Frequently Asked Questions</h2>
                    <div className="space-y-3.5">
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">How do I select specific pages?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                You can click on individual page thumbnails to select/deselect them. Alternatively, use the page range input to specify pages like "1-5, 8, 10-15". This is great for quickly selecting large ranges of pages.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Can I remove pages instead of extracting?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Yes! To remove specific pages, simply select all the pages you want to keep (use "Select All" then deselect unwanted pages) and extract. The result will be a PDF without those unwanted pages.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Does extracting affect PDF quality?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No, extracted pages maintain their original quality. We directly copy pages from the source PDF without any re-encoding or compression. All text, images, and formatting are preserved exactly.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Is there a page limit?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Since processing happens in your browser, there's no server-imposed limit. You can work with PDFs of hundreds of pages. The practical limit depends on your device's memory.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Are my PDF files secure?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Absolutely. Your files never leave your device. All page extraction happens locally in your browser using JavaScript. We don't upload, store, or have access to your documents.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Can I reorder the extracted pages?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                The extracted PDF keeps pages in their original order. If you need to reorder pages, first extract them, then use our <a href="/tools/merge-pdf" className="text-[#007AFF] font-medium hover:underline">PDF Merger</a> to arrange them in your preferred order.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Understanding Page Extraction */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground">When Should You Extract PDF Pages?</h2>
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <p>
                            Page extraction creates a new, smaller PDF containing only the pages you select from an original document.
                            Unlike splitting (which divides a PDF into equal parts), extraction gives you precise control over exactly
                            which pages go into your new document.
                        </p>
                        <p>
                            <strong className="text-foreground">For Students:</strong> Coaching institutes and online platforms often
                            provide entire course materials as single large PDFs. If you only need chapters 5 and 7 for tomorrow's
                            revision, extracting those specific pages saves you from carrying or printing the entire 200-page document.
                            This is especially useful during exam preparation when you want to create focused study packs.
                        </p>
                        <p>
                            <strong className="text-foreground">For Professionals:</strong> When sharing documents with clients or
                            colleagues, you often need to send only specific sections — such as the executive summary, a particular
                            table, or selected diagrams. Extracting those pages creates a clean, professional document without
                            exposing the full internal document.
                        </p>
                        <p>
                            <strong className="text-foreground">How It Works Under the Hood:</strong> Our extractor uses pdf-lib to
                            read the original PDF structure and copy only the selected page objects into a new PDF. This is a direct
                            copy operation — no re-rendering or re-encoding takes place, which means the extracted pages are
                            byte-for-byte identical to the originals in terms of quality.
                        </p>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] hairline-border border-[#007AFF]/20 bg-[#007AFF]/5 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#007AFF]">💡 Pro Tips for Extracting Pages</h2>
                    <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                        <li>• Use page ranges like "1-10" for the first 10 pages or "15-" for page 15 to the end.</li>
                        <li>• Combine ranges: "1-5, 8, 12-15" extracts pages 1 through 5, page 8, and pages 12 through 15.</li>
                        <li>• Click "Select All" then deselect specific pages to quickly remove unwanted content.</li>
                        <li>• After extracting, use our <a href="/tools/compress-pdf" className="text-[#007AFF] font-medium hover:underline">PDF Compressor</a> if you need a smaller file size.</li>
                        <li>• Need to combine extracted pages from multiple PDFs? Use our <a href="/tools/merge-pdf" className="text-[#007AFF] font-medium hover:underline">PDF Merger</a>.</li>
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
};

export default ExtractPages;
