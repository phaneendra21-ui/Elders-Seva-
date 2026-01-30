import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import DataAnalysis from './components/DataAnalysis';
import LegalFramework from './components/LegalFramework';
import StatusTracker from './components/StatusTracker';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';
import AgentDashboard from './components/AgentDashboard';

const HomePage = () => (
    <div className="animate-in fade-in duration-1000">
        <Hero />
        <StatsSection />

        {/* Requirements and Benefits Section */}
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Get Started Today</h2>
                    <p className="text-lg text-gray-600 mt-4">Everything you need to overcome biometric barriers</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">What You Need</h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                                <div>
                                    <strong>Valid Aadhaar Card</strong>
                                    <p className="text-sm text-gray-600">Your 12-digit Aadhaar number for identification</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                                <div>
                                    <strong>Age Verification</strong>
                                    <p className="text-sm text-gray-600">Proof of age (60+ years) for senior citizen benefits</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                                <div>
                                    <strong>Basic Contact Information</strong>
                                    <p className="text-sm text-gray-600">Phone number and address for verification</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                                <div>
                                    <strong>Service Details</strong>
                                    <p className="text-sm text-gray-600">Specify which government service you need access to</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Benefits You'll Get</h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start">
                                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">★</span>
                                <div>
                                    <strong>Instant Biometric Exception</strong>
                                    <p className="text-sm text-gray-600">Approved within 24-48 hours of application</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">★</span>
                                <div>
                                    <strong>Access All Government Services</strong>
                                    <p className="text-sm text-gray-600">Pensions, rations, healthcare, banking - everything restored</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">★</span>
                                <div>
                                    <strong>Dedicated Support Team</strong>
                                    <p className="text-sm text-gray-600">Personal assistance throughout the process</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">★</span>
                                <div>
                                    <strong>No More Service Denials</strong>
                                    <p className="text-sm text-gray-600">Permanent solution for age-related biometric issues</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">★</span>
                                <div>
                                    <strong>Digital Inclusion Guarantee</strong>
                                    <p className="text-sm text-gray-600">Ensures technology works for everyone, regardless of age</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Matrix: Administrative Module Cards */}
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <span className="text-blue-800 font-black text-[10px] uppercase tracking-[0.6em] mb-4 block">Central Governance Matrix</span>
                <h2 className="text-5xl lg:text-7xl font-black mb-8 uppercase tracking-tight text-gray-900">Support Infrastructure</h2>
                <p className="text-xl text-gray-400 mb-16 max-w-4xl mx-auto font-medium leading-relaxed">
                    Access the core pillars of the Elders Seva framework through our dedicated administrative portals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Box 1: Home */}
                    <Link to="/" className="group p-8 bg-blue-400 rounded-[2.5rem] border border-blue-500 hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between h-64">
                        <div>
                            <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center text-black mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-black">Portal Home</h3>
                            <p className="text-black/80 font-bold text-sm mt-2 leading-snug">Return to the national overview and diagnostic tools.</p>
                        </div>
                        <span className="text-black font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center">Open Section →</span>
                    </Link>

                    {/* Box 2: Analysis */}
                    <Link to="/analysis" className="group p-8 bg-blue-400 rounded-[2.5rem] border border-blue-500 hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between h-64">
                        <div>
                            <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center text-black mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-black">Regional Analysis</h3>
                            <p className="text-black/80 font-bold text-sm mt-2 leading-snug">Real-time data on biometric failure clusters nationwide.</p>
                        </div>
                        <span className="text-black font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center">Open Section →</span>
                    </Link>

                    {/* Box 3: Track Status */}
                    <Link to="/track" className="group p-8 bg-blue-400 rounded-[2.5rem] border border-blue-500 hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between h-64">
                        <div>
                            <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center text-black mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-black">Track Status</h3>
                            <p className="text-black/80 font-bold text-sm mt-2 leading-snug">Verify progress of your manual exception requests.</p>
                        </div>
                        <span className="text-black font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center">Open Section →</span>
                    </Link>

                    {/* Box 4: Legal Rights */}
                    <Link to="/legal" className="group p-8 bg-blue-400 rounded-[2.5rem] border border-blue-500 hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between h-64">
                        <div>
                            <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center text-black mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20a10.003 10.003 0 006.203-2.138l.054.09a10.3 10.3 0 001.743-9.466M6.993 9h3m3 0h3m-9 3h3m3 0h3m-9 3h3m3 0h3" /></svg>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-black">Legal Rights</h3>
                            <p className="text-black/80 font-bold text-sm mt-2 leading-snug">Constitutional protections against service exclusion.</p>
                        </div>
                        <span className="text-black font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center">Open Section →</span>
                    </Link>
                </div>
            </div>
        </section>
    </div>
);

const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Router>
                <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/analysis" element={<DataAnalysis />} />
                            <Route path="/legal" element={<LegalFramework />} />
                            <Route path="/track" element={<StatusTracker />} />
                            <Route path="/agent" element={<AgentDashboard />} />
                            <Route path="/feedback" element={<FeedbackForm />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </I18nextProvider>
    );
};

export default App;
