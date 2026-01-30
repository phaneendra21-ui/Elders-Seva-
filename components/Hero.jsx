import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative bg-white overflow-hidden pt-12 lg:pt-20 pb-12 lg:pb-16" aria-labelledby="hero-heading">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center relative z-10">
                <div className="lg:w-3/5 space-y-8 lg:pr-16 text-center lg:text-left">
                    <div
                        className="inline-flex items-center px-4 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase bg-blue-50 text-blue-800 border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700"
                        role="alert"
                    >
                        <span className="w-2 h-2 bg-blue-800 rounded-full mr-3 animate-pulse"></span>
                        National Administrative Support Cell
                    </div>

                    <h1 id="hero-heading" className="text-7xl lg:text-9xl font-black text-gray-900 leading-[0.9] tracking-tight uppercase animate-in fade-in slide-in-from-left-8 duration-1000">
                        Government of India Portal
                    </h1>

                    <div className="text-center lg:text-left">
                        <p className="text-lg lg:text-xl text-gray-500 max-w-3xl leading-relaxed font-medium mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-12 duration-1000 delay-200">
                            Technology Should Not Exclude You. Empowering 140 million senior citizens to overcome biometric failure through official diagnostic tools and administrative support.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        <Link
                            to="/track"
                            className="bg-blue-800 text-white px-12 py-6 rounded-[2rem] text-xl font-black hover:bg-blue-900 hover:shadow-2xl hover:shadow-blue-800/30 transition-all text-center focus:ring-4 focus:ring-blue-300 outline-none uppercase tracking-tighter active:scale-95"
                        >
                            Track Application Status
                        </Link>
                        <Link
                            to="/feedback"
                            className="group border-2 border-gray-900 text-gray-900 px-12 py-6 rounded-[2rem] text-xl font-black hover:bg-gray-900 hover:text-white transition-all text-center focus:ring-4 focus:ring-gray-100 outline-none uppercase tracking-tighter active:scale-95"
                        >
                            Portal Feedback
                        </Link>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start space-x-8 text-[10px] font-black text-gray-400 pt-6 uppercase tracking-[0.4em]">
                        <div className="flex items-center group">
                            <span className="text-blue-800 mr-3 group-hover:scale-125 transition-transform">✓</span> Verified Override
                        </div>
                        <div className="flex items-center group">
                            <span className="text-blue-800 mr-3 group-hover:scale-125 transition-transform">✓</span> Legal Protection
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/5 mt-16 lg:mt-0 relative group animate-in zoom-in duration-1000">
                    <div className="relative z-10 p-2 bg-gradient-to-br from-blue-100 to-white rounded-[4rem] shadow-2xl">
                        <div className="overflow-hidden rounded-[3.8rem] relative">
                            <img
                                src="https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=800"
                                alt="Elderly citizen receiving administrative support"
                                className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 max-w-xs transform group-hover:-translate-y-2 transition-transform duration-500">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-xl">“</div>
                                <p className="text-gray-900 font-black uppercase text-[10px] tracking-widest">Protocol-2025</p>
                            </div>
                            <p className="text-xl font-black text-blue-900 leading-tight italic">
                                Authentication mismatch is a technical error, not a denial of rights.
                            </p>
                        </div>
                    </div>
                    {/* Accent decoration */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 border-8 border-orange-100 rounded-[3rem] -z-10 group-hover:rotate-12 transition-transform duration-700"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
