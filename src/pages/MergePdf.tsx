import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfMerger } from '@/components/tools/PdfMerger';

const MergePdf: React.FC = () => {
    return (
        <PageLayout
            title="Merge PDF Files Online Free - Combine Multiple PDFs"
            description="Free online PDF merger - combine multiple PDF files into one document instantly. No signup, no upload to servers. Drag and drop to reorder pages. 100% private, works in browser. Perfect for students and professionals."
            keywords="merge pdf, combine pdf, pdf merger free, merge pdf online, join pdf files, combine pdf files free, pdf combiner, merge pdf without watermark, free pdf merger india, student pdf tools"
        >
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Merge PDF Files
                    </h1>
                    <p className="text-muted-foreground">
                        Combine multiple PDFs into a single document. Drag to reorder before merging.
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
            </div>
        </PageLayout>
    );
};

export default MergePdf;
