"use client";

import React, { useState, useEffect } from "react";
import { X, Settings, ShieldCheck, PieChart } from "lucide-react";

export default function CookieButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [preferencesOn, setPreferencesOn] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);
    const [hasDecided, setHasDecided] = useState(false);

    useEffect(() => {
        const savedPrefs = localStorage.getItem("redlix_cookie_prefs");
        if (savedPrefs) {
            const parsed = JSON.parse(savedPrefs);
            setPreferencesOn(parsed.performance);
            setHasDecided(true);

            if (parsed.performance && (window as any).gtag) {
                (window as any).gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });
            }
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        document.documentElement.setAttribute("data-experience-level", preferencesOn ? "optimized" : "standard");
        if (preferencesOn) {
            document.body.classList.add("system-upgrade-active");
        } else {
            document.body.classList.remove("system-upgrade-active");
        }
    }, [preferencesOn, isHydrated]);

    const handleSave = (allAccepted: boolean, prefValue?: boolean) => {
        const value = allAccepted ? true : (prefValue ?? preferencesOn);
        setPreferencesOn(value);
        localStorage.setItem("redlix_cookie_prefs", JSON.stringify({
            essential: true,
            performance: value,
            timestamp: new Date().toISOString()
        }));
        setIsOpen(false);
        setHasDecided(true);

        if ((window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'analytics_storage': value ? 'granted' : 'denied',
                'ad_storage': value ? 'granted' : 'denied',
                'ad_user_data': value ? 'granted' : 'denied',
                'ad_personalization': value ? 'granted' : 'denied'
            });
        }
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    if (!isHydrated) return null;

    return (
        <>
            {/* The Light Glass Dock */}
            {!hasDecided && !isOpen && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] md:w-max z-[120] animate-in slide-in-from-bottom-24 fade-in duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <div className="relative overflow-hidden bg-white/90 backdrop-blur-3xl border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[32px] px-3 py-3 md:px-5 md:py-5 flex flex-col md:flex-row items-center gap-4 md:gap-10">
                        
                        {/* Premium Scanner Effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E61E32]/50 to-transparent animate-[scan_3s_infinite]" />
                        
                        <div className="flex items-center gap-5 pl-2 md:pl-4">
                            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[26px] shrink-0">
                                🍪
                            </div>
                            <div className="flex flex-col max-w-[320px]">
                                <span className="text-gray-900 text-[14px] font-semibold tracking-tight leading-tight mb-1">We use cookies to improve your experience</span>
                                <p className="text-gray-500 text-[12px] leading-relaxed">
                                    Our studio uses these technologies for site security, performance analytics, and to provide personalized freelance services. 
                                    <a href="/cookies" className="ml-1 text-[#E61E32] hover:underline font-semibold">Learn more about our policy</a>
                                </p>
                            </div>
                        </div>

                        <div className="h-10 w-[1px] bg-gray-100 hidden md:block" />

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button 
                                onClick={() => handleSave(true)}
                                className="flex-1 md:flex-none px-10 py-3.5 bg-black text-white text-[13px] font-semibold rounded-[24px] hover:bg-[#E61E32] transition-all duration-500 active:scale-95 whitespace-nowrap"
                            >
                                Accept all
                            </button>
                            <button 
                                onClick={() => handleSave(false, false)}
                                className="flex-1 md:flex-none px-8 py-3.5 bg-gray-50 text-gray-900 text-[13px] font-semibold rounded-[24px] border border-gray-200 hover:bg-gray-100 transition-all duration-500 active:scale-95 whitespace-nowrap"
                            >
                                Decline
                            </button>
                            <button 
                                onClick={() => setIsOpen(true)}
                                className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-500 shrink-0"
                                title="Cookie settings"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Settings Overhaul (Light Theme) */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-md z-[125] transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsOpen(false)}
            />

            <div
                className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] md:w-[500px] bg-white border border-gray-100 z-[130] shadow-[0_0_80px_rgba(0,0,0,0.05)] rounded-[40px] flex flex-col transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}`}
            >
                <div className="p-10 md:p-12">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h2 className="text-gray-900 text-[28px] font-semibold tracking-tight leading-none mb-3">System controls</h2>
                            <p className="text-gray-400 text-[14px] font-medium leading-relaxed">Customize your digital interaction nodes and privacy settings.</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-all">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="group p-6 rounded-[32px] bg-gray-50 border border-gray-100 hover:border-[#E61E32]/30 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#E61E32]/10 flex items-center justify-center text-[#E61E32]">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h4 className="text-gray-900 font-semibold text-[16px]">Core infrastructure</h4>
                            </div>
                            <p className="text-gray-400 text-[13px] leading-relaxed ml-14">These are strictly necessary for the website to function, including secure authentication and form submissions.</p>
                        </div>

                        <div className="group p-6 rounded-[32px] bg-gray-50 border border-gray-100 hover:border-[#E61E32]/30 transition-all duration-500">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <PieChart className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-gray-900 font-semibold text-[16px]">Telemetry node</h4>
                                </div>
                                <button
                                    onClick={() => setPreferencesOn(!preferencesOn)}
                                    className={`relative w-14 h-7 rounded-full transition-all duration-500 ${preferencesOn ? "bg-[#E61E32]" : "bg-gray-200"}`}
                                >
                                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-500 shadow-sm ${preferencesOn ? "translate-x-7" : "translate-x-0"}`} />
                                </button>
                            </div>
                            <p className="text-gray-400 text-[13px] leading-relaxed ml-14">Enables us to analyze site traffic and improve the studio workflow through anonymous usage monitoring.</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-10 border-t border-gray-100 bg-gray-50/50">
                    <button
                        onClick={() => handleSave(false)}
                        className="w-full py-5 bg-black text-white text-[14px] font-semibold rounded-[24px] hover:bg-[#E61E32] transition-all duration-500 shadow-lg active:scale-[0.98]"
                    >
                        Apply parameters
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </>
    );
}








