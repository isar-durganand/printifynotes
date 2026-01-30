import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PdfPageExtractor } from '@/components/tools/PdfPageExtractor';

const ExtractPages: React.FC = () => {
    return (
        <PageLayout
            title="Extract PDF Pages Online Free - Split PDF Documents"
            description="Free PDF page extractor - select and extract specific pages from any PDF to create a new document. Remove unwanted pages, split PDFs, extract chapters. No signup, 100% private, works in browser."
            keywords="extract pdf pages, split pdf, pdf page extractor, remove pages from pdf, pdf splitter free, extract pages from pdf online, delete pdf pages, separate pdf pages, pdf page remover, split pdf online free"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Extract PDF Pages
                    </h1>
                    <p className="text-muted-foreground">
                        Select specific pages from your PDF to create a new document.
                        Perfect for extracting chapters, removing unwanted pages, or splitting documents.
                    </p>
                </div>

                <PdfPageExtractor />

                {/* How to use */}
                <div className="mt-12 p-6 rounded-xl bg-muted/50">
                    <h2 className="text-xl font-semibold mb-4">How to Extract Pages</h2>
                    <ol className="space-y-3 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">1</span>
                            <span>Upload your PDF file</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">2</span>
                            <span>Click pages to select/deselect or use range input (e.g., "1-5, 8, 10-12")</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">3</span>
                            <span>Click "Extract Pages" to download selected pages as a new PDF</span>
                        </li>
                    </ol>
                </div>

                {/* Use cases */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">📚 Extract Chapters</h3>
                        <p className="text-sm text-muted-foreground">
                            Pull out specific chapters from textbooks for focused study sessions.
                        </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">🗑️ Remove Pages</h3>
                        <p className="text-sm text-muted-foreground">
                            Select all pages except the ones you don't need to create a clean document.
                        </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">📄 Split Documents</h3>
                        <p className="text-sm text-muted-foreground">
                            Divide large PDFs into smaller, more manageable files.
                        </p>
                    </div>
                    <div className="p-4 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">🖨️ Print Selection</h3>
                        <p className="text-sm text-muted-foreground">
                            Extract only the pages you want to print to save paper and ink.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ExtractPages;
