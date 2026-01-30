import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 pb-20 border-b border-white/5">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="inline-flex items-center space-x-3 mb-10">
                            <div className="bg-blue-800 p-2 rounded-xl">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase">ELDERS<span className="text-blue-500">SEVA</span></span>
                        </Link>
                        <p className="text-gray-400 max-w-sm text-lg leading-relaxed font-medium">
                            National Support Portal protecting the constitutional rights of senior citizens. Biometric failure is a technicality, not a ground for exclusion.
                        </p>
                        <div className="mt-10 flex space-x-4">
                            <a href="https://twitter.com/mygovindia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors duration-300" aria-label="Twitter">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                            <a href="https://www.facebook.com/MyGovIndia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors duration-300" aria-label="Facebook">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/government-of-india-official/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors duration-300" aria-label="LinkedIn">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-blue-500">Resource Centre</h4>
                        <ul className="space-y-6 text-gray-400 text-sm font-bold uppercase tracking-widest">
                            <li><Link to="/track" className="hover:text-blue-500 transition-colors">Track Status</Link></li>
                            <li><a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">National Data Hub</a></li>
                            <li><a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Manual Override BEP</a></li>
                            <li><Link to="/legal" className="hover:text-blue-500 transition-colors">Legal Rights</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-blue-500">Governance</h4>
                        <ul className="space-y-6 text-gray-400 text-sm font-bold uppercase tracking-widest">
                            <li><a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Grievance Cell</a></li>
                            <li><a href="https://niti.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Policy Framework</a></li>
                            <li><a href="https://meity.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Privacy Charter</a></li>
                            <li><a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Gov Portal Home</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500">
                    <p className="text-[10px] font-black uppercase tracking-widest">© 2026 National Senior Inclusion Cell. All Rights Reserved.</p>
                    <div className="flex space-x-8 text-[10px] font-black uppercase tracking-widest">
                        <a href="https://accessibleindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Accessibility</a>
                        <a href="https://www.india.gov.in/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="https://www.meity.gov.in/content/cyber-security" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Security Audit</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
