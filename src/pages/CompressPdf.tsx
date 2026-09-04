import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfCompressor } from '@/components/tools/PdfCompressor';
import { Shield, Zap, Check, Gauge, Mail } from 'lucide-react';

const CompressPdf: React.FC = () => {
    return (
        <PageLayout
            title="Compress PDF Online Free - Reduce PDF File Size"
            description="Free online PDF compressor - reduce PDF file size by up to 80% without losing quality. No signup, no upload to servers. Perfect for email attachments and faster sharing. Works on mobile and desktop."
            keywords="compress pdf, reduce pdf size, pdf compressor free, compress pdf online, reduce pdf file size, shrink pdf, pdf size reducer, compress pdf without losing quality, free pdf compressor india, small pdf alternative"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                        PDF Compressor
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                        Compress PDF Online - Fast & Free
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Reduce your PDF file size while maintaining quality. Perfect for email attachments
                        and faster file sharing. All processing happens in your browser.
                    </p>
                </div>

                <PdfCompressor />

                {/* How to use */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">How to Compress PDF</h2>
                    <ol className="space-y-3.5 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">1</span>
                            <span>Upload your PDF file</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">2</span>
                            <span>Adjust quality slider (lower = smaller file)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">3</span>
                            <span>Click "Compress PDF" and download the result</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-center text-foreground">Why Use Our PDF Compressor?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Gauge className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Up to 80% Smaller</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Dramatically reduce PDF file sizes. A 10MB PDF can become 2MB while still looking great on screen and in print.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Shield className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">100% Private</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your files are compressed entirely in your browser. We never upload, store, or access your documents. Complete privacy guaranteed.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Zap className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Instant Processing</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No waiting for server uploads. Compression happens instantly on your device, even for large PDF files.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Mail className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Email Ready</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Get files under email attachment limits. Perfect for sending contracts, reports, and documents via email.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">When to Compress PDFs</h2>
                    <ul className="space-y-3.5 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Email Attachments:</strong> Most email providers limit attachments to 10-25MB. Compress large PDFs to send via Gmail, Outlook, or Yahoo Mail.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Website Uploads:</strong> Reduce PDF size for faster uploads to job portals, college applications, and government forms.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Cloud Storage:</strong> Save space on Google Drive, Dropbox, or OneDrive by compressing PDFs before uploading.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Mobile Sharing:</strong> Smaller files are easier to share via WhatsApp, Telegram, or other messaging apps.</span>
                        </li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground">Frequently Asked Questions</h2>
                    <div className="space-y-3.5">
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">How much can I reduce my PDF size?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                The compression ratio depends on your PDF content. PDFs with many images typically compress well (50-80% reduction), while text-heavy documents may see less reduction (10-30%). Our tool adjusts image quality to achieve optimal file size.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Will compression reduce PDF quality?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                You control the quality vs size tradeoff using the quality slider. At high quality settings, the difference is barely noticeable. At lower quality settings, you'll see more compression artifacts in images but get smaller files. Text remains sharp at all settings.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Is there a file size limit?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Since compression happens in your browser, there's no server-side limit. The practical limit depends on your device's memory. Most modern devices can handle PDFs up to 100MB or more.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Are my files secure?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Yes! Your PDF files are never uploaded to any server. All compression happens locally in your browser using JavaScript. Your documents never leave your device - this is the most secure way to compress PDFs online.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Can I compress password-protected PDFs?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Currently, our tool works best with unprotected PDFs. If your PDF has a password, you'll need to remove the protection first. The compressed output will not have password protection.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Understanding Compression */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground">Understanding PDF Compression</h2>
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <p>
                            PDF files can become large primarily because of embedded images. A scanned document, for example,
                            stores each page as a high-resolution image, which can easily make a 10-page PDF grow to 50MB or more.
                            Understanding how compression works helps you make better choices about quality vs. file size.
                        </p>
                        <p>
                            <strong className="text-foreground">Image Quality Reduction:</strong> Our compressor works by
                            re-encoding the images within your PDF at a lower quality setting. This is similar to saving a JPEG
                            photo at lower quality — the text remains perfectly sharp, but photographs and illustrations may show
                            slight quality reduction at aggressive compression levels.
                        </p>
                        <p>
                            <strong className="text-foreground">DPI (Dots Per Inch) Optimization:</strong> Many PDFs contain
                            images at 300+ DPI, which is great for professional printing but unnecessary for screen viewing or
                            basic printing. Our tool can reduce the effective DPI to a level that still looks good on screen
                            and in standard print, significantly reducing file size.
                        </p>
                        <p>
                            <strong className="text-foreground">Why Text Stays Sharp:</strong> Text in PDFs is typically stored
                            as vector data (font outlines and positions), not as images. This means text takes very little space
                            and is unaffected by image compression. Your compressed PDF will have the same crisp, searchable text
                            as the original.
                        </p>
                        <p>
                            <strong className="text-foreground">When Compression Helps Most:</strong> PDFs with many photographs,
                            scanned pages, or high-resolution graphics benefit the most from compression. Text-heavy academic papers
                            or documents with vector diagrams are already quite compact and may see only modest size reduction.
                        </p>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] hairline-border border-[#007AFF]/20 bg-[#007AFF]/5 shadow-sm">
                    <h2 className="text-xl font-bold text-[#007AFF] mb-4">💡 Pro Tips for PDF Compression</h2>
                    <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                        <li>• PDFs with lots of high-resolution images compress better than text-heavy documents.</li>
                        <li>• If your PDF is already optimized, you may see minimal size reduction.</li>
                        <li>• For best results, start with the highest quality setting and reduce gradually until you reach your target size.</li>
                        <li>• Scanned documents often have large file sizes - compression works great on these!</li>
                        <li>• After compressing, use our <a href="/tools/merge-pdf" className="text-[#007AFF] font-medium hover:underline">PDF Merger</a> to combine multiple compressed files if needed.</li>
                    </ul>
                </div>

                {/* Comparison */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-2 text-foreground">Before & After Compression</h2>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                        Here's what you can expect when compressing different types of PDFs:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-black/[0.08] dark:border-white/[0.1] text-foreground font-semibold">
                                    <th className="text-left py-2.5 px-3">Document Type</th>
                                    <th className="text-left py-2.5 px-3">Original Size</th>
                                    <th className="text-left py-2.5 px-3">Compressed</th>
                                    <th className="text-left py-2.5 px-3">Reduction</th>
                                </tr>
                            </thead>
                            <tbody className="text-muted-foreground text-sm divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                                <tr>
                                    <td className="py-2.5 px-3 text-foreground font-medium">Scanned Notes</td>
                                    <td className="py-2.5 px-3">15 MB</td>
                                    <td className="py-2.5 px-3">3 MB</td>
                                    <td className="py-2.5 px-3 text-[#007AFF] font-bold">80%</td>
                                </tr>
                                <tr>
                                    <td className="py-2.5 px-3 text-foreground font-medium">Photo Album</td>
                                    <td className="py-2.5 px-3">25 MB</td>
                                    <td className="py-2.5 px-3">6 MB</td>
                                    <td className="py-2.5 px-3 text-[#007AFF] font-bold">76%</td>
                                </tr>
                                <tr>
                                    <td className="py-2.5 px-3 text-foreground font-medium">Presentation</td>
                                    <td className="py-2.5 px-3">8 MB</td>
                                    <td className="py-2.5 px-3">2.5 MB</td>
                                    <td className="py-2.5 px-3 text-[#007AFF] font-bold">69%</td>
                                </tr>
                                <tr>
                                    <td className="py-2.5 px-3 text-foreground font-medium">Text Document</td>
                                    <td className="py-2.5 px-3">2 MB</td>
                                    <td className="py-2.5 px-3">1.5 MB</td>
                                    <td className="py-2.5 px-3 text-[#007AFF] font-bold">25%</td>
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
