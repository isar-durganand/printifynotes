import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { ImageToPdf } from '@/components/tools/ImageToPdf';
import { Shield, Zap, Check, Image, FileText, Layers } from 'lucide-react';

const ImageToPdfPage: React.FC = () => {
    return (
        <PageLayout
            title="Convert Images to PDF Online Free - JPG, PNG to PDF Converter"
            description="Free online image to PDF converter - convert JPG, PNG, and WebP images to PDF. Choose page size (A4, Letter, A3) and orientation. No signup, 100% private, all processing in your browser. Perfect for creating photo albums and document scans."
            keywords="image to pdf, jpg to pdf, png to pdf, convert image to pdf, photo to pdf, picture to pdf converter, image to pdf converter free, convert jpg to pdf online, webp to pdf, multiple images to pdf"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Image to PDF Converter - Free & Private
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Convert multiple images into a single PDF document. Supports JPG, PNG, and WebP.
                        All processing happens locally - your images stay private.
                    </p>
                </div>

                <ImageToPdf />

                {/* How to use */}
                <div className="mt-12 p-6 rounded-xl bg-muted/50">
                    <h2 className="text-xl font-semibold mb-4">How to Convert Images to PDF</h2>
                    <ol className="space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">1</span>
                            <span>Drop or select your images (JPG, PNG, WebP)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">2</span>
                            <span>Choose page size (A4, Letter, A3, or fit to image)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">3</span>
                            <span>Drag to reorder, then click "Convert to PDF"</span>
                        </li>
                    </ol>
                </div>

                {/* Benefits Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Why Use Our Image to PDF Converter?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                                <Image className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Multiple Formats Supported</h3>
                            <p className="text-sm text-muted-foreground">
                                Convert JPG, JPEG, PNG, and WebP images. Whether from your camera, screenshots, or web downloads - we handle them all.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                                <Shield className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="font-semibold mb-2">100% Private</h3>
                            <p className="text-sm text-muted-foreground">
                                Your images are converted entirely in your browser. We never upload or store your photos. Perfect for personal and sensitive images.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                                <Layers className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Flexible Page Sizes</h3>
                            <p className="text-sm text-muted-foreground">
                                Choose from A4, Letter, A3, or fit the page to your image dimensions. Select portrait or landscape orientation.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                                <Zap className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="font-semibold mb-2">Instant Conversion</h3>
                            <p className="text-sm text-muted-foreground">
                                No waiting for uploads. Convert dozens of images to PDF in seconds, right in your browser.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mt-12 p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-semibold mb-4">Popular Uses for Image to PDF</h2>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Photo Albums:</strong> Compile vacation photos, family pictures, or event memories into shareable PDF albums.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Document Scans:</strong> Convert scanned receipts, ID cards, or handwritten notes from photos to organized PDFs.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Assignments:</strong> Students can convert handwritten assignment photos into PDFs for easy submission.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Portfolios:</strong> Artists and designers can compile their work into professional PDF portfolios.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span><strong>WhatsApp Images:</strong> Convert images received on WhatsApp into PDFs for archiving or printing.</span>
                        </li>
                    </ul>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">What image formats are supported?</h3>
                            <p className="text-sm text-muted-foreground">
                                Our converter supports JPG (JPEG), PNG, and WebP formats. These cover the vast majority of images from cameras, phones, screenshots, and web downloads.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Can I convert multiple images at once?</h3>
                            <p className="text-sm text-muted-foreground">
                                Yes! You can select multiple images and they'll all be combined into a single PDF. You can drag and drop to reorder them before converting.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">What page sizes are available?</h3>
                            <p className="text-sm text-muted-foreground">
                                Choose from A4 (standard international), Letter (US standard), A3 (larger format), or "Fit to Image" which creates pages that match your image dimensions exactly.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Are my images secure?</h3>
                            <p className="text-sm text-muted-foreground">
                                Absolutely. Your images never leave your device. All conversion happens locally in your browser using JavaScript. We don't have servers that receive or store your photos.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Does converting to PDF reduce image quality?</h3>
                            <p className="text-sm text-muted-foreground">
                                We preserve your original image quality in the PDF. The images are embedded at their original resolution, so you won't notice any quality loss.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card">
                            <h3 className="font-semibold mb-2">Can I convert HEIC images from iPhone?</h3>
                            <p className="text-sm text-muted-foreground">
                                HEIC format is not directly supported. However, iPhones typically offer to convert HEIC to JPG when sharing or downloading. You can also use your phone's settings to save photos as JPG by default.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-12 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">💡 Pro Tips for Better PDFs</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• For printed documents, use A4 or Letter size in portrait orientation.</li>
                        <li>• For photo albums or landscape images, select landscape orientation.</li>
                        <li>• Use "Fit to Image" if you want pages sized exactly to your images (no borders).</li>
                        <li>• Organize your images before uploading - they'll appear in the order you add them.</li>
                        <li>• After creating your PDF, you can use our <a href="/tools/compress-pdf" className="text-emerald-500 hover:underline">PDF Compressor</a> to reduce the file size for easier sharing.</li>
                    </ul>
                </div>

                {/* Supported formats */}
                <div className="mt-12 p-6 rounded-xl bg-muted/50">
                    <h2 className="text-xl font-semibold mb-4">Supported Image Formats</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border bg-card text-center">
                            <div className="text-2xl font-bold text-blue-500 mb-1">JPG</div>
                            <p className="text-sm text-muted-foreground">Most common format for photos from cameras and phones</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card text-center">
                            <div className="text-2xl font-bold text-purple-500 mb-1">PNG</div>
                            <p className="text-sm text-muted-foreground">Perfect for screenshots, graphics, and transparent images</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-card text-center">
                            <div className="text-2xl font-bold text-emerald-500 mb-1">WebP</div>
                            <p className="text-sm text-muted-foreground">Modern format with excellent compression from web</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ImageToPdfPage;
