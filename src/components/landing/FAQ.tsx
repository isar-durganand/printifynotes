import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqs = [
  {
    question: 'How do I print PW (Physics Wallah) notes with dark background?',
    answer: 'Simply upload your Physics Wallah PDF to Printify Notes. The tool will automatically convert the dark background to white, making it perfect for printing. Adjust brightness and contrast if needed, then download your print-ready PDF. This saves significant ink and makes your PW notes easier to read on paper.',
  },
  {
    question: 'Can I convert Unacademy dark slides for printing?',
    answer: 'Yes! Printify Notes works perfectly with Unacademy lecture slides and notes. Upload the PDF, enable color inversion to convert dark to light, and download a clean, printable version. All processing happens locally in your browser, ensuring your study materials remain private.',
  },
  {
    question: 'How to convert dark notes to light for printing?',
    answer: 'Upload your dark-themed PDF, and Printify Notes will invert the colors automatically. You can also adjust brightness, contrast, and convert to grayscale for maximum ink savings. Works with notes from PW, Unacademy, Vedantu, BYJU\'s, Allen Digital, and any other platform.',
  },
  {
    question: 'Is Printify Notes really free?',
    answer: 'Yes, Printify Notes is completely free to use. There are no hidden fees, subscriptions, or premium features locked behind a paywall. Process as many PDFs as you need without any limits.',
  },
  {
    question: 'Are my documents secure?',
    answer: 'Absolutely. All processing happens directly in your browser using client-side JavaScript. Your files are never uploaded to any server. When you close the tab, all data is gone. Your coaching notes and study materials remain 100% private.',
  },
  {
    question: 'Can I print NEET and JEE preparation notes?',
    answer: 'Yes! Printify Notes is perfect for converting dark-themed NEET and JEE preparation materials from any coaching platform. Whether it\'s physics, chemistry, biology, or mathematics notes, you can convert them to ink-saving printable format.',
  },
  {
    question: 'Does it work with Vedantu and BYJU\'s notes?',
    answer: 'Absolutely. Printify Notes works with PDF notes and slides from Vedantu, BYJU\'s, Aakash, Motion, Competishun, and any other online coaching platform. Just upload the PDF and convert it for printing.',
  },
  {
    question: 'How much ink can I save?',
    answer: 'By inverting dark backgrounds to white and converting to grayscale, you can save up to 60% on ink usage compared to printing the original dark PDFs. This makes a significant difference when printing hundreds of pages of study material.',
  },
  {
    question: 'Can I combine multiple pages on one sheet?',
    answer: 'Yes! You can combine 2, 3, or 4 pages per sheet in either portrait or landscape orientation. This is perfect for creating compact study handouts or saving paper when printing extensive notes.',
  },
  {
    question: 'What types of PDFs work best?',
    answer: 'Printify Notes works great with dark-themed lecture slides, coaching notes, code screenshots, IDE exports, dark-mode presentations, and any PDF with a dark background that you want to convert for printing.',
  },
  {
    question: 'What browsers are supported?',
    answer: 'Printify Notes works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.',
  },
  {
    question: 'Can I use this on mobile devices?',
    answer: 'Yes! Printify Notes is fully responsive and works on tablets and smartphones. However, for the best experience with large documents, we recommend using a desktop browser.',
  },
];

export const FAQ = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: accordionRef, isVisible: accordionVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="section-padding bg-card/30" id="faq">
      <div className="container-tight">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="inline-block text-sm text-glow font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about converting dark PDFs for printing — 
            from PW notes to Unacademy slides and more.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div 
          ref={accordionRef}
          className={`max-w-3xl mx-auto scroll-hidden ${accordionVisible ? 'scroll-visible' : ''}`}
        >
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
