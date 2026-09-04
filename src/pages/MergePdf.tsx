import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfMerger } from '@/components/tools/PdfMerger';
import { FileText, Shield, Zap, Check } from 'lucide-react';

const MergePdf: React.FC = () => {
    return (
        <PageLayout
            title="Merge PDF Files Online Free - Combine Multiple PDFs"
            description="Free online PDF merger - combine multiple PDF files into one document instantly. No signup, no upload to servers. Drag and drop to reorder pages. 100% private, works in browser. Perfect for students and professionals."
            keywords="merge pdf, combine pdf, pdf merger free, merge pdf online, join pdf files, combine pdf files free, pdf combiner, merge pdf without watermark, free pdf merger india, student pdf tools"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                        PDF Merger
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                        Merge PDF Files Online - Free & Secure
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Combine multiple PDFs into a single document in seconds. Drag to reorder before merging.
                        All processing happens in your browser - files never leave your device.
                    </p>
                </div>

                <PdfMerger />

                {/* How to use */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">How to Merge PDFs</h2>
                    <ol className="space-y-3.5 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">1</span>
                            <span>Drop or select multiple PDF files</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">2</span>
                            <span>Drag to reorder files as needed</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">3</span>
                            <span>Click "Merge PDFs" to combine and download</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-center text-foreground">Why Use Our PDF Merger?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Shield className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">100% Private & Secure</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your files are processed entirely in your browser. We never upload, store, or access your documents. Your data stays on your device.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Zap className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Lightning Fast</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No server uploads means instant processing. Merge large PDF files in seconds without waiting for uploads or downloads from remote servers.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <FileText className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">No File Limits</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Unlike other online tools, we don't limit file size or number of pages. Merge as many PDFs as you need, completely free.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Check className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">No Signup Required</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Start merging immediately. No account creation, no email verification, no hidden fees. Just upload and merge your PDFs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">Common Uses for PDF Merging</h2>
                    <ul className="space-y-3.5 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Students:</strong> Combine lecture notes, assignments, and study materials into organized documents for exam preparation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Professionals:</strong> Merge contracts, reports, and presentations for client submissions or archiving.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Job Seekers:</strong> Combine resume, cover letter, and certificates into a single application document.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Teachers:</strong> Compile worksheets, lesson plans, and resources into comprehensive teaching materials.</span>
                        </li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground">Frequently Asked Questions</h2>
                    <div className="space-y-3.5">
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Is this PDF merger really free?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Yes, our PDF merger is 100% free with no hidden costs. There are no premium tiers, no watermarks on merged files, and no limits on usage. We believe quality PDF tools should be accessible to everyone.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Are my PDF files secure?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Absolutely. Your files never leave your device. All PDF processing happens locally in your browser using JavaScript. We don't have servers that receive, store, or process your documents. This is the most secure way to handle sensitive documents online.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">What is the maximum file size I can merge?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Since processing happens in your browser, the limit depends on your device's available memory. Modern computers and phones can typically handle files up to 100MB+ each. For very large files, we recommend merging in batches.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Can I reorder pages before merging?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Yes! After uploading your PDF files, you can drag and drop to reorder them before merging. This ensures your final merged document has pages in exactly the order you want.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Does merging affect PDF quality?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No, merging PDFs does not reduce quality. The original content, images, and formatting of each PDF are preserved exactly as they were. The merged file combines all pages without any compression or quality loss.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Understanding PDF Merging */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground">How Does PDF Merging Work?</h2>
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <p>
                            PDF (Portable Document Format) files are structured documents that contain pages, fonts, images, and metadata.
                            When you merge PDFs, the process involves reading the internal structure of each PDF and combining their page
                            trees into a single document while preserving all formatting, hyperlinks, and embedded resources.
                        </p>
                        <p>
                            <strong className="text-foreground">Client-Side Processing:</strong> Unlike most online PDF tools that upload
                            your files to remote servers, our merger uses <strong className="text-foreground">pdf-lib</strong>, a JavaScript
                            library that runs entirely in your browser. This means the merging happens on your device's processor — your
                            files never travel over the internet, making it both faster and more secure.
                        </p>
                        <p>
                            <strong className="text-foreground">What Gets Preserved:</strong> When merging PDFs, all original content is
                            maintained exactly as it was — text formatting, images, vector graphics, hyperlinks, form fields, and embedded
                            fonts. The merged document is a faithful combination of all source files without any quality loss or re-encoding.
                        </p>
                        <p>
                            <strong className="text-foreground">Page Order Control:</strong> Our drag-and-drop interface lets you arrange
                            files in any order before merging. This is especially useful when combining chapter-wise study materials,
                            where the correct sequence matters for effective studying. You can also remove unwanted files from the queue
                            before merging.
                        </p>
                    </div>
                </div>

                {/* Educational Content */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] hairline-border border-[#007AFF]/20 bg-[#007AFF]/5 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#007AFF]">💡 Pro Tips for Merging PDFs</h2>
                    <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                        <li>• Organize your files in the order you want before selecting them for faster merging.</li>
                        <li>• For very large documents, consider compressing individual PDFs first using our <a href="/tools/compress-pdf" className="text-[#007AFF] font-medium hover:underline">PDF Compressor</a>.</li>
                        <li>• If you only need specific pages, use our <a href="/tools/extract-pages" className="text-[#007AFF] font-medium hover:underline">PDF Page Extractor</a> first.</li>
                        <li>• The merged PDF maintains all hyperlinks, bookmarks, and interactive elements from the original files.</li>
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
};

export default MergePdf;
