import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Mail, MessageSquare, HelpCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <PageLayout title="Contact Us">
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
                            <Send className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                            Thank you for reaching out. We'll get back to you as soon as possible.
                        </p>
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
                                required
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-emerald-500 focus:outline-none transition-colors"
                            >
                                <option value="">Select a subject</option>
                                <option value="feedback">General Feedback</option>
                                <option value="bug">Report a Bug</option>
                                <option value="feature">Feature Request</option>
                                <option value="support">Technical Support</option>
                                <option value="business">Business Inquiry</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                                placeholder="Write your message here..."
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full rounded-xl">
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
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
