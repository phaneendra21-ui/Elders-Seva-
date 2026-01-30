import React, { useState } from 'react';

const FeedbackForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        aadhaarMasked: '',
        service: 'Pension Disbursement',
        feedback: '',
        location: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate offline-friendly submission logic
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-4 text-center">
                <div className="bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col items-center animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Feedback Logged</h2>
                    <p className="text-xl text-gray-500 max-w-md font-medium mb-10">
                        Your feedback has been successfully registered with the National Senior Inclusion Cell. Our regional administrative audit team will review the reports for system improvement.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="bg-blue-800 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-900 transition-all"
                    >
                        Submit Another Response
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-blue-900 p-8 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em]">National Feedback Portal</h3>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Direct Gov-Line</span>
                </div>

                <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">System Resilience Feedback</h2>
                        <p className="text-gray-500 text-lg">Report authentication failures or administrative delays directly to the government.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Citizen Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-bold text-gray-700 outline-none focus:border-blue-800 transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID (Last 4 Digits)</label>
                            <input
                                required
                                maxLength={4}
                                placeholder="XXXX"
                                type="text"
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-bold text-gray-700 outline-none focus:border-blue-800 transition-all"
                                value={formData.aadhaarMasked}
                                onChange={(e) => setFormData({ ...formData, aadhaarMasked: e.target.value.replace(/\D/g, '') })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Dimension</label>
                            <select
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-bold text-gray-700 outline-none focus:border-blue-800 transition-all appearance-none cursor-pointer"
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            >
                                <option>Pension Disbursement</option>
                                <option>Ration (PDS) Distribution</option>
                                <option>Banking / KYC Services</option>
                                <option>Medical Aid Access</option>
                                <option>Identity Update Issues</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Regional Location</label>
                            <input
                                required
                                placeholder="e.g. Village/District, State"
                                type="text"
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 font-bold text-gray-700 outline-none focus:border-blue-800 transition-all"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Detail of Issue / Experience</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Describe the barrier encountered (e.g., repeated fingerprint mismatch, denial of manual override, officer behavior)..."
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 font-medium text-gray-700 outline-none focus:border-blue-800 transition-all resize-none"
                            value={formData.feedback}
                            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-800 text-white py-6 rounded-3xl text-2xl font-black shadow-2xl hover:bg-blue-900 transition-all flex items-center justify-center space-x-4 active:scale-95"
                    >
                        {loading ? (
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                <span>Submit to National Registry</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
                    Submissions are encrypted and reviewed by the Administrative Accountability Committee.
                    Your feedback helps identify regional exclusion clusters.
                </p>
            </div>
        </div>
    );
};

export default FeedbackForm;
