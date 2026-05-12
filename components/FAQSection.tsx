"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "What services does Redlix offer?",
        answer: "Redlix provides a comprehensive suite of digital solutions, including custom software development, high-performance systems architecture, digital transformation consulting, and enterprise-grade web applications tailored to your specific business needs."
    },
    {
        question: "How do I start a project with you?",
        answer: "Starting a project is simple. You can schedule a discovery call through our website or contact our sales team directly. We'll discuss your vision, requirements, and objectives to create a tailored roadmap for your project."
    },
    {
        question: "What is the typical project timeline?",
        answer: "Timelines vary depending on the complexity and scope of the project. A standard enterprise application typically takes between 8 to 16 weeks from discovery to deployment. We provide detailed milestones and regular updates throughout the process."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes, we provide ongoing maintenance, security updates, and performance optimization services after your project is launched to ensure your systems continue to operate at peak efficiency and evolve with your business."
    },
    {
        question: "How do you handle data security?",
        answer: "Security is built into every layer of our development process. We implement industry-standard encryption, secure authentication protocols, and regular security audits to protect your data and ensure compliance with global standards."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-white py-20 md:py-32 border-t border-gray-100 font-sans">
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Side: Header */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-[32px] md:text-[42px] font-semibold text-gray-900 tracking-tight leading-none mb-6">
                                Frequently<br />Asked Questions
                            </h2>
                            <p className="text-gray-500 text-[16px] leading-relaxed max-w-xs">
                                Everything you need to know about partnering with Redlix for your next digital transformation.
                            </p>
                            <div className="mt-10">
                                <a 
                                    href="mailto:support@redlix.co.in" 
                                    className="text-[14px] font-semibold text-[#E61E32] hover:underline"
                                >
                                    Still have questions? Contact us
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="lg:w-2/3">
                        <div className="divide-y divide-gray-100 border-t border-gray-100">
                            {faqs.map((faq, index) => (
                                <div key={index} className="group">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between py-8 text-left focus:outline-none transition-all"
                                    >
                                        <span className={`text-[18px] md:text-[20px] font-semibold transition-colors duration-300 ${openIndex === index ? "text-[#E61E32]" : "text-gray-900 group-hover:text-gray-600"}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${openIndex === index ? "bg-[#E61E32] text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"}`}>
                                            {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </div>
                                    </button>
                                    <div 
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[500px] pb-8 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <p className="text-[15px] md:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-medium">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
