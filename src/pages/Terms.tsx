import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const Terms = () => {
    return (
        <PageLayout
            title="Terms of Service"
            description="Read Printify Notes terms of service. Understand the terms and conditions for using our free PDF converter tool for students."
            keywords="printify notes terms, pdf converter terms of service, free tool terms, educational tools terms"
        >
            <p className="text-muted-foreground mb-6">
                <strong>Last updated:</strong> January 6, 2026
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                    By accessing and using Printify Notes (the "Service"), you accept and agree to be bound by
                    the terms and provisions of this agreement. If you do not agree to these terms, please do
                    not use our Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground mb-4">
                    Printify Notes is a free, browser-based tool that allows users to convert dark-background
                    PDF documents into print-friendly formats. The Service processes all files locally in your
                    browser without uploading them to any server.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Use of Service</h2>
                <p className="text-muted-foreground mb-4">
                    You agree to use the Service only for lawful purposes. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li>Ensuring you have the right to convert and use any documents you process</li>
                    <li>Not using the Service to process copyrighted material without permission</li>
                    <li>Not attempting to reverse engineer, modify, or misuse the Service</li>
                    <li>Not using automated systems to access the Service in a manner that could damage it</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                    The Service, including its original content, features, and functionality, is owned by
                    Printify Notes and is protected by international copyright, trademark, and other
                    intellectual property laws.
                </p>
                <p className="text-muted-foreground mb-4">
                    You retain all rights to your own documents. We do not claim any ownership over the
                    PDFs you process using our Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground mb-4">
                    The Service is provided "as is" and "as available" without any warranties of any kind,
                    either express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    <li>Implied warranties of merchantability</li>
                    <li>Fitness for a particular purpose</li>
                    <li>Non-infringement</li>
                    <li>Uninterrupted or error-free operation</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                    In no event shall Printify Notes, its directors, employees, partners, agents, suppliers,
                    or affiliates be liable for any indirect, incidental, special, consequential, or punitive
                    damages, including without limitation, loss of profits, data, use, goodwill, or other
                    intangible losses resulting from your use of the Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Third-Party Content</h2>
                <p className="text-muted-foreground mb-4">
                    Our Service may contain advertisements from third parties. These advertisements are not
                    endorsed by us, and we are not responsible for the content or accuracy of any third-party
                    advertisements.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground mb-4">
                    We reserve the right to modify or replace these Terms at any time. If a revision is
                    material, we will provide at least 30 days' notice prior to any new terms taking effect.
                    What constitutes a material change will be determined at our sole discretion.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground mb-4">
                    These Terms shall be governed and construed in accordance with the laws of India,
                    without regard to its conflict of law provisions.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-muted-foreground">
                    Email: isardurganand@gmail.com
                </p>
            </section>
        </PageLayout>
    );
};

export default Terms;
