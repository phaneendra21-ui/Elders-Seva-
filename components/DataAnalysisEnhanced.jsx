import React, { useState, useRef, useMemo, useTransition, useEffect } from 'react';
import {
    ComposedChart, Bar, Line, Scatter, XAxis, YAxis, PieChart, Pie, AreaChart, Area,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis, Cell, ScatterChart, BarChart, LineChart, AreaChart as AreaChartRecharts
} from 'recharts';

const GOV_COLORS = ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dc2626', '#f97316', '#eab308'];

const DataAnalysisEnhanced = () => {
    const [analysisResult, setAnalysisResult] = useState(null);
    const [xAxis, setXAxis] = useState('state');
    const [yAxis, setYAxis] = useState('bioAge');
    const [chartType, setChartType] = useState('bubble');
    const [currentGraph, setCurrentGraph] = useState('overview'); // overview, distribution, geographic, biometric
    const [isPending, startTransition] = useTransition();
    const [showDuplicates, setShowDuplicates] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // login or register
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authName, setAuthName] = useState('');
    const fileInputRef = useRef(null);

    // Authentication Handlers
    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
            const payload = authMode === 'login'
                ? { email: authEmail, password: authPassword }
                : { email: authEmail, password: authPassword, fullName: authName };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userName', data.user.fullName || data.user.email);
                setIsAuthenticated(true);
                setShowAuthModal(false);
                setAuthEmail('');
                setAuthPassword('');
                setAuthName('');
                alert(`${authMode === 'login' ? 'Login' : 'Registration'} successful!`);
            } else {
                alert(data.error || 'Authentication failed');
            }
        } catch (error) {
            alert('Authentication error: ' + error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
        setAnalysisResult(null);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isAuthenticated) {
            alert('Please log in first to upload data');
            setShowAuthModal(true);
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('csvFile', file);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/process-csv', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (e.target) e.target.value = '';

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const result = await response.json();

            startTransition(() => {
                setAnalysisResult(result);
                setLoading(false);
                setCurrentGraph('overview');
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert('Failed to process file. ' + error.message);
        }
    };

    const downloadCleanedData = async () => {
        if (!analysisResult?.cleanedData) {
            alert('No cleaned data available');
            return;
        }

        try {
            const csvContent = convertToCSV(analysisResult.cleanedData);
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `cleaned_data_${new Date().getTime()}.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Error downloading file: ' + error.message);
        }
    };

    const convertToCSV = (data) => {
        if (!data || data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csv = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                if (value === null || value === undefined) return '';
                if (typeof value === 'string' && value.includes(',')) {
                    return `"${value}"`;
                }
                return value;
            });
            csv.push(values.join(','));
        });
        
        return csv.join('\n');
    };

    const processedData = useMemo(() => {
        if (!analysisResult) return [];

        let aggData = [];
        if (xAxis === 'state') aggData = analysisResult.aggregations.byState;
        else if (xAxis === 'district') aggData = analysisResult.aggregations.byDistrict;
        else if (xAxis === 'age') aggData = analysisResult.aggregations.byAge;

        return aggData.map(item => ({
            name: item.name,
            value: yAxis === 'bioAge' ? item.avgBioAge :
                yAxis === 'volume' ? item.total :
                    item.pincodeCount,
            z: item.total,
            failureRate: item.failureRate,
            failures: item.failures
        })).sort((a, b) => {
            if (xAxis === 'age') return parseInt(a.name) - parseInt(b.name);
            return b.value - a.value;
        }).slice(0, xAxis === 'age' ? 100 : 25);
    }, [analysisResult, xAxis, yAxis]);

    const duplicateData = useMemo(() => {
        if (!analysisResult) return [];
        return analysisResult.duplicates || [];
    }, [analysisResult]);

    const summary = useMemo(() => {
        if (!analysisResult) return null;
        const stats = analysisResult.statistics?.overview || {};
        return {
            total: stats.totalRecords || 0,
            failureRate: stats.failureRate || '0',
            duplicatesRemoved: stats.duplicatesRemoved || 0,
            qualityScore: stats.dataQualityScore || '0',
            peakZone: analysisResult.aggregations?.byState?.[0]?.name || 'N/A'
        };
    }, [analysisResult]);

    const bioAgeData = useMemo(() => {
        if (!analysisResult?.aggregations?.byBioAgeRange) return [];
        return analysisResult.aggregations.byBioAgeRange;
    }, [analysisResult]);

    const stateDistrictData = useMemo(() => {
        if (!analysisResult?.aggregations?.stateDistrictMap) return [];
        return analysisResult.aggregations.stateDistrictMap.slice(0, 20);
    }, [analysisResult]);

    const pieData = useMemo(() => {
        if (!analysisResult?.aggregations?.byState) return [];
        return analysisResult.aggregations.byState.slice(0, 10).map(item => ({
            name: item.name,
            value: item.total
        }));
    }, [analysisResult]);

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const ROWS_PER_PAGE = 50;

    useEffect(() => {
        setCurrentPage(1);
    }, [analysisResult, showDuplicates]);

    const currentTableData = useMemo(() => {
        const data = showDuplicates ? duplicateData : processedData;
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        return data.slice(startIndex, startIndex + ROWS_PER_PAGE);
    }, [showDuplicates, duplicateData, processedData, currentPage]);

    const totalPages = Math.ceil((showDuplicates ? duplicateData.length : processedData.length) / ROWS_PER_PAGE);

    return (
        <div className={`w-full max-w-[95%] mx-auto py-4 px-2 transition-all duration-500 ${isPending || loading ? 'opacity-60' : 'opacity-100'}`}>
            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-black mb-6">{authMode === 'login' ? 'Login' : 'Register'}</h2>
                        <form onSubmit={handleAuth} className="space-y-4">
                            {authMode === 'register' && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={authName}
                                    onChange={(e) => setAuthName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Email"
                                value={authEmail}
                                onChange={(e) => setAuthEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={authPassword}
                                onChange={(e) => setAuthPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            />
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-black">
                                {authMode === 'login' ? 'Login' : 'Register'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                                className="w-full text-blue-600 py-2"
                            >
                                {authMode === 'login' ? 'Create Account' : 'Already have account?'}
                            </button>
                        </form>
                        <button onClick={() => setShowAuthModal(false)} className="mt-4 w-full text-gray-600">Close</button>
                    </div>
                </div>
            )}

            <div className="text-center mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Strategic Intelligence Dashboard</h1>
                    <div className="flex items-center gap-4">
                        {isAuthenticated && (
                            <>
                                <span className="text-sm text-slate-600">Welcome, {localStorage.getItem('userName')}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-black"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-black"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
                <p className="text-lg text-slate-500 font-medium italic">Advanced Data Analysis with Deduplication & Visualization</p>
            </div>

            {!analysisResult && !loading ? (
                <div
                    className="bg-white border-4 border-dashed border-slate-200 rounded-[3.5rem] p-32 text-center flex flex-col items-center hover:border-blue-600 hover:bg-blue-50/30 transition-all cursor-pointer group shadow-2xl"
                    onClick={() => {
                        if (isAuthenticated) {
                            fileInputRef.current?.click();
                        } else {
                            setShowAuthModal(true);
                        }
                    }}
                >
                    <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Initialize Regional Audit</h2>
                    <p className="text-slate-400 mb-10 font-bold max-w-sm">Upload departmental CSV logs containing State, District, Pincode, and Biometric data for automatic deduplication and analysis.</p>
                    <button className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-colors">
                        {isAuthenticated ? 'Select Source File' : 'Login to Upload'}
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleFileUpload} />
                </div>
            ) : loading ? (
                <div className="bg-white rounded-[3.5rem] p-32 text-center flex flex-col items-center shadow-xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-8"></div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Processing Dataset...</h2>
                    <p className="text-slate-400 mt-4 font-bold">Analyzing and deduplicating data</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Control Panel */}
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                            <button
                                onClick={() => setCurrentGraph('overview')}
                                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentGraph === 'overview' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setCurrentGraph('distribution')}
                                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentGraph === 'distribution' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                            >
                                Distribution
                            </button>
                            <button
                                onClick={() => setCurrentGraph('geographic')}
                                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentGraph === 'geographic' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                            >
                                Geographic
                            </button>
                            <button
                                onClick={() => setCurrentGraph('biometric')}
                                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentGraph === 'biometric' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                            >
                                Bio-Age
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={downloadCleanedData}
                                className="bg-green-600/20 border border-green-500/30 text-green-400 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600/30 transition-all"
                            >
                                Download Clean Data
                            </button>
                            <button
                                onClick={() => setShowDuplicates(!showDuplicates)}
                                className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${showDuplicates ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                            >
                                Duplicates ({duplicateData.length})
                            </button>
                            <button
                                onClick={() => startTransition(() => setAnalysisResult(null))}
                                className="bg-red-600/20 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600/30 transition-all"
                            >
                                Clear Data
                            </button>
                        </div>
                    </div>

                    {/* Overview Stats */}
                    {!showDuplicates && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Total Records</p>
                                <p className="text-3xl font-black text-blue-900">{summary?.total.toLocaleString()}</p>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                                <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Failure Rate</p>
                                <p className="text-3xl font-black text-red-900">{summary?.failureRate}%</p>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                                <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-2">Duplicates Removed</p>
                                <p className="text-3xl font-black text-orange-900">{summary?.duplicatesRemoved}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                                <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-2">Data Quality</p>
                                <p className="text-3xl font-black text-green-900">{summary?.qualityScore}%</p>
                            </div>
                        </div>
                    )}

                    {/* Graph Selection */}
                    {!showDuplicates && currentGraph === 'overview' && (
                        <div className="bg-white rounded-[3.5rem] shadow-2xl p-12 border border-slate-100">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Regional Distribution by State</h2>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analysisResult.aggregations.byState.slice(0, 15)}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }} angle={-45} textAnchor="end" />
                                        <YAxis tick={{ fontSize: 10, fontWeight: 900, fill: '#1e3a8a' }} />
                                        <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none' }} />
                                        <Bar name="Total Records" dataKey="total" fill="#3b82f6" radius={[12, 12, 0, 0]}>
                                            {analysisResult.aggregations.byState.slice(0, 15).map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={GOV_COLORS[index % GOV_COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {!showDuplicates && currentGraph === 'distribution' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[3.5rem] shadow-2xl p-12 border border-slate-100">
                                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase">Bio-Age Distribution</h2>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={bioAgeData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                                            <YAxis tick={{ fontSize: 9 }} />
                                            <Tooltip />
                                            <Bar name="Count" dataKey="total" fill="#1e3a8a" radius={[12, 12, 0, 0]}>
                                                {bioAgeData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={GOV_COLORS[index % GOV_COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3.5rem] shadow-2xl p-12 border border-slate-100">
                                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase">State Distribution (Pie)</h2>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, value }) => `${name}: ${value}`}
                                                outerRadius={120}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {pieData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={GOV_COLORS[index % GOV_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {!showDuplicates && currentGraph === 'geographic' && (
                        <div className="bg-white rounded-[3.5rem] shadow-2xl p-12 border border-slate-100">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase">Geographic Heatmap (State-District)</h2>
                            <div className="h-[500px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" dataKey="failures" name="Failures" />
                                        <YAxis type="number" dataKey="total" name="Total Records" />
                                        <ZAxis type="number" dataKey="failures" range={[100, 1000]} />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Scatter name="Districts" data={stateDistrictData} fill="#1e3a8a">
                                            {stateDistrictData.map((_, index) => (
                                                <Cell key={`scatter-${index}`} fill={GOV_COLORS[index % GOV_COLORS.length]} />
                                            ))}
                                        </Scatter>
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {!showDuplicates && currentGraph === 'biometric' && (
                        <div className="bg-white rounded-[3.5rem] shadow-2xl p-12 border border-slate-100">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase">Bio-Age Trend Analysis</h2>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={analysisResult.aggregations.byAge.slice(0, 20)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" tick={{ fontSize: 8 }} />
                                        <YAxis tick={{ fontSize: 9 }} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="avgBioAge" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 5 }} />
                                        <Line type="monotone" dataKey="avgAge" stroke="#dc2626" strokeWidth={3} dot={{ r: 5 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Data Table */}
                    <div className={`${showDuplicates ? 'lg:col-span-1' : ''} bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden h-[600px] flex flex-col`}>
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">{showDuplicates ? 'Duplicate Entries' : 'Analysis Detail Ledger'}</h3>
                            <div className="flex items-center gap-4">
                                {totalPages > 1 && (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30"
                                        >
                                            ←
                                        </button>
                                        <span className="text-[10px] font-black text-slate-400">Page {currentPage} of {totalPages}</span>
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30"
                                        >
                                            →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest sticky top-0 z-20">
                                    <tr>
                                        {showDuplicates ? (
                                            <>
                                                <th className="px-10 py-6">State</th>
                                                <th className="px-10 py-6">District</th>
                                                <th className="px-10 py-6">Type</th>
                                                <th className="px-10 py-6">Reason</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-10 py-6">Region</th>
                                                <th className="px-10 py-6">Records</th>
                                                <th className="px-10 py-6">Avg Bio-Age</th>
                                                <th className="px-10 py-6">Failure Rate</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {showDuplicates ? (
                                        currentTableData.map((row, i) => (
                                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-10 py-5"><span className="text-sm font-black text-slate-900 uppercase">{row.state}</span></td>
                                                <td className="px-10 py-5"><span className="text-sm font-black text-slate-900 uppercase">{row.district}</span></td>
                                                <td className="px-10 py-5"><span className="text-[9px] font-black uppercase bg-orange-50 text-orange-600 px-2 py-1 rounded">{row.duplicateType}</span></td>
                                                <td className="px-10 py-5"><span className="text-[9px] font-black text-slate-600">{row.reason}</span></td>
                                            </tr>
                                        ))
                                    ) : (
                                        currentTableData.map((row, i) => (
                                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-10 py-5"><span className="text-sm font-black text-slate-900">{row.name}</span></td>
                                                <td className="px-10 py-5"><span className="text-sm font-black text-slate-900">{row.total}</span></td>
                                                <td className="px-10 py-5"><span className="text-sm font-black text-slate-900">{row.avgBioAge}</span></td>
                                                <td className="px-10 py-5"><span className="text-sm font-black text-red-600">{row.failureRate}%</span></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
            `}</style>
        </div>
    );
};

export default DataAnalysisEnhanced;
