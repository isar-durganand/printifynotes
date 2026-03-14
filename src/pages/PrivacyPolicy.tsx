import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const PrivacyPolicy = () => {
    return (
        <PageLayout
            title="Privacy Policy"
            description="Read Printify Notes privacy policy. Learn how we protect your data - all PDF processing happens locally in your browser with no file uploads to servers."
            keywords="printify notes privacy, pdf converter privacy policy, no upload pdf tool, private pdf converter"
        >
            <p className="text-muted-foreground mb-6">
                <strong>Last updated:</strong> March 14, 2026
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-muted-foreground mb-4">
                    Welcome to Printify Notes ("we," "our," or "us"). We are committed to protecting your privacy
                    and ensuring you have a positive experience when using our PDF conversion tool. This Privacy Policy
                    explains how we handle information when you use our website at www.printifynotes.in.
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
                    We use cookies and similar technologies on our website. Below is a detailed description of the
                    types of cookies we use:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics cookies:</strong> Google Analytics helps us understand how visitors use our site, such as which pages are visited most frequently and how users navigate between pages. This data is collected anonymously.</li>
                    <li><strong>Advertising cookies:</strong> Google AdSense uses cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                    You may opt out of personalized advertising by visiting{' '}
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
                        Google Ads Settings
                    </a>. Alternatively, you can opt out of third-party vendors' use of cookies for personalized advertising by visiting{' '}
                    <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
                        www.aboutads.info/choices
                    </a>.
                </p>
                <p className="text-muted-foreground mb-4">
                    You can also control cookie preferences through your browser settings. Most browsers allow you
                    to refuse cookies or to alert you when cookies are being sent.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground mb-4">
                    We use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li><strong>Google Analytics:</strong> For anonymous website usage statistics. Google Analytics uses cookies to collect information about how visitors use our website. The information is used to compile reports and help us improve the site. For more information, see{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
                            Google's Privacy Policy
                        </a>.
                    </li>
                    <li><strong>Google AdSense:</strong> For displaying advertisements. Google AdSense uses cookies to serve ads that are relevant to you. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. For more information, see{' '}
                        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">
                            How Google Uses Cookies in Advertising
                        </a>.
                    </li>
                    <li><strong>Vercel:</strong> For website hosting and delivery</li>
                    <li><strong>Formspree:</strong> For processing contact form submissions</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                    These services have their own privacy policies which we encourage you to review. We are not
                    responsible for the privacy practices of these third-party services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
                <p className="text-muted-foreground mb-4">
                    You have the following rights regarding your data:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li><strong>Opt out of personalized ads:</strong> Visit <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Google Ads Settings</a> to manage your ad preferences</li>
                    <li><strong>Disable cookies:</strong> Use your browser settings to refuse or delete cookies</li>
                    <li><strong>Opt out of analytics:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Google Analytics Opt-Out Browser Add-on</a></li>
                    <li><strong>Data deletion:</strong> Since we don't store your personal data or documents, there is nothing to delete. Your PDF files are processed locally and never stored.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground mb-4">
                    Our service is intended for general audiences and is suitable for students of all ages.
                    We do not knowingly collect personal information from children under 13. If you believe
                    we have inadvertently collected information from a child under 13, please contact us so
                    we can take appropriate action.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by
                    posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage
                    you to review this Privacy Policy periodically for any changes.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground">
                    Email:{' '}
                    <a href="mailto:isardurganand@gmail.com" className="text-emerald-500 hover:underline">
                        isardurganand@gmail.com
                    </a>
                </p>
            </section>
        </PageLayout>
    );
};

export default PrivacyPolicy;

