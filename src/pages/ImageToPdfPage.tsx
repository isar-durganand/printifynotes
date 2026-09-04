import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { ImageToPdf } from '@/components/tools/ImageToPdf';
import { Shield, Zap, Check, Image, Layers } from 'lucide-react';

const ImageToPdfPage: React.FC = () => {
    return (
        <PageLayout
            title="Convert Images to PDF Online Free - JPG, PNG to PDF Converter"
            description="Free online image to PDF converter - convert JPG, PNG, and WebP images to PDF. Choose page size (A4, Letter, A3) and orientation. No signup, 100% private, all processing in your browser. Perfect for creating photo albums and document scans."
            keywords="image to pdf, jpg to pdf, png to pdf, convert image to pdf, photo to pdf, picture to pdf converter, image to pdf converter free, convert jpg to pdf online, webp to pdf, multiple images to pdf"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                        Image Converter
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                        Image to PDF Converter - Free & Private
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Convert multiple images into a single PDF document. Supports JPG, PNG, and WebP.
                        All processing happens locally - your images stay private.
                    </p>
                </div>

                <ImageToPdf />

                {/* How to use */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">How to Convert Images to PDF</h2>
                    <ol className="space-y-3.5 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">1</span>
                            <span>Drop or select your images (JPG, PNG, WebP)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">2</span>
                            <span>Choose page size (A4, Letter, A3, or fit to image)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-7 h-7 rounded-[9px] bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">3</span>
                            <span>Drag to reorder, then click "Convert to PDF"</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-center text-foreground">Why Use Our Image to PDF Converter?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Image className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Multiple Formats Supported</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Convert JPG, JPEG, PNG, and WebP images. Whether from your camera, screenshots, or web downloads - we handle them all.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Shield className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">100% Private</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your images are converted entirely in your browser. We never upload or store your photos. Perfect for personal and sensitive images.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Layers className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Flexible Page Sizes</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Choose from A4, Letter, A3, or fit the page to your image dimensions. Select portrait or landscape orientation.
                            </p>
                        </div>
                        <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                            <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-3.5">
                                <Zap className="w-5 h-5 text-[#007AFF]" />
                            </div>
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Instant Conversion</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No waiting for uploads. Convert dozens of images to PDF in seconds, right in your browser.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">Popular Uses for Image to PDF</h2>
                    <ul className="space-y-3.5 text-muted-foreground text-sm leading-relaxed">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Photo Albums:</strong> Compile vacation photos, family pictures, or event memories into shareable PDF albums.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Document Scans:</strong> Convert scanned receipts, ID cards, or handwritten notes from photos to organized PDFs.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Assignments:</strong> Students can convert handwritten assignment photos into PDFs for easy submission.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">Portfolios:</strong> Artists and designers can compile their work into professional PDF portfolios.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-foreground">WhatsApp Images:</strong> Convert images received on WhatsApp into PDFs for archiving or printing.</span>
                        </li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-14">
                    <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground">Frequently Asked Questions</h2>
                    <div className="space-y-3.5">
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">What image formats are supported?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Our converter supports JPG (JPEG), PNG, and WebP formats. These cover the vast majority of images from cameras, phones, screenshots, and web downloads.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Can I convert multiple images at once?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Yes! You can select multiple images and they'll all be combined into a single PDF. You can drag and drop to reorder them before converting.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">What page sizes are available?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Choose from A4 (standard international), Letter (US standard), A3 (larger format), or "Fit to Image" which creates pages that match your image dimensions exactly.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Are my images secure?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Absolutely. Your images never leave your device. All conversion happens locally in your browser using JavaScript. We don't have servers that receive or store your photos.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Does converting to PDF reduce image quality?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We preserve your original image quality in the PDF. The images are embedded at their original resolution, so you won't notice any quality loss.
                            </p>
                        </div>
                        <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                            <h3 className="font-bold tracking-tight mb-2 text-foreground">Can I convert HEIC images from iPhone?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                HEIC format is not directly supported. However, iPhones typically offer to convert HEIC to JPG when sharing or downloading. You can also use your phone's settings to save photos as JPG by default.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground">Best Practices for Image to PDF Conversion</h2>
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <p>
                            Converting images to PDF is straightforward, but a few best practices can significantly improve
                            the quality and usability of your final document.
                        </p>
                        <p>
                            <strong className="text-foreground">Image Resolution Matters:</strong> For documents you plan to print,
                            aim for images with at least 150 DPI (dots per inch). Phone camera photos are typically 72 DPI but at very
                            high pixel counts, so they print well. Screenshots, however, are usually 72-96 DPI and may appear
                            pixelated when printed at large sizes. For screen-only viewing, any resolution works fine.
                        </p>
                        <p>
                            <strong className="text-foreground">Choosing the Right Format:</strong> JPG is best for photographs
                            with natural colors and gradients — it uses lossy compression that works well for complex images.
                            PNG is ideal for screenshots, diagrams, or any image with text, sharp edges, or transparency — it
                            preserves fine details without compression artifacts. WebP offers the best of both worlds with smaller
                            file sizes, though it's a newer format.
                        </p>
                        <p>
                            <strong className="text-foreground">Page Size Selection:</strong> A4 is the standard paper size in
                            India and most countries outside the US. Choose Letter if you're sharing with US-based recipients.
                            "Fit to Image" is perfect for photo albums where you want zero margins and the page sized exactly
                            to your image. For mixing portrait and landscape photos, consider converting them separately and
                            then merging with our <a href="/tools/merge-pdf" className="text-[#007AFF] font-medium hover:underline">PDF Merger</a>.
                        </p>
                        <p>
                            <strong className="text-foreground">Organizing Before Converting:</strong> Since the images appear in
                            your PDF in the order you add them, naming your files numerically (01.jpg, 02.jpg, etc.) before
                            selecting them helps maintain the right sequence. You can also drag to reorder after uploading.
                        </p>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] hairline-border border-[#007AFF]/20 bg-[#007AFF]/5 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#007AFF]">💡 Pro Tips for Better PDFs</h2>
                    <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                        <li>• For printed documents, use A4 or Letter size in portrait orientation.</li>
                        <li>• For photo albums or landscape images, select landscape orientation.</li>
                        <li>• Use "Fit to Image" if you want pages sized exactly to your images (no borders).</li>
                        <li>• Organize your images before uploading - they'll appear in the order you add them.</li>
                        <li>• After creating your PDF, you can use our <a href="/tools/compress-pdf" className="text-[#007AFF] font-medium hover:underline">PDF Compressor</a> to reduce the file size for easier sharing.</li>
                    </ul>
                </div>

                {/* Supported formats */}
                <div className="mt-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <h2 className="text-xl font-bold tracking-tight mb-5 text-foreground">Supported Image Formats</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.04] hairline-border text-center">
                            <div className="text-2xl font-bold text-[#007AFF] mb-1">JPG</div>
                            <p className="text-xs text-muted-foreground">Most common format for photos from cameras and phones</p>
                        </div>
                        <div className="p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.04] hairline-border text-center">
                            <div className="text-2xl font-bold text-[#007AFF] mb-1">PNG</div>
                            <p className="text-xs text-muted-foreground">Perfect for screenshots, graphics, and transparent images</p>
                        </div>
                        <div className="p-5 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.04] hairline-border text-center">
                            <div className="text-2xl font-bold text-[#007AFF] mb-1">WebP</div>
                            <p className="text-xs text-muted-foreground">Modern format with excellent compression from web</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ImageToPdfPage;
