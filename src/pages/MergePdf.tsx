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
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Merge PDF Files Online - Free & Secure
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Combine multiple PDFs into a single document in seconds. Drag to reorder before merging.
                        All processing happens in your browser - files never leave your device.
                    </p>
                </div>

                <PdfMerger />

                {/* How to use */}
                <div className="mt-12 p-6 rounded-xl bg-muted/50">
                    <h2 className="text-xl font-semibold mb-4">How to Merge PDFs</h2>
                    <ol className="space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">1</span>
                            <span>Drop or select multiple PDF files</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">2</span>
                            <span>Drag to reorder files as needed</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">3</span>
                            <span>Click "Merge PDFs" to combine and download</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Why Use Our PDF Merger?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                                <Shield className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="font-semibold mb-2">100% Private & Secure</h3>
                            <p className="text-sm text-muted-foreground">
                                Your files are processed entirely in your browser. We never upload, store, or access your documents. Your data stays on your device.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                                <Zap className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Lightning Fast</h3>
                            <p className="text-sm text-muted-foreground">
                                No server uploads means instant processing. Merge large PDF files in seconds without waiting for uploads or downloads from remote servers.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                                <FileText className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="font-semibold mb-2">No File Limits</h3>
                            <p className="text-sm text-muted-foreground">
                                Unlike other online tools, we don't limit file size or number of pages. Merge as many PDFs as you need, completely free.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                                <Check className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="font-semibold mb-2">No Signup Required</h3>
                            <p className="text-sm text-muted-foreground">
                                Start merging immediately. No account creation, no email verification, no hidden fees. Just upload and merge your PDFs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mt-12 p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-semibold mb-4">Common Uses for PDF Merging</h2>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Students:</strong> Combine lecture notes, assignments, and study materials into organized documents for exam preparation.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Professionals:</strong> Merge contracts, reports, and presentations for client submissions or archiving.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Job Seekers:</strong> Combine resume, cover letter, and certificates into a single application document.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Teachers:</strong> Compile worksheets, lesson plans, and resources into comprehensive teaching materials.</span>
                        </li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Is this PDF merger really free?</h3>
                            <p className="text-sm text-muted-foreground">
                                Yes, our PDF merger is 100% free with no hidden costs. There are no premium tiers, no watermarks on merged files, and no limits on usage. We believe quality PDF tools should be accessible to everyone.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Are my PDF files secure?</h3>
                            <p className="text-sm text-muted-foreground">
                                Absolutely. Your files never leave your device. All PDF processing happens locally in your browser using JavaScript. We don't have servers that receive, store, or process your documents. This is the most secure way to handle sensitive documents online.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">What is the maximum file size I can merge?</h3>
                            <p className="text-sm text-muted-foreground">
                                Since processing happens in your browser, the limit depends on your device's available memory. Modern computers and phones can typically handle files up to 100MB+ each. For very large files, we recommend merging in batches.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Can I reorder pages before merging?</h3>
                            <p className="text-sm text-muted-foreground">
                                Yes! After uploading your PDF files, you can drag and drop to reorder them before merging. This ensures your final merged document has pages in exactly the order you want.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Does merging affect PDF quality?</h3>
                            <p className="text-sm text-muted-foreground">
                                No, merging PDFs does not reduce quality. The original content, images, and formatting of each PDF are preserved exactly as they were. The merged file combines all pages without any compression or quality loss.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Educational Content */}
                <div className="mt-12 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Pro Tips for Merging PDFs</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Organize your files in the order you want before selecting them for faster merging.</li>
                        <li>• For very large documents, consider compressing individual PDFs first using our <a href="/tools/compress-pdf" className="text-emerald-500 hover:underline">PDF Compressor</a>.</li>
                        <li>• If you only need specific pages, use our <a href="/tools/extract-pages" className="text-emerald-500 hover:underline">PDF Page Extractor</a> first.</li>
                        <li>• The merged PDF maintains all hyperlinks, bookmarks, and interactive elements from the original files.</li>
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
};

export default MergePdf;
