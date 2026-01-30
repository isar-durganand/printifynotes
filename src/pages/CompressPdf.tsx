import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfCompressor } from '@/components/tools/PdfCompressor';

const CompressPdf: React.FC = () => {
    return (
        <PageLayout
            title="Compress PDF Online Free - Reduce PDF File Size"
            description="Free online PDF compressor - reduce PDF file size by up to 80% without losing quality. No signup, no upload to servers. Perfect for email attachments and faster sharing. Works on mobile and desktop."
            keywords="compress pdf, reduce pdf size, pdf compressor free, compress pdf online, reduce pdf file size, shrink pdf, pdf size reducer, compress pdf without losing quality, free pdf compressor india, small pdf alternative"
        >
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Compress PDF
                    </h1>
                    <p className="text-muted-foreground">
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

                {/* Tips */}
                <div className="mt-8 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                    <h3 className="font-semibold text-emerald-500 mb-2">💡 Pro Tip</h3>
                    <p className="text-sm text-muted-foreground">
                        PDFs with lots of images compress better than text-heavy documents.
                        If your PDF is already optimized, you may see minimal size reduction.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
};

export default CompressPdf;
