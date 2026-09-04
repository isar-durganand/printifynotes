import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
    return (
        <PageLayout
            title="Disclaimer"
            description="Read the Printify Notes disclaimer. Important information about our website content, advertising, educational material, and liability limitations."
            keywords="printify notes disclaimer, website disclaimer, advertising disclosure, educational disclaimer"
        >
            <div className="max-w-4xl mx-auto">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                        Legal
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
                        Disclaimer
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        <strong>Last updated:</strong> August 9, 2026
                    </p>
                </div>

                <div className="space-y-5">
                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">General Disclaimer</h2>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            The information provided on Printify Notes (www.printifynotes.in) is for general informational
                            and educational purposes only. All information on the site is provided in good faith; however,
                            we make no representation or warranty of any kind, express or implied, regarding the accuracy,
                            adequacy, validity, reliability, availability, or completeness of any information on the site.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Under no circumstance shall we have any liability to you for any loss or damage of any kind
                            incurred as a result of the use of the site or reliance on any information provided on the site.
                            Your use of the site and your reliance on any information on the site is solely at your own risk.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">Advertising Disclosure</h2>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Printify Notes is a free service. To support the continued development and maintenance of
                            our free tools, this website displays advertisements provided by third-party advertising
                            networks, including <strong className="text-foreground">Google AdSense</strong>.
                        </p>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Google AdSense uses cookies to serve ads based on your prior visits to this website or
                            other websites. Google's use of advertising cookies enables it and its partners to serve
                            ads to you based on your visit to this site and/or other sites on the Internet.
                        </p>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            You may opt out of personalized advertising by visiting{' '}
                            <a
                                href="https://www.google.com/settings/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#007AFF] font-medium hover:underline"
                            >
                                Google Ads Settings
                            </a>. You may also visit{' '}
                            <a
                                href="https://www.aboutads.info/choices/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#007AFF] font-medium hover:underline"
                            >
                                www.aboutads.info/choices
                            </a>{' '}
                            to opt out of third-party vendors' use of cookies for personalized advertising.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            The advertisements displayed on this website are not endorsements of any products or
                            services. We do not control the content of these advertisements and are not responsible
                            for any claims made by advertisers.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">Educational Content Disclaimer</h2>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            The educational content, study tips, and guides published on our blog are intended to be
                            helpful resources for students. However, they should not be considered as professional
                            educational advice. Results may vary based on individual study habits, subject matter, and
                            personal circumstances.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Printify Notes is not affiliated with, endorsed by, or officially connected to any educational
                            platforms mentioned on this website, including but not limited to Physics Wallah, Unacademy,
                            Vedantu, BYJU'S, Allen Digital, Aakash, or any other coaching institute. All trademarks and
                            brand names are the property of their respective owners and are used solely for identification
                            and informational purposes.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">Tool Accuracy Disclaimer</h2>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Our PDF tools (dark PDF converter, PDF merger, compressor, image-to-PDF converter, and
                            page extractor) are provided "as is" without warranties of any kind. While we strive for
                            accurate output, results may vary depending on the complexity and format of input files.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We recommend verifying the output of any conversion before relying on it for important
                            purposes such as exam submissions or official document printing. Always keep backup copies
                            of your original files.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">Affiliate & Recommendation Disclaimer</h2>
                        <p className="text-muted-foreground text-sm mb-3.5 leading-relaxed">
                            Some articles on our blog may contain recommendations for products, services, or tools.
                            These recommendations are based on our genuine assessment and experience. We may receive
                            compensation through affiliate partnerships for some of these recommendations, but this
                            does not influence our editorial content or opinions.
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We only recommend products or services that we believe will provide genuine value to
                            our users. Any affiliate relationship will be clearly disclosed in the relevant content.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">External Links Disclaimer</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            This website may contain links to external websites that are not provided or maintained
                            by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any
                            information on these external websites. The inclusion of any link does not imply endorsement,
                            approval, or control by Printify Notes over the content of the external site.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">Fair Use Notice</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            This website may contain copyrighted material, the use of which may not always have been
                            specifically authorized by the copyright owner. We believe this constitutes "fair use" of
                            such material as provided for in applicable copyright law. The material on this site is
                            distributed for educational and informational purposes only, without profit, to those who
                            have expressed a prior interest in receiving the included information for research and
                            educational purposes.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">Changes to This Disclaimer</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We reserve the right to modify or update this disclaimer at any time without prior notice.
                            Changes will be effective immediately upon posting on this page. We encourage you to review
                            this disclaimer periodically for any updates.
                        </p>
                    </section>

                    <section className="p-6 sm:p-8 rounded-[26px] bg-card hairline-border shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-3 text-foreground">Contact Information</h2>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                            If you have any questions or concerns about this disclaimer, please contact us at:
                        </p>
                        <p className="text-muted-foreground text-sm mb-2">
                            Email:{' '}
                            <a href="mailto:isardurganand@gmail.com" className="text-[#007AFF] font-medium hover:underline">
                                isardurganand@gmail.com
                            </a>
                        </p>
                        <p className="text-muted-foreground text-sm">
                            You can also reach us via our{' '}
                            <Link to="/contact" className="text-[#007AFF] font-medium hover:underline">
                                contact page
                            </Link>.
                        </p>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
};

export default Disclaimer;
