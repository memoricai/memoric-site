import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Services() {
    return (
        <div className="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 py-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Services
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        We offer customized solutions to help your organization understand, adopt, and innovate with AI, enabling you to stay ahead in the age of intelligence.
                    </p>
                </div>

                {/* Services Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="p-8 rounded-xl border border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out">
                        <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-3xl text-white">🎓</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Training</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Modules tailored for executives, managers, and staff. We build AI literacy and fluency across your organization. AI literacy focuses on understanding how AI solves business problems and automates routine work. AI fluency develops hands-on skills with AI tools and the confidence to choose and use them effectively.
                        </p>
                    </Card>

                    <Card className="p-8 rounded-xl border border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out">
                        <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-3xl text-white">💼</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Strategic Consulting</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We guide your organization through secure, responsible AI adoption. Our work spans AI strategy, use case identification, tooling choices, and governance models, so you can innovate with confidence while managing risk.
                        </p>
                    </Card>

                    <Card className="p-8 rounded-xl border border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out">
                        <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-3xl text-white">🔬</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Research</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We conduct cutting-edge research on responsible AI adoption, process improvement, and economic impact. Our team collaborates with leading international universities, businesses, and research institutions to turn insights into practical, measurable outcomes.
                        </p>
                    </Card>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <a href="mailto:support@memoricai.in">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            Contact Us
                        </Button>
                    </a>
                </div>

            </div>
        </div>
    );
}