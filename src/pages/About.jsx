import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Lightbulb, Award } from "lucide-react";

function TeamCard({ name, role, bio }) {
  return (
    <Card className="p-8 text-center flex flex-col items-center gap-4 border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl">
        👤
      </div>
      <div>
        <h4 className="font-bold text-xl text-slate-900">{name}</h4>
        <p className="text-sm text-slate-600 font-medium mt-1">{role}</p>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{bio}</p>
    </Card>
  );
}

export default function About() {
  return (
    <div className="w-full bg-slate-50 py-20">
      <div className="container mx-auto max-w-6xl px-6 space-y-20">

        {/* Header */}
        <div className="text-center">
          <Badge className="mb-4 bg-slate-900 text-white px-4 py-1.5">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Building the Future with Responsible AI
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We bridge the gap between AI innovation and practical business value
          </p>
        </div>

        {/* Mission */}
        <section>
          <div className="flex justify-center">
            <Card className="p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl max-w-4xl border-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-slate-200 leading-relaxed">
                Empowering organizations to adopt AI responsibly through expert training, strategic guidance, and applied research.
              </p>
            </Card>
          </div>
        </section>

        {/* Expertise */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            What We Do Best
          </h2>
          <div className="flex justify-center">
            <Card className="bg-white border-2 border-slate-100 p-10 shadow-lg max-w-4xl">
              <div className="space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed">
                  Our team leverages expertise in AI technology, business management, and education
                  to deliver practical solutions. We conduct research on AI governance
                  and economic impact, guide organizations through secure AI implementation,
                  and provide hands-on training for executives, educators, and students.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Whether you're looking to understand AI's potential for your business,
                  need help choosing the right tools, or want to build AI skills in your
                  team, we work with you to unlock AI's value while ensuring responsible use.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Leadership */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            Meet Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TeamCard 
              name="Mr. X" 
              role="Chief Executive Officer" 
              bio="Leading the vision for accessible AI education and consulting with 15+ years in technology leadership." 
            />
            <TeamCard 
              name="Ms. Y" 
              role="Chief Operating Officer" 
              bio="Driving operational excellence and strategic partnerships to scale our impact across organizations." 
            />
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Quality</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We deliver exceptional work that drives real results, maintaining the highest standards in everything we do.
              </p>
            </Card>
            
            <Card className="p-8 text-center border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Ethics</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We prioritize ethical and honest practices, to build trust through reliable and transparent work.
              </p>
            </Card>
            
            
            
            <Card className="p-8 text-center border-2 border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-xl text-slate-900 mb-3">Clarity</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We communicate complex AI concepts simply and accessibly, ensuring everyone can understand and apply them.
              </p>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}