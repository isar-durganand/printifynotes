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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                    Support & Feedback
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
                    Contact Us
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Have a question, suggestion, or just want to say hello? We'd love to hear from you!
                    Our team typically responds within 24-48 hours.
                </p>
            </section>

            {/* Contact Methods */}
            <section className="mb-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 rounded-[24px] bg-card hairline-border text-center shadow-sm">
                        <div className="w-12 h-12 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-[#007AFF]" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1.5">Email Us</h3>
                        <a
                            href="mailto:isardurganand@gmail.com"
                            className="text-[#007AFF] hover:underline transition-colors text-sm font-medium"
                        >
                            isardurganand@gmail.com
                        </a>
                        <p className="text-xs text-muted-foreground mt-2">Best for detailed questions</p>
                    </div>

                    <div className="p-6 rounded-[24px] bg-card hairline-border text-center shadow-sm">
                        <div className="w-12 h-12 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-6 h-6 text-[#007AFF]" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1.5">Feedback</h3>
                        <p className="text-muted-foreground text-sm">
                            Use the form below
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">Best for quick suggestions</p>
                    </div>

                    <div className="p-6 rounded-[24px] bg-card hairline-border text-center shadow-sm">
                        <div className="w-12 h-12 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="w-6 h-6 text-[#007AFF]" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1.5">FAQ</h3>
                        <Link to="/#faq" className="text-[#007AFF] hover:underline transition-colors text-sm font-medium">
                            Check our FAQ first
                        </Link>
                        <p className="text-xs text-muted-foreground mt-2">Instant answers available</p>
                    </div>
                </div>
            </section>

            {/* Response Time Info */}
            <section className="mb-14 p-6 sm:p-7 rounded-[28px] bg-card hairline-border shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#007AFF]" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-2">Expected Response Time</h3>
                        <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                            <li>• <strong className="text-foreground">General inquiries:</strong> 24-48 hours</li>
                            <li>• <strong className="text-foreground">Bug reports:</strong> Within 24 hours (we prioritize fixing issues)</li>
                            <li>• <strong className="text-foreground">Feature requests:</strong> We read all suggestions, but may not reply to each one individually</li>
                            <li>• <strong className="text-foreground">Business inquiries:</strong> 2-3 business days</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Common Questions Before Contacting */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">Common Questions Before Contacting</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            "The tool isn't working"
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            First, try refreshing the page or using a different browser (Chrome/Firefox recommended).
                            Our tools require a modern browser with JavaScript enabled. If issues persist, please
                            include your browser name/version and the specific error you see.
                        </p>
                    </div>
                    <div className="p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            "My PDF quality is low"
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Check the quality settings in the export panel. Higher quality means larger file size.
                            For printing, we recommend "High" quality. For digital sharing, "Medium" works well
                            for smaller file sizes.
                        </p>
                    </div>
                    <div className="p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            "Large files are slow"
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Since all processing happens in your browser, large PDFs (50+ pages) may take time
                            depending on your device's capabilities. Try splitting very large documents into
                            smaller parts for faster processing.
                        </p>
                    </div>
                    <div className="p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            "Can I request a new feature?"
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Absolutely! We love hearing feature ideas from users. Use the form below and select
                            "Feature Request" as the subject. While we can't guarantee implementation, we read
                            and consider every suggestion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-2xl mx-auto">
                <div className="p-6 sm:p-8 rounded-[32px] bg-card hairline-border shadow-md">
                    <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Send us a Message</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        Fill out the details below and we'll reply directly to your email.
                    </p>

                    {submitted ? (
                        <div className="p-8 rounded-[24px] bg-[#007AFF]/10 hairline-border border-[#007AFF]/20 text-center">
                            <div className="w-16 h-16 rounded-full bg-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-md shadow-[#007AFF]/20">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">Message Sent!</h3>
                            <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                                Thank you for reaching out. We'll get back to you within 24-48 hours.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setSubmitted(false)}
                                className="rounded-[12px] active:scale-[0.96] transition-transform"
                            >
                                Send Another Message
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-foreground text-sm focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 focus:outline-none transition-all placeholder:text-muted-foreground/60"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-foreground text-sm focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 focus:outline-none transition-all placeholder:text-muted-foreground/60"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-foreground text-sm focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 focus:outline-none transition-all"
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
                                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-foreground text-sm focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 focus:outline-none transition-all resize-none placeholder:text-muted-foreground/60"
                                    placeholder="Write your message here..."
                                />
                            </div>

                            {error && (
                                <div className="p-4 rounded-[12px] bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full rounded-[12px] bg-[#007AFF] hover:bg-[#007AFF]/90 text-white font-semibold h-12 shadow-md shadow-[#007AFF]/20 active:scale-[0.96] transition-transform"
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
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="mt-14 p-8 sm:p-10 rounded-[32px] bg-card hairline-border text-center shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Looking for Quick Answers?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm leading-relaxed">
                    Before reaching out, you might find your answer in our FAQ section.
                    We've answered the most common questions about our PDF tools.
                </p>
                <Link to="/#faq">
                    <Button variant="outline" className="rounded-[12px] active:scale-[0.96] transition-transform">
                        View FAQ
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </section>
        </PageLayout>
    );
};

export default Contact;
