import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { ImageToPdf } from '@/components/tools/ImageToPdf';

const ImageToPdfPage: React.FC = () => {
    return (
        <PageLayout
            title="Convert Images to PDF"
            description="Convert JPG, PNG, and WebP images to PDF. Free, private, no upload to servers. Choose page size and orientation."
        >
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Image to PDF Converter
                    </h1>
                    <p className="text-muted-foreground">
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
            </div>
        </PageLayout>
    );
};

export default ImageToPdfPage;
