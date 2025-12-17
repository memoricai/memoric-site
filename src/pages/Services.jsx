import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CompanyLogosSlider from '../components/CompanyLogosSlider';

export default function Services() {
    return (
        <div className="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 
                      py-12 md:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                                 text-slate-900 mb-3 md:mb-4 lg:mb-6 tracking-tight">
                        Our Services
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 
                                leading-relaxed max-w-3xl mx-auto px-2">
                        We offer customized solutions to help your organization understand, adopt, 
                        and innovate with AI, enabling you to stay ahead in the age of intelligence.
                    </p>
                </div>

                {/* Services Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    
                    {/* Training */}
                    <Card className="p-5 md:p-6 lg:p-8 rounded-xl border-2 border-slate-200 
                                   hover:border-slate-900 shadow-sm hover:shadow-xl 
                                   transition-all duration-300 ease-in-out flex flex-col">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-xl 
                                      flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                            <span className="text-2xl md:text-3xl">🎓</span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 
                                     mb-2 md:mb-3 lg:mb-4">
                            Training
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed flex-grow">
                            Modules tailored for executives, managers, and staff. We build AI literacy 
                            and fluency across your organization. AI literacy focuses on understanding 
                            how AI solves business problems and automates routine work. AI fluency 
                            develops hands-on skills with AI tools and the confidence to choose and use 
                            them effectively.
                        </p>
                    </Card>

                    {/* Strategic Consulting */}
                    <Card className="p-5 md:p-6 lg:p-8 rounded-xl border-2 border-slate-200 
                                   hover:border-slate-900 shadow-sm hover:shadow-xl 
                                   transition-all duration-300 ease-in-out flex flex-col">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-xl 
                                      flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                            <span className="text-2xl md:text-3xl">💼</span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 
                                     mb-2 md:mb-3 lg:mb-4">
                            Strategic Consulting
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed flex-grow">
                            We guide your organization through secure, responsible AI adoption. Our work 
                            spans AI strategy, use case identification, tooling choices, and governance 
                            models, so you can innovate with confidence while managing risk.
                        </p>
                    </Card>

                    {/* Research */}
                    <Card className="p-5 md:p-6 lg:p-8 rounded-xl border-2 border-slate-200 
                                   hover:border-slate-900 shadow-sm hover:shadow-xl 
                                   transition-all duration-300 ease-in-out flex flex-col 
                                   md:col-span-2 lg:col-span-1">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-xl 
                                      flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                            <span className="text-2xl md:text-3xl">🔬</span>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 
                                     mb-2 md:mb-3 lg:mb-4">
                            Research
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed flex-grow">
                            We conduct cutting-edge research on responsible AI adoption, process 
                            improvement, and economic impact. Our team collaborates with leading 
                            international universities, businesses, and research institutions to turn 
                            insights into practical, measurable outcomes.
                        </p>
                    </Card>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-10 md:mt-12 lg:mt-16">
                    <a href="#contact">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white 
                                         px-6 md:px-8 py-3 md:py-4 
                                         text-sm md:text-base lg:text-lg font-medium 
                                         rounded-lg shadow-lg hover:shadow-xl 
                                         transition duration-300">
                            Contact Us
                        </Button>
                    </a>
                </div>

            </div>
            
            {/* Company Logos */}
            <div className="mt-12 md:mt-16 lg:mt-20">
                <CompanyLogosSlider />
            </div>
        </div>
    );
}