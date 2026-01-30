import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const data = [
    { name: '60-65', failure: 14, color: '#94a3b8' },
    { name: '66-70', failure: 22, color: '#64748b' },
    { name: '71-75', failure: 35, color: '#475569' },
    { name: '76-80', failure: 52, color: '#334155' },
    { name: '81+', failure: 78, color: '#1e3a8a' },
];

const StatsSection = () => {
    return (
        <div className="bg-gray-50/50 py-32 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <span className="text-blue-800 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">National Diagnostic Registry</span>
                    <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 uppercase tracking-tight">Understanding the Gap</h2>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        Administrative audits confirm that authentication failure rates rise sharply with age. Epidermal thinning impacts millions of pensioners, creating a systemic barrier to inclusion.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                    <div className="bg-white p-12 rounded-[4rem] shadow-xl shadow-gray-200/50 border border-gray-50 flex flex-col h-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">Failure Density by Age</h3>
                                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Regional Administrative Log</p>
                            </div>
                            <span className="bg-blue-50 px-4 py-2 rounded-2xl text-[10px] font-black text-blue-800 border border-blue-100 shadow-sm uppercase tracking-widest">Live Oct 2025</span>
                        </div>

                        <div className="flex-grow min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                                        dy={12}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', padding: '20px', fontWeight: 'bold' }}
                                    />
                                    <Bar name="Failure Probability (%)" dataKey="failure" radius={[16, 16, 4, 4]} barSize={48}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">N=1.4M AUDIT LOGS | CONFIDENCE INTERVAL: 98.4%</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-800/5 border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
                            <div>
                                <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-800/20 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Pension Lockout</span>
                                <span className="text-6xl font-black text-blue-900 tracking-tighter">15.2M</span>
                            </div>
                            <p className="mt-6 text-gray-500 font-bold leading-snug">Citizens facing Direct Benefit Transfer (DBT) failures due to authentication lockout.</p>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-orange-800/5 border border-gray-100 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
                            <div>
                                <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Regional High-Risk</span>
                                <span className="text-6xl font-black text-orange-700 tracking-tighter">42%</span>
                            </div>
                            <p className="mt-6 text-gray-500 font-bold leading-snug">Failure rate for citizens aged 75+ in dry agricultural regions (Epidermal Erosion).</p>
                        </div>

                        <div className="bg-gray-900 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
                            <div>
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Records Outdated</span>
                                <span className="text-6xl font-black text-white tracking-tighter">12<span className="text-blue-500">yr</span></span>
                            </div>
                            <p className="mt-6 text-gray-400 font-bold leading-snug">Average age of biometric records since enrollment. Aging exceeds standard refresh cycles.</p>
                        </div>

                        <div className="bg-blue-800 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
                            <div>
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-md group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-3 block">Solution Target</span>
                                <span className="text-6xl font-black text-white tracking-tighter">100<span className="text-orange-400">%</span></span>
                            </div>
                            <p className="mt-6 text-blue-100 font-bold leading-snug">National goal for manual override availability across all state and central services.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
