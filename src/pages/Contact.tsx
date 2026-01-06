import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Mail, MessageSquare, HelpCircle, Send, CheckCircle } from 'lucide-react';
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
            const response = await fetch('https://formspree.io/f/xwpkvzye', {
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
            title="Contact Us"
            description="Get in touch with the Printify Notes team. We'd love to hear your feedback, suggestions, or answer any questions about our PDF converter tool."
            keywords="contact printify notes, pdf converter support, student tools feedback, physics wallah notes help"
        >
            <section className="mb-12">
                <p className="text-lg text-muted-foreground mb-8">
                    Have a question, suggestion, or just want to say hello? We'd love to hear from you!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-card border border-border text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Email Us</h3>
                        <a
                            href="mailto:hello@printifynotes.com"
                            className="text-muted-foreground hover:text-emerald-500 transition-colors"
                        >
                            hello@printifynotes.com
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Feedback</h3>
                        <p className="text-muted-foreground">
                            Share your suggestions
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Support</h3>
                        <p className="text-muted-foreground">
                            Get help with issues
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

                {submitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground mb-4">
                            Thank you for reaching out. We'll get back to you as soon as possible.
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

            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mb-4">
                    Before reaching out, you might find your answer in our{' '}
                    <a href="/#faq" className="text-emerald-500 hover:underline">FAQ section</a>.
                </p>
            </section>
        </PageLayout>
    );
};

export default Contact;
