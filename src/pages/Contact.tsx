import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, HelpCircle, Send, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/mkgrljqp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            setError('Failed to send message. Please try again or email us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageLayout
            title="Contact Us - Printify Notes"
            description="Get in touch with the Printify Notes team. We'd love to hear your feedback, suggestions, or answer any questions about our PDF converter tool."
            keywords="contact printify notes, pdf converter support, student tools feedback, physics wallah notes help"
        >
            {/* Hero Section */}
            <section className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Have a question, suggestion, or just want to say hello? We'd love to hear from you!
                    Our team typically responds within 24-48 hours.
                </p>
            </section>

            {/* Contact Methods */}
            <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-card border border-border text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Email Us</h3>
                        <a
                            href="mailto:isardurganand@gmail.com"
                            className="text-muted-foreground hover:text-emerald-500 transition-colors text-sm"
                        >
                            isardurganand@gmail.com
                        </a>
                        <p className="text-xs text-muted-foreground mt-2">Best for detailed questions</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Feedback</h3>
                        <p className="text-muted-foreground text-sm">
                            Use the form below
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">Best for quick suggestions</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border text-center">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="font-semibold mb-2">FAQ</h3>
                        <Link to="/#faq" className="text-muted-foreground hover:text-emerald-500 transition-colors text-sm">
                            Check our FAQ first
                        </Link>
                        <p className="text-xs text-muted-foreground mt-2">Instant answers available</p>
                    </div>
                </div>
            </section>

            {/* Response Time Info */}
            <section className="mb-12 p-6 rounded-2xl bg-muted/50 border">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Expected Response Time</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• <strong>General inquiries:</strong> 24-48 hours</li>
                            <li>• <strong>Bug reports:</strong> Within 24 hours (we prioritize fixing issues)</li>
                            <li>• <strong>Feature requests:</strong> We read all suggestions, but may not reply to each one individually</li>
                            <li>• <strong>Business inquiries:</strong> 2-3 business days</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Common Questions Before Contacting */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Common Questions Before Contacting</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            "The tool isn't working"
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            First, try refreshing the page or using a different browser (Chrome/Firefox recommended).
                            Our tools require a modern browser with JavaScript enabled. If issues persist, please
                            include your browser name/version and the specific error you see.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            "My PDF quality is low"
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Check the quality settings in the export panel. Higher quality means larger file size.
                            For printing, we recommend "High" quality. For digital sharing, "Medium" works well
                            for smaller file sizes.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            "Large files are slow"
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Since all processing happens in your browser, large PDFs (50+ pages) may take time
                            depending on your device's capabilities. Try splitting very large documents into
                            smaller parts for faster processing.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            "Can I request a new feature?"
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Absolutely! We love hearing feature ideas from users. Use the form below and select
                            "Feature Request" as the subject. While we can't guarantee implementation, we read
                            and consider every suggestion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

                {submitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground mb-4">
                            Thank you for reaching out. We'll get back to you within 24-48 hours.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setSubmitted(false)}
                            className="rounded-xl"
                        >
                            Send Another Message
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-emerald-500 focus:outline-none transition-colors"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-emerald-500 focus:outline-none transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                Subject
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-emerald-500 focus:outline-none transition-colors"
                            >
                                <option value="">Select a subject</option>
                                <option value="General Feedback">General Feedback</option>
                                <option value="Bug Report">Report a Bug</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="Technical Support">Technical Support</option>
                                <option value="Business Inquiry">Business Inquiry</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                                placeholder="Write your message here..."
                            />
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </section>

            {/* FAQ CTA */}
            <section className="mt-16 p-8 rounded-2xl bg-muted/50 border text-center">
                <h2 className="text-2xl font-semibold mb-4">Looking for Quick Answers?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Before reaching out, you might find your answer in our FAQ section.
                    We've answered the most common questions about our PDF tools.
                </p>
                <Link to="/#faq">
                    <Button variant="outline" className="rounded-xl">
                        View FAQ
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </section>
        </PageLayout>
    );
};

export default Contact;
