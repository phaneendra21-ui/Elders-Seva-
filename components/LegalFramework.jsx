import React from 'react';

const LegalFramework = () => {
    const acts = [
        {
            title: "The Digital Inclusion Act 2025",
            description: "Mandates that every digital public service must provide at least one non-biometric alternative for citizens over 65. It establishes that biological aging is a valid ground for authentication bypass.",
            status: "Enacted"
        },
        {
            title: "Right to Authenticate Doctrine",
            description: "A legal principle ensuring that biological changes (aging) cannot be used as grounds to deny constitutional benefits. It places the burden of proof on the system, not the citizen.",
            status: "Supreme Court Precedent"
        },
        {
            title: "Biometric Exception Protocol (BEP)",
            description: "Standardized manual override procedures for Aadhaar and other identity systems when fingerprint or iris scores fall below critical thresholds due to aging-related friction loss.",
            status: "Active Policy"
        }
    ];

    const helplines = [
        { name: "National Elder Helpline", number: "14567", desc: "Toll-free 'Elderline' for senior citizens' rights, support, and immediate grievance redressal." },
        { name: "UIDAI Aadhaar Helpdesk", number: "1947", desc: "Official helpline for reporting persistent biometric authentication failures and requesting exception handling." },
        { name: "National Legal Aid", number: "15100", desc: "NALSA helpline for free legal counseling regarding denial of services due to technical failures." }
    ];

    const govServices = [
        { name: "PDS / Ration Support", channel: "State Food Dept", desc: "Protocols for manual grain distribution at Fair Price Shops when PoS biometric devices fail." },
        { name: "Pension (DBT) Helpdesk", channel: "Social Welfare Office", desc: "Manual verification for life certificates via signatures or physical appearance checks." },
        { name: "Health (AB-PMJAY)", channel: "Arogya Mitra", desc: "Hospital-level exception handling for medical benefits when fingerprint scanning fails." }
    ];

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-16">
                <span className="text-blue-800 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">National Administrative Gateway</span>
                <h1 className="text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">Legal Rights & Protection</h1>
                <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
                    Technology must serve the citizen, not exclude them. Below is the official portal for understanding your legal rights and accessing support for biometric authentication barriers.
                </p>
            </div>

            {/* HELPLINE DIRECTORY (Middle Section - Directly Visible) */}
            <div className="mb-20">
                <h2 className="text-xs font-black text-blue-800 uppercase tracking-[0.3em] mb-8 text-center">Primary Rights Support Helplines</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {helplines.map((hl, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 border-t-8 border-t-blue-800 flex flex-col h-full hover:scale-[1.02] transition-transform">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{hl.name}</h4>
                            <p className="text-4xl font-black mb-4 text-gray-900 tracking-tighter">{hl.number}</p>
                            <p className="text-gray-500 font-medium text-sm mb-6 flex-grow">{hl.desc}</p>
                            <a
                                href={`tel:${hl.number}`}
                                className="w-full bg-blue-800 text-white py-4 rounded-xl font-black text-sm text-center uppercase tracking-widest hover:bg-blue-900 transition-colors"
                            >
                                Call Support
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* GOVERNMENT SERVICES DIRECTORY (Middle Section) */}
            <div className="bg-gray-900 rounded-[3.5rem] p-12 text-white mb-20 relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-white/10 pb-8">
                        <h2 className="text-3xl font-black uppercase tracking-tight text-blue-400">Exception Handling Channels</h2>
                        <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zM7 7a3 3 0 016 0v2H7V7z" /></svg>
                            <span>Legal Overrides</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {govServices.map((service, i) => (
                            <div key={i} className="space-y-4 group">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">{i + 1}</div>
                                    <h4 className="text-xl font-black uppercase text-blue-400">{service.name}</h4>
                                </div>
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">{service.channel}</p>
                                <p className="text-gray-300 font-medium leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* LEGAL PILLARS (End of Page) */}
            <div className="pt-16 border-t border-gray-100">
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Your Legal Protections</h3>
                    <p className="text-gray-500 font-medium mt-2">The statutory frameworks that ensure your inclusion.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {acts.map((act, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">{act.status}</span>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{act.title}</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">{act.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-20 text-center">
                <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
                    Official National Inclusion Portal © 2026 Administrative Coordination Cell
                </p>
            </div>
        </div>
    );
};

export default LegalFramework;
