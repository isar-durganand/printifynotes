import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const PrivacyPolicy = () => {
    return (
        <PageLayout title="Privacy Policy">
            <p className="text-muted-foreground mb-6">
                <strong>Last updated:</strong> January 6, 2026
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-muted-foreground mb-4">
                    Welcome to Printify Notes ("we," "our," or "us"). We are committed to protecting your privacy
                    and ensuring you have a positive experience when using our PDF conversion tool. This Privacy Policy
                    explains how we handle information when you use our website at printifynotes.com.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <h3 className="text-xl font-medium mb-3">What We DON'T Collect</h3>
                <p className="text-muted-foreground mb-4">
                    Printify Notes is designed with privacy as a core principle. We do NOT collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li>Your PDF files or documents - all processing happens locally in your browser</li>
                    <li>Personal identification information</li>
                    <li>Login credentials (we don't require accounts)</li>
                    <li>Payment information (our service is free)</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">What We May Collect</h3>
                <p className="text-muted-foreground mb-4">
                    We may collect anonymous, aggregated data for improving our service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li>Anonymous usage statistics (page views, feature usage)</li>
                    <li>Browser type and version</li>
                    <li>Device type (desktop, mobile, tablet)</li>
                    <li>General geographic region (country level only)</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How Your PDFs Are Processed</h2>
                <p className="text-muted-foreground mb-4">
                    All PDF processing happens entirely within your web browser using client-side JavaScript.
                    This means:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li>Your files never leave your device</li>
                    <li>No data is uploaded to our servers</li>
                    <li>We cannot see, access, or store your documents</li>
                    <li>When you close the browser tab, all data is immediately deleted from memory</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                <p className="text-muted-foreground mb-4">
                    We use minimal cookies for basic functionality and analytics:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (Google Analytics)</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                    You can control cookie preferences through your browser settings.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground mb-4">
                    We may use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li><strong>Google Analytics:</strong> For anonymous website usage statistics</li>
                    <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                    <li><strong>Vercel:</strong> For website hosting</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                    These services have their own privacy policies which we encourage you to review.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground mb-4">
                    Our service is intended for general audiences and is suitable for students of all ages.
                    We do not knowingly collect personal information from children under 13.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by
                    posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground">
                    Email: privacy@printifynotes.com
                </p>
            </section>
        </PageLayout>
    );
};

export default PrivacyPolicy;
