import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfCompressor } from '@/components/tools/PdfCompressor';
import { Shield, Zap, Check, Gauge, FileText, Mail } from 'lucide-react';

const CompressPdf: React.FC = () => {
    return (
        <PageLayout
            title="Compress PDF Online Free - Reduce PDF File Size"
            description="Free online PDF compressor - reduce PDF file size by up to 80% without losing quality. No signup, no upload to servers. Perfect for email attachments and faster sharing. Works on mobile and desktop."
            keywords="compress pdf, reduce pdf size, pdf compressor free, compress pdf online, reduce pdf file size, shrink pdf, pdf size reducer, compress pdf without losing quality, free pdf compressor india, small pdf alternative"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Compress PDF Online - Fast & Free
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Reduce your PDF file size while maintaining quality. Perfect for email attachments
                        and faster file sharing. All processing happens in your browser.
                    </p>
                </div>

                <PdfCompressor />

                {/* How to use */}
                <div className="mt-12 p-6 rounded-xl bg-muted/50">
                    <h2 className="text-xl font-semibold mb-4">How to Compress PDF</h2>
                    <ol className="space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">1</span>
                            <span>Upload your PDF file</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">2</span>
                            <span>Adjust quality slider (lower = smaller file)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">3</span>
                            <span>Click "Compress PDF" and download the result</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Why Use Our PDF Compressor?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                                <Gauge className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Up to 80% Smaller</h3>
                            <p className="text-sm text-muted-foreground">
                                Dramatically reduce PDF file sizes. A 10MB PDF can become 2MB while still looking great on screen and in print.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                                <Shield className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="font-semibold mb-2">100% Private</h3>
                            <p className="text-sm text-muted-foreground">
                                Your files are compressed entirely in your browser. We never upload, store, or access your documents. Complete privacy guaranteed.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                                <Zap className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Instant Processing</h3>
                            <p className="text-sm text-muted-foreground">
                                No waiting for server uploads. Compression happens instantly on your device, even for large PDF files.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                                <Mail className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Email Ready</h3>
                            <p className="text-sm text-muted-foreground">
                                Get files under email attachment limits. Perfect for sending contracts, reports, and documents via email.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mt-12 p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-semibold mb-4">When to Compress PDFs</h2>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Email Attachments:</strong> Most email providers limit attachments to 10-25MB. Compress large PDFs to send via Gmail, Outlook, or Yahoo Mail.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Website Uploads:</strong> Reduce PDF size for faster uploads to job portals, college applications, and government forms.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Cloud Storage:</strong> Save space on Google Drive, Dropbox, or OneDrive by compressing PDFs before uploading.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Mobile Sharing:</strong> Smaller files are easier to share via WhatsApp, Telegram, or other messaging apps.</span>
                        </li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">How much can I reduce my PDF size?</h3>
                            <p className="text-sm text-muted-foreground">
                                The compression ratio depends on your PDF content. PDFs with many images typically compress well (50-80% reduction), while text-heavy documents may see less reduction (10-30%). Our tool adjusts image quality to achieve optimal file size.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Will compression reduce PDF quality?</h3>
                            <p className="text-sm text-muted-foreground">
                                You control the quality vs size tradeoff using the quality slider. At high quality settings, the difference is barely noticeable. At lower quality settings, you'll see more compression artifacts in images but get smaller files. Text remains sharp at all settings.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
                            <p className="text-sm text-muted-foreground">
                                Since compression happens in your browser, there's no server-side limit. The practical limit depends on your device's memory. Most modern devices can handle PDFs up to 100MB or more.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Are my files secure?</h3>
                            <p className="text-sm text-muted-foreground">
                                Yes! Your PDF files are never uploaded to any server. All compression happens locally in your browser using JavaScript. Your documents never leave your device - this is the most secure way to compress PDFs online.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Can I compress password-protected PDFs?</h3>
                            <p className="text-sm text-muted-foreground">
                                Currently, our tool works best with unprotected PDFs. If your PDF has a password, you'll need to remove the protection first. The compressed output will not have password protection.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-12 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                    <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4">💡 Pro Tips for PDF Compression</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• PDFs with lots of high-resolution images compress better than text-heavy documents.</li>
                        <li>• If your PDF is already optimized, you may see minimal size reduction.</li>
                        <li>• For best results, start with the highest quality setting and reduce gradually until you reach your target size.</li>
                        <li>• Scanned documents often have large file sizes - compression works great on these!</li>
                        <li>• After compressing, use our <a href="/tools/merge-pdf" className="text-emerald-500 hover:underline">PDF Merger</a> to combine multiple compressed files if needed.</li>
                    </ul>
                </div>

                {/* Comparison */}
                <div className="mt-12 p-6 rounded-xl bg-muted/50">
                    <h2 className="text-xl font-semibold mb-4">Before & After Compression</h2>
                    <p className="text-muted-foreground mb-4">
                        Here's what you can expect when compressing different types of PDFs:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 px-3">Document Type</th>
                                    <th className="text-left py-2 px-3">Original Size</th>
                                    <th className="text-left py-2 px-3">Compressed</th>
                                    <th className="text-left py-2 px-3">Reduction</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                                <tr className="border-b">
                                    <td className="py-2 px-3">Scanned Notes</td>
                                    <td className="py-2 px-3">15 MB</td>
                                    <td className="py-2 px-3">3 MB</td>
                                    <td className="py-2 px-3 text-emerald-500">80%</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-3">Photo Album</td>
                                    <td className="py-2 px-3">25 MB</td>
                                    <td className="py-2 px-3">6 MB</td>
                                    <td className="py-2 px-3 text-emerald-500">76%</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-3">Presentation</td>
                                    <td className="py-2 px-3">8 MB</td>
                                    <td className="py-2 px-3">2.5 MB</td>
                                    <td className="py-2 px-3 text-emerald-500">69%</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-3">Text Document</td>
                                    <td className="py-2 px-3">2 MB</td>
                                    <td className="py-2 px-3">1.5 MB</td>
                                    <td className="py-2 px-3 text-emerald-500">25%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default CompressPdf;
