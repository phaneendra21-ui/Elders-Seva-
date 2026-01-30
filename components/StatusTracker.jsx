import React, { useState, useEffect } from 'react';

const INITIAL_MOCK_DATA = [
    { id: "XXXX XXXX 4521", name: "R. Subramanian", service: "Old Age Pension", region: "Tamil Nadu", status: "Approved", date: "2 mins ago" },
    { id: "XXXX XXXX 8812", name: "Savitri Devi", service: "Ration (PDS)", region: "Uttar Pradesh", status: "Verification", date: "15 mins ago" },
    { id: "XXXX XXXX 3009", name: "Mohammad Ishaq", service: "Health Benefits", region: "Kerala", status: "Approved", date: "1 hour ago" },
    { id: "XXXX XXXX 1142", name: "Gopal Das", service: "Pension", region: "West Bengal", status: "Pending", date: "3 hours ago" },
    { id: "XXXX XXXX 9901", name: "Lakshmi Bai", service: "Banking KYC", region: "Maharashtra", status: "Approved", date: "5 hours ago" },
    { id: "XXXX XXXX 2277", name: "Harpal Singh", service: "LPG Subsidy", region: "Punjab", status: "Verification", date: "Yesterday" },
];

const StatusTracker = () => {
    const [aadhaarId, setAadhaarId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [systemMessage, setSystemMessage] = useState('');

    // State-driven registry with localStorage persistence
    const [publicRegistry, setPublicRegistry] = useState([]);

    // Initialize from LocalStorage
    useEffect(() => {
        const savedData = localStorage.getItem('elders_seva_registry');
        if (savedData) {
            try {
                setPublicRegistry(JSON.parse(savedData));
            } catch (e) {
                setPublicRegistry(INITIAL_MOCK_DATA);
            }
        } else {
            setPublicRegistry(INITIAL_MOCK_DATA);
            localStorage.setItem('elders_seva_registry', JSON.stringify(INITIAL_MOCK_DATA));
        }
    }, []);

    const mockSteps = [
        { title: 'Application Submitted', description: 'Exception request registered in the National Portal.', date: 'Oct 12, 2025', isCompleted: true, isCurrent: false },
        { title: 'Technical Audit', description: 'Automated check completed. Biometric mismatch confirmed due to age-related friction loss.', date: 'Oct 14, 2025', isCompleted: true, isCurrent: false },
        { title: 'Manual Field Verification', description: 'Regional officer is currently verifying physical foundational documents.', date: 'Oct 16, 2025', isCompleted: false, isCurrent: true },
        { title: 'Final Disbursement', description: 'Authorized override for service activation.', date: '--', isCompleted: false, isCurrent: false },
    ];

    // Enhanced resource allocation data
    const resourceAllocation = [
        { service: 'Old Age Pension', allocated: true, amount: '₹2,500/month', nextPayment: 'Nov 1, 2025', status: 'Active' },
        { service: 'Health Insurance', allocated: true, amount: '₹30,000 coverage', nextRenewal: 'Mar 2026', status: 'Active' },
        { service: 'Ration Subsidy', allocated: false, amount: 'Pending', nextPayment: 'Verification Required', status: 'Pending' },
        { service: 'Medical Aid', allocated: true, amount: '₹5,000 available', nextPayment: 'As needed', status: 'Active' },
    ];

    // Next actions for the user
    const nextActions = [
        { action: 'Visit Local Block Office', deadline: 'Within 7 days', priority: 'High', contact: '+91-1800-XXX-XXXX' },
        { action: 'Submit Medical Certificate', deadline: 'Within 14 days', priority: 'Medium', contact: 'blockoffice@gov.in' },
        { action: 'Update Bank Details', deadline: 'Within 30 days', priority: 'Low', contact: 'Your bank branch ui' },
    ];

    // Local support contacts
    const supportContacts = {
        regionalOffice: { name: 'District Social Welfare Office', phone: '+91-044-2855-XXXX', email: 'dsw@gov.in', address: '123 Gandhi Road, Chennai - 600001' },
        medical: { name: 'Government Hospital', phone: '+91-044-2852-XXXX', email: 'hospital@gov.in', address: '456 Anna Nagar, Chennai - 600040' },
    };

    const handleTrack = (e) => {
        e.preventDefault();
        if (aadhaarId.length !== 12) {
            alert("Please enter a valid 12-digit Aadhaar Identification Number.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const masked = `******** ${aadhaarId.slice(-4)}`;
            setSystemMessage(`Official record found for ID: ${masked}. Your request for 'Biometric Exception' is currently under 'Manual Field Verification'. A regional officer at your local block office is processing the override. Please keep your physical ID ready for any field visits.`);

            // Add record to the "Live" persistent registry
            const newEntry = {
                id: `XXXX XXXX ${aadhaarId.slice(-4)}`,
                name: "Private Citizen",
                service: "Manual Exception",
                region: "Detected Locale",
                status: "Verification",
                date: "Just Now"
            };

            const updatedRegistry = [newEntry, ...publicRegistry.slice(0, 9)];
            setPublicRegistry(updatedRegistry);
            localStorage.setItem('elders_seva_registry', JSON.stringify(updatedRegistry));

            setShowStatus(true);
            setLoading(false);
        }, 950);
    };

    return (
        <div className="w-full max-w-[95%] mx-auto py-4 px-2 space-y-6">
            {/* Search Header */}
            <div className="text-center">
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Official Verification System</span>
                <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">Identity Status Tracker</h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                    Verify the real-time progress of your biometric exception or manual override status.
                </p>
            </div>

            {/* DISTINCT AADHAAR SEARCH SECTION */}
            <div className="bg-white rounded-[3.5rem] shadow-[0_35px_100px_-15px_rgba(0,0,0,0.12)] border-2 border-blue-50 overflow-hidden max-w-4xl mx-auto relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-40"></div>

                <div className="bg-blue-800 p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight leading-none">Individual Identity Search</h3>
                            <p className="text-blue-200 text-xs font-bold mt-1 uppercase tracking-widest opacity-80">Manual Override Registry</p>
                        </div>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] text-blue-100 font-black uppercase border border-white/20 backdrop-blur-sm self-start md:self-auto flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        Offline Protection Enabled
                    </div>
                </div>

                <div className="p-10 lg:p-16">
                    <form onSubmit={handleTrack} className="space-y-10">
                        <div className="relative">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
                                <label htmlFor="aadhaar-input" className="text-xs font-black text-blue-900 uppercase tracking-[0.2em] flex items-center">
                                    <span className="bg-blue-800 text-white w-5 h-5 rounded-md flex items-center justify-center text-[9px] mr-2 shadow-lg shadow-blue-800/20">ID</span>
                                    Citizen Identification Number (Aadhaar)
                                </label>
                                <span className="text-[10px] font-bold text-gray-400 uppercase italic">Requirement: 12 Numerical Digits Only</span>
                            </div>

                            <div className="relative group/input">
                                <input
                                    id="aadhaar-input"
                                    type="text"
                                    maxLength={12}
                                    placeholder="0000 0000 0000"
                                    className="w-full bg-gray-50 border-4 border-gray-100 rounded-3xl p-10 text-4xl sm:text-6xl font-mono font-bold text-blue-950 focus:border-blue-800 focus:bg-white focus:ring-8 focus:ring-blue-100 outline-none transition-all tracking-[0.25em] shadow-inner placeholder:text-gray-200"
                                    value={aadhaarId}
                                    onChange={(e) => setAadhaarId(e.target.value.replace(/\D/g, ''))}
                                    aria-label="Enter your 12-digit Aadhaar Identification Number"
                                    required
                                    autoComplete="off"
                                />

                                <div className={`absolute right-10 top-1/2 -translate-y-1/2 transition-all duration-500 scale-110 ${aadhaarId.length === 12 ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="bg-green-100 p-3 rounded-full text-green-600 shadow-lg shadow-green-100/50">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center space-x-3 text-gray-400 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                                <p className="text-[10px] font-black uppercase tracking-widest">Privacy Protocol: Aadhaar numbers are never stored on public servers. Search results are cached locally for offline reference.</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full bg-blue-800 text-white py-8 rounded-3xl font-black text-2xl shadow-2xl shadow-blue-800/40 hover:bg-blue-900 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center space-x-6"
                        >
                            {loading ? (
                                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="uppercase tracking-tighter">Initiate Status Query</span>
                                    <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </>
                            )}
                        </button>
                    </form>

                    {showStatus && (
                        <div className="mt-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                            <div className="bg-blue-50 rounded-[3rem] p-12 mb-16 border-l-[12px] border-blue-800 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="flex items-start space-x-8 relative z-10">
                                    <div className="bg-blue-800 w-24 h-24 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl shadow-blue-800/30 flex-shrink-0" aria-hidden="true">
                                        👤
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-black text-blue-900 mb-4 uppercase tracking-tight">Administrative Record Found</h4>
                                        <p className="text-blue-800 text-2xl leading-relaxed font-bold italic">{systemMessage}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Biometric Telemetry Analysis Section */}
                            <div className="mb-16 bg-red-50 rounded-[3rem] p-10 border-l-[12px] border-red-500 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <svg className="w-32 h-32 text-red-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl animate-pulse shadow-lg shadow-red-100">
                                            ⚠️
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-red-900 uppercase tracking-tight leading-none">Biometric Telemetry Analysis</h3>
                                            <p className="text-red-400 text-xs font-bold uppercase tracking-[0.3em] mt-2">Automated System Diagnostics</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm flex items-center gap-4 hover:border-red-200 transition-colors">
                                            <div className="text-3xl opacity-50 grayscale">🖐️</div>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fingerprint</div>
                                                <div className="text-red-600 font-black uppercase text-lg leading-none">Failed</div>
                                                <div className="text-[9px] text-red-400 font-bold mt-1">Elasticity Loss</div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm flex items-center gap-4 hover:border-green-200 transition-colors">
                                            <div className="text-3xl opacity-50 grayscale">👁️</div>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Iris Scan</div>
                                                <div className="text-green-600 font-black uppercase text-lg leading-none">Verified</div>
                                                <div className="text-[9px] text-green-600 font-bold mt-1">High Precision</div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm flex items-center gap-4 hover:border-green-200 transition-colors">
                                            <div className="text-3xl opacity-50 grayscale">👤</div>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Face Match</div>
                                                <div className="text-green-600 font-black uppercase text-lg leading-none">Verified</div>
                                                <div className="text-[9px] text-green-600 font-bold mt-1">Db Match Found</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-white/60 rounded-3xl border border-blue-200/50 backdrop-blur-sm">
                                        <div className="flex flex-col gap-6">
                                            <div>
                                                <h4 className="text-red-900 font-black uppercase tracking-tight text-xl">Fingerprint Decay Detected</h4>
                                                <p className="text-slate-600 font-medium text-sm mt-2 max-w-xl">
                                                    Primary authentication failed due to skin elasticity loss. However, secondary biometrics (Iris & Face) have confirmed identity.
                                                </p>
                                            </div>

                                            {/* The Solution */}
                                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                                                <div className="flex-1">
                                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">Recommended Solution</span>
                                                    <div className="text-blue-900 font-black uppercase text-xl leading-none mb-1">Doorstep "Jeevan Pramaan" (DLC)</div>
                                                    <div className="text-xs font-bold text-blue-600/80">Via Postal 'Aadhaar Mitra' Agent</div>
                                                    <div className="mt-3 flex items-center gap-2">
                                                        <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-1 rounded">REF ID: DLC-REQ-2026-X89</span>
                                                        <span className="text-[10px] font-bold text-blue-400">Traceable via Elder Line 14567</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                                                        <span className="text-green-500 font-bold">✓</span>
                                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Citizen: Zero Travel</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                                                        <span className="text-green-500 font-bold">✓</span>
                                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Gov: Geo-Tagged & Secure</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-600/20 text-center transform transition-transform hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2">
                                                <span>Auto-Action: Dispatching Doorstep Agent</span>
                                                <span className="opacity-50">|</span>
                                                <span>Ref: #DLC-REQ-2026-X89</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-3 text-[10px] font-bold text-red-400 uppercase tracking-widest opacity-80">
                                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping"></span>
                                        System Action: Regulation 14-B Auto-Triggered Manual Override Service
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-0 relative before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-1.5 before:bg-gray-100 ml-8" role="list" aria-label="Official timeline of your application">
                                {mockSteps.map((step, idx) => (
                                    <div key={idx} role="listitem" className={`relative pl-20 pb-20 ${step.isCurrent ? 'opacity-100' : step.isCompleted ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`absolute left-0 top-1 w-14 h-14 rounded-2xl border-4 flex items-center justify-center transition-all shadow-xl ${step.isCompleted ? 'bg-green-600 border-green-600 text-white' :
                                            step.isCurrent ? 'bg-white border-blue-800 text-blue-800 animate-pulse' :
                                                'bg-white border-gray-100 text-gray-200'
                                            }`} aria-hidden="true">
                                            {step.isCompleted ? (
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                            ) : (
                                                <span className="font-black text-xl">{idx + 1}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h5 className={`text-3xl font-black ${step.isCurrent ? 'text-blue-800' : 'text-gray-900'}`}>{step.title}</h5>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{step.date}</span>
                                        </div>
                                        <p className="text-gray-500 mt-3 font-medium text-2xl leading-relaxed max-w-2xl">{step.description}</p>
                                        {step.isCurrent && (
                                            <div className="mt-8 bg-blue-800 text-white text-[10px] font-black px-8 py-3 rounded-full inline-flex items-center space-x-3 uppercase tracking-widest shadow-lg shadow-blue-800/30">
                                                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                                                <span>Active Manual Exception Enabled</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-gray-100 flex justify-center">
                                <button
                                    onClick={() => { setShowStatus(false); setAadhaarId(''); }}
                                    className="text-gray-400 font-black hover:text-blue-800 transition-colors uppercase text-[10px] tracking-[0.3em] flex items-center space-x-4 px-10 py-4 rounded-2xl hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    <span>Return to Search</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Resource Allocation & Support Section */}
                    {showStatus && (
                        <div className="mt-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Resource Allocation Status */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-[8px] border-green-600 shadow-xl">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-green-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-green-600/30">
                                            💰
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-green-900 uppercase tracking-tight">Resource Allocation</h3>
                                            <p className="text-green-700 text-sm font-bold">Benefits allocated to you</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {resourceAllocation.map((resource, idx) => (
                                            <div key={idx} className="bg-white rounded-lg p-3 shadow border border-green-100">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-bold text-gray-900 text-sm">{resource.service}</h4>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${resource.allocated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {resource.status}
                                                    </span>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-gray-600 font-semibold text-sm">{resource.amount}</p>
                                                    <p className="text-xs text-gray-500">{resource.nextPayment || resource.nextRenewal}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>



                                {/* Next Steps & Benefits Box */}
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-l-[8px] border-purple-600 shadow-xl">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-purple-600 w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-600/30">
                                            📋
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-purple-900 uppercase tracking-tight">Next Steps</h3>
                                            <p className="text-purple-700 text-sm font-bold">After approval</p>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-xl border border-purple-100 bg-white shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-purple-50/50 border-b border-purple-100">
                                                    <th className="py-3 px-4 text-[9px] font-black text-purple-900 uppercase tracking-widest">Action Required</th>
                                                    <th className="py-3 px-4 text-[9px] font-black text-purple-900 uppercase tracking-widest">Priority</th>
                                                    <th className="py-3 px-4 text-[9px] font-black text-purple-900 uppercase tracking-widest">Due Date</th>
                                                    <th className="py-3 px-4 text-[9px] font-black text-purple-900 uppercase tracking-widest">Contact</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-purple-50">
                                                {nextActions.map((item, i) => (
                                                    <tr key={i} className="hover:bg-purple-50/30 transition-colors">
                                                        <td className="py-3 px-4 text-xs font-bold text-slate-700">{item.action}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`inline-flex px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${item.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                                item.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                                    'bg-blue-100 text-blue-700'
                                                                }`}>
                                                                {item.priority}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-tight">{item.deadline}</td>
                                                        <td className="py-3 px-4 text-xs font-mono text-slate-600 bg-slate-50/50 rounded">{item.contact}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Return to Search Button */}
                            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                                <button
                                    onClick={() => { setShowStatus(false); setAadhaarId(''); }}
                                    className="text-gray-400 font-black hover:text-blue-800 transition-colors uppercase text-xs tracking-widest flex items-center space-x-3 px-8 py-3 rounded-xl hover:bg-gray-50"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    <span>Return to Search</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Community Registry Section */}
            <div className="bg-gray-900 rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/5 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-50"></div>
                <div className="p-10 lg:p-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                        <div>
                            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">National Governance Ledger</span>
                            <h2 className="text-4xl font-black text-white leading-none uppercase tracking-tight">Active Exception Registry</h2>
                            <p className="text-gray-400 mt-6 text-xl max-w-2xl font-medium">
                                Live updates for senior citizens across administrative regions. Data is stored locally on this device for offline availability.
                            </p>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center space-x-4 bg-white/5 px-8 py-5 rounded-3xl border border-white/10 shadow-inner">
                                <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-white font-black text-sm uppercase tracking-widest">{14204 + publicRegistry.length} Registered Overrides</span>
                            </div>
                            <div className="bg-blue-400/10 px-6 py-2 rounded-xl text-[9px] font-black text-blue-400 uppercase tracking-widest border border-blue-400/20 text-center">
                                Local Database Sync: Active
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left" aria-label="National exception application registry">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Aadhaar (Masked)</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Citizen Name</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Admin Region</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Target Service</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Registry Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Verified At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {publicRegistry.map((entry, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-all group">
                                        <td className="px-8 py-7 font-mono font-bold text-gray-400 group-hover:text-blue-400">{entry.id}</td>
                                        <td className="px-8 py-7 font-black text-gray-100">{entry.name}</td>
                                        <td className="px-8 py-7 text-gray-400 font-bold uppercase text-[10px] tracking-widest">{entry.region}</td>
                                        <td className="px-8 py-7 text-gray-300 font-bold">{entry.service}</td>
                                        <td className="px-8 py-7">
                                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${entry.status === 'Approved' ? 'bg-green-900/40 text-green-400 border border-green-500/30' :
                                                entry.status === 'Verification' ? 'bg-blue-900/40 text-blue-400 border border-blue-500/30' :
                                                    'bg-yellow-900/40 text-yellow-400 border border-yellow-500/30'
                                                }`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-7 text-gray-500 text-[10px] font-black uppercase tracking-tighter">{entry.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-16 text-center p-12 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl">
                        <p className="text-blue-300 font-black text-2xl mb-6 italic tracking-tight">
                            "This live registry maintains administrative transparency, confirming that Elders Seva protocols are reaching citizens in need."
                        </p>
                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Administrative Oversight: National Senior Inclusion Cell</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusTracker;
