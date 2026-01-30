import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const location = useLocation();
    const { i18n } = useTranslation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300" role="navigation" aria-label="Main Navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="flex items-center space-x-4 group focus:ring-2 focus:ring-blue-500 rounded-lg outline-none" aria-label="National Inclusion Home">
                            <div className="bg-blue-800 p-4 rounded-2xl shadow-lg shadow-blue-800/20 group-hover:scale-105 transition-transform duration-300" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-5xl font-black tracking-tight leading-none uppercase flex items-center gap-2">
                                    <span className="text-[#FF9933]">ELDERS</span>
                                    <svg className="w-10 h-10 text-[#000080] animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h-2zm0 8h2v4h-2zM4.93 6.34l1.41-1.41 2.83 2.83-1.41 1.41zm11.32 11.32l1.41-1.41 2.83 2.83-1.41 1.41zM6.34 19.07l-1.41-1.41 2.83-2.83 1.41 1.41zm11.32-11.32l-1.41-1.41 2.83-2.83 1.41 1.41zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                        <circle cx="12" cy="12" r="1.5" />
                                        {/* Simplified Spokes */}
                                        <path d="M12 4V2 M12 22v-2 M4 12H2 M22 12h-2 M17.66 6.34l1.41-1.41 M4.93 19.07l1.41-1.41 M17.66 17.66l1.41 1.41 M4.93 4.93l1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span className="text-[#138808]">SEVA</span>
                                </span>
                                <span className="text-[12px] font-black text-blue-600 uppercase tracking-[0.3em] mt-1 opacity-80">Gov of India Portal</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-3 items-center">
                        {[
                            { path: '/', label: 'Home' },
                            { path: '/analysis', label: 'Analysis' },
                            { path: '/track', label: 'Track Status' },
                            { path: '/agent', label: 'Field Agent' },
                            { path: '/legal', label: 'Legal Rights' }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 border border-transparent ${isActive(link.path)
                                    ? 'bg-blue-400 text-black border-blue-500 shadow-sm shadow-blue-400/20'
                                    : 'text-gray-600 hover:text-black hover:bg-blue-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="w-px h-6 bg-gray-100 mx-2"></div>
                        <Link to="/feedback" className="bg-blue-800 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-800/20 active:scale-95">
                            Feedback
                        </Link>
                    </div>

                    <button className="md:hidden p-2 text-gray-400 hover:text-blue-800 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
