import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send } from "lucide-react";
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, organization, email, message } = formData;

    if (!firstName || !email || !message) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/method/memoric_frappe.api.contact_us.send_contact_email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            message: message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.exc) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        organization: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.name !== 'message') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                       text-slate-900 mb-3 md:mb-4 lg:mb-6 tracking-tight">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 
                      max-w-2xl mx-auto px-2">
            We're here to answer questions, discuss your AI training needs, or explore 
            how we can support your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12">

          {/* Contact Info Cards - Left Side */}
          <div className="lg:col-span-2 space-y-4 md:space-y-5 lg:space-y-6">
            
            {/* Email Card */}
            <Card className="p-4 md:p-5 lg:p-6 border-2 border-slate-100 
                           hover:border-slate-900 transition-all duration-300">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-lg 
                              flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
                    Email
                  </h3>
                  <a href="mailto:support@memoricai.in" 
                     className="text-xs sm:text-sm font-semibold text-slate-900 
                              hover:underline break-all">
                    support@memoricai.in
                  </a>
                </div>
              </div>
            </Card>

            {/* Office Card */}
            <Card className="p-4 md:p-5 lg:p-6 border-2 border-slate-100 
                           hover:border-slate-900 transition-all duration-300">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-lg 
                              flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
                    Office
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Bangalore, India
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <Card className="p-5 md:p-6 lg:p-8 border-2 border-slate-100 shadow-lg">
              <div className="space-y-4 md:space-y-5 lg:space-y-6">

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold 
                                    text-slate-900 mb-1.5 md:mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="John"
                      className="h-10 md:h-11 lg:h-12 border-slate-200 
                               focus:border-slate-900 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold 
                                    text-slate-900 mb-1.5 md:mb-2">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Doe"
                      className="h-10 md:h-11 lg:h-12 border-slate-200 
                               focus:border-slate-900 text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold 
                                  text-slate-900 mb-1.5 md:mb-2">
                    Organization
                  </label>
                  <Input
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Your company or institution"
                    className="h-10 md:h-11 lg:h-12 border-slate-200 
                             focus:border-slate-900 text-sm md:text-base"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold 
                                  text-slate-900 mb-1.5 md:mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="john@example.com"
                    className="h-10 md:h-11 lg:h-12 border-slate-200 
                             focus:border-slate-900 text-sm md:text-base"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold 
                                  text-slate-900 mb-1.5 md:mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="min-h-28 sm:min-h-32 md:min-h-40 border-slate-200 
                             focus:border-slate-900 resize-none text-sm md:text-base"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white 
                           font-semibold py-3 md:py-4 lg:py-6 text-sm md:text-base 
                           group cursor-pointer"
                >
                  Send Message
                  <Send className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 
                                 group-hover:translate-x-1 transition-transform" />
                </Button>

              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}