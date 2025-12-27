import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is Printify Notes really free?',
    answer: 'Yes, Printify Notes is completely free to use. There are no hidden fees, subscriptions, or premium features locked behind a paywall. Process as many PDFs as you need.',
  },
  {
    question: 'Are my documents secure?',
    answer: 'Absolutely. All processing happens directly in your browser using client-side JavaScript. Your files are never uploaded to any server. When you close the tab, all data is gone.',
  },
  {
    question: 'What types of PDFs work best?',
    answer: 'Printify Notes works great with dark-themed lecture slides, code screenshots, IDE exports, dark-mode presentations, and any PDF with a dark background that you want to convert for printing.',
  },
  {
    question: 'How much ink can I save?',
    answer: 'By inverting dark backgrounds to white and converting to grayscale, you can save up to 60% on ink usage compared to printing the original dark PDFs.',
  },
  {
    question: 'Can I combine multiple pages on one sheet?',
    answer: 'Yes! You can combine 2, 3, or 4 pages per sheet in either portrait or landscape orientation. This is perfect for creating handouts or saving paper.',
  },
  {
    question: 'What browsers are supported?',
    answer: 'Printify Notes works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.',
  },
  {
    question: 'Is there a file size limit?',
    answer: 'There\'s no strict file size limit, but very large PDFs (100+ pages) may take longer to process depending on your device\'s capabilities. Most documents process in seconds.',
  },
  {
    question: 'Can I use this on mobile devices?',
    answer: 'Yes! Printify Notes is fully responsive and works on tablets and smartphones. However, for the best experience with large documents, we recommend using a desktop browser.',
  },
];

export const FAQ = () => {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-tight">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm text-glow font-medium mb-4 opacity-0 animate-fade-in">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in delay-100">
            Common Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in delay-200">
            Everything you need to know about Printify Notes.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto opacity-0 animate-fade-in delay-300">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};