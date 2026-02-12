import React , {useState, useEffect} from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CompanyLogosSlider from '../components/CompanyLogosSlider';

const SETTINGS_URL = import.meta.env.VITE_MEMORIC_SETTINGS_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

export default function Services() {
    const [osDescription, setOsDescription] = useState("");
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const res = await fetch(
                    `${SETTINGS_URL}`,
                    {
                        headers: {
                            Authorization: `token ${API_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await res.json();

                setOsDescription(data?.data?.os_description || "");
                setServices(data?.data?.services || []);
                console.log("Fetched Services Data:", data);
            } catch (err) {
                console.error("Services API Error:", err);
            }
        };

        fetchServicesData();
    }, []);

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
                    <div
                        className="text-sm sm:text-base md:text-lg text-slate-600 
             leading-relaxed max-w-3xl mx-auto px-2"
                        dangerouslySetInnerHTML={{ __html: osDescription }}
                    />
                </div>

                {/* Services Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {services.map((service, idx) => (
                        <Card
                            key={idx}
                            className="p-5 md:p-6 lg:p-8 rounded-xl border-2 border-slate-200 
               hover:border-slate-900 shadow-sm hover:shadow-xl 
               transition-all duration-300 ease-in-out flex flex-col"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-xl 
                    flex items-center justify-center shadow-lg">
                                <span className="text-2xl md:text-3xl">
                                    {service.icon || "✨"}
                                </span>
                            </div>

                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                                {service.service}
                            </h3>

                            <div
                                className="text-sm md:text-base text-slate-600 leading-relaxed flex-grow"
                                dangerouslySetInnerHTML={{ __html: service.description }}
                            />
                        </Card>
                    ))}
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
                {/* <CompanyLogosSlider /> */}
            </div>
        </div>
    );
}