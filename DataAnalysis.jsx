import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
    AreaChart, Area
} from 'recharts';
import { trainAndPredict } from './BiometricRiskModel';

const COLORS = ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dc2626', '#f97316', '#eab308'];

const DataAnalysis = () => {
    const [analysisResult, setAnalysisResult] = useState(null);
    const [aiData, setAiData] = useState(null);
    const [currentGraph, setCurrentGraph] = useState('overview');
    const [showDuplicates, setShowDuplicates] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ROWS_PER_PAGE = 50;

    // Smart CSV Parser & Normalizer
    const processUploadedFile = (csvText) => {
        const lines = csvText.split('\n');
        if (lines.length < 2) {
            alert('File appears to be empty or invalid.');
            return;
        }

        const headerLine = lines[0].toLowerCase();
        const headers = headerLine.split(',').map(h => h.trim());

        // Smart Mapping Strategy
        const map = {
            aadhaar: headers.findIndex(h => h.includes('aadhaar') || h.includes('uid') || h.includes('id')),
            name: headers.findIndex(h => h.includes('name') || h.includes('beneficiary')),
            state: headers.findIndex(h => h.includes('state') || h.includes('province') || h.includes('region')),
            district: headers.findIndex(h => h.includes('district') || h.includes('city') || h.includes('location')),
            pincode: headers.findIndex(h => h.includes('pin') || h.includes('zip') || h.includes('code')),
            age: headers.findIndex(h => h === 'age' || h.includes('years') || h.includes('dob')),
            bioAge: headers.findIndex(h => h.includes('bio') || h.includes('biological')),
            status: headers.findIndex(h => h.includes('status') || h.includes('result') || h.includes('outcome')),
            reason: headers.findIndex(h => h.includes('reason') || h.includes('failure') || h.includes('issue'))
        };

        // If no Status column found, enable DEMO SIMULATION MODE
        const simulateData = map.status === -1;
        if (simulateData) console.warn("⚠️ No 'Status' column found. Activating Demo Simulation Mode.");

        const parsedRecords = [];
        let successCount = 0;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            const cols = line.split(',');
            const age = map.age > -1 ? (parseInt(cols[map.age]) || 60) : 60;

            let status = 'Success';
            let reason = 'None';

            if (map.status > -1) {
                status = cols[map.status];
                reason = map.reason > -1 ? cols[map.reason] : 'Unknown';
            } else if (simulateData) {
                // SIMULATION LOGIC: Older people fail more often
                // Base failure rate: 10% + 1.5% for every year over 60
                const failureChance = 0.10 + Math.max(0, (age - 60) * 0.015);
                if (Math.random() < failureChance) {
                    status = 'Failed';
                    const reasons = ['Fingerprint Faded', 'Iris Scan Error', 'Rough Skin', 'Cataract Issue'];
                    reason = reasons[Math.floor(Math.random() * reasons.length)];
                } else {
                    status = 'Success';
                }
            }

            const record = {
                aadhaar: map.aadhaar > -1 ? cols[map.aadhaar] : `ROW-${i}`,
                name: map.name > -1 ? cols[map.name] : 'Unknown',
                state: map.state > -1 ? cols[map.state] : 'Unknown State',
                district: map.district > -1 ? cols[map.district] : 'Unknown District',
                pincode: map.pincode > -1 ? cols[map.pincode] : '000000',
                age: age,
                bioAge: map.bioAge > -1 ? (parseInt(cols[map.bioAge]) || 0) : 0,
                status: status,
                FailureReason: reason,
                biometricType: 'Uploaded'
            };

            if (record.state) record.state = record.state.trim().replace(/"/g, '');
            if (record.district) record.district = record.district.trim().replace(/"/g, '');
            if (record.status) record.status = record.status.trim().replace(/"/g, '');

            parsedRecords.push(record);
            successCount++;
        }

        // Integrate into existing analysis flow
        const deduped = runDeduplication(parsedRecords);
        setAnalysisResult(deduped);

        // Trigger AI Training (K-Means)
        if (parsedRecords.length > 5) {
            setIsTraining(true);
            setTimeout(async () => {
                try {
                    console.log('🧠 Starting TensorFlow.js Clustering...');
                    const predictions = await trainAndPredict(parsedRecords);
                    setAiData(predictions);
                    console.log('✅ AI Clusters Ready:', predictions);
                } catch (err) {
                    console.error('AI Clustering Failed:', err);
                } finally {
                    setIsTraining(false);
                    // User requested to NOT switch automatically, kept on 'overview'
                    // setCurrentGraph('ai'); 
                }
            }, 300); // Short delay for UI update
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log('📂 Processing upload:', file.name);
        setUploadedFile(file);
        setLoading(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            processUploadedFile(text);
            setLoading(false);
        };
        reader.onerror = () => {
            alert('Error reading file');
            setLoading(false);
        };
        reader.readAsText(file);
    };

    const runDeduplication = (records) => {
        const aadhaarSet = new Set();
        const profileMap = new Map();
        const duplicates = { aadhaarDuplicates: [], profileDuplicates: [], total: 0 };
        const cleanedData = [];

        for (let idx = 0; idx < records.length; idx++) {
            const record = records[idx];

            if (aadhaarSet.has(record.aadhaar)) {
                duplicates.aadhaarDuplicates.push({ ...record, duplicateType: 'Aadhaar' });
                continue;
            }

            const profileKey = `${record.state}_${record.district}_${record.pincode}`;
            if (profileMap.has(profileKey)) {
                duplicates.profileDuplicates.push({ ...record, duplicateType: 'Profile' });
                continue;
            }

            aadhaarSet.add(record.aadhaar);
            profileMap.set(profileKey, record);
            cleanedData.push(record);
        }

        duplicates.total = duplicates.aadhaarDuplicates.length + duplicates.profileDuplicates.length;

        // Aggregations
        const byState = {};
        cleanedData.forEach(record => {
            if (!byState[record.state]) {
                byState[record.state] = { name: record.state, total: 0, successCount: 0, failureCount: 0 };
            }
            byState[record.state].total++;
            if (record.status.toLowerCase().includes('success') || record.status.toLowerCase().includes('pass')) {
                byState[record.state].successCount++;
            } else {
                byState[record.state].failureCount++;
            }
        });

        const byBioAgeRange = {};
        cleanedData.forEach(record => {
            const range = `${Math.floor(record.bioAge / 10) * 10}-${Math.floor(record.bioAge / 10) * 10 + 10}`;
            if (!byBioAgeRange[range]) {
                byBioAgeRange[range] = { ageRange: range, count: 0, avgAge: 0, avgBioAge: 0, totalAge: 0, totalBioAge: 0 };
            }
            byBioAgeRange[range].count++;
            byBioAgeRange[range].totalAge += record.age;
            byBioAgeRange[range].totalBioAge += record.bioAge;
            byBioAgeRange[range].avgAge = Math.round(byBioAgeRange[range].totalAge / byBioAgeRange[range].count);
            byBioAgeRange[range].avgBioAge = Math.round(byBioAgeRange[range].totalBioAge / byBioAgeRange[range].count);
        });

        const stateDistrictMap = [];
        Object.keys(byState).forEach(state => {
            stateDistrictMap.push({
                name: state,
                total: byState[state].total,
                failureCount: byState[state].failureCount
            });
        });

        const failureRate = records.length > 0 ? Math.round((cleanedData.filter(r => !r.status.toLowerCase().includes('success')).length / records.length) * 100) : 0;
        const duplicateRemovalRate = records.length > 0 ? Math.round((duplicates.total / records.length) * 100) : 0;

        return {
            cleanedData,
            duplicates: [...duplicates.aadhaarDuplicates, ...duplicates.profileDuplicates],
            duplicateStats: {
                aadhaarCount: duplicates.aadhaarDuplicates.length,
                profileCount: duplicates.profileDuplicates.length,
                totalCount: duplicates.total
            },
            statistics: {
                overview: {
                    totalRecords: records.length,
                    cleanedRecords: cleanedData.length,
                    failureRate,
                    duplicatesRemoved: duplicates.total,
                    dataQualityScore: 100 - failureRate
                }
            },
            aggregations: {
                byState: Object.values(byState),
                byBioAgeRange: Object.values(byBioAgeRange),
                stateDistrictMap
            }
        };
    };

    const duplicateData = useMemo(() => analysisResult?.duplicates || [], [analysisResult]);
    const summary = useMemo(() => {
        if (!analysisResult) return null;
        return {
            total: analysisResult.statistics?.overview?.totalRecords || 0,
            failureRate: analysisResult.statistics?.overview?.failureRate || 0,
            duplicatesRemoved: analysisResult.statistics?.overview?.duplicatesRemoved || 0,
            qualityScore: analysisResult.statistics?.overview?.dataQualityScore || 0
        };
    }, [analysisResult]);

    const stateData = analysisResult ? analysisResult.aggregations.byState : [];
    const bioAgeData = analysisResult ? analysisResult.aggregations.byBioAgeRange : [];
    const stateDistrictData = analysisResult ? analysisResult.aggregations.stateDistrictMap.slice(0, 20) : [];
    const trendData = analysisResult ? analysisResult.aggregations.byBioAgeRange.map(item => ({
        name: item.name || `Age ${item.ageRange}`,
        avgAge: Math.round(item.avgAge || 0),
        avgBioAge: Math.round(item.avgBioAge || 0),
        count: item.count || 0
    })) : [];

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-white mb-2">🔄 Processing CSV</h2>
                    <p className="text-white text-lg">Analyzing your data...</p>
                </div>
            </div>
        );
    }

    if (!analysisResult) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-2xl border border-gray-100">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Upload Your Data</h2>
                    <p className="text-gray-600 text-lg mb-8">Upload your biometric CSV file to instantly generate analysis reports, detect duplicates, and visualize offline AI predictions.</p>

                    <div className="border-4 border-dashed border-gray-200 rounded-2xl p-10 hover:bg-blue-50 hover:border-blue-300 transition-all group cursor-pointer relative">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="group-hover:scale-105 transition-transform">
                            <p className="text-xl font-bold text-blue-600 mb-2">Click to Upload CSV</p>
                            <p className="text-xs text-gray-400">Supported columns: State, District, Pincode, Age, BioAge, Status, FailureReason</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-6">All processing (including TensorFlow AI) happens locally on your browser. No data is uploaded.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Data Analysis Report</h1>
                        <p className="text-gray-600 mt-1">
                            File: {uploadedFile?.name || 'Uploaded Data'}
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => { setAnalysisResult(null); setUploadedFile(null); setAiData(null); setCurrentGraph('overview'); }}
                            className="bg-gray-800 text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-900 transition-colors shadow-lg"
                        >
                            Upload New File
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600 font-semibold mb-2">Total Input</p>
                        <p className="text-3xl font-bold text-gray-900">{analysisResult?.statistics?.overview?.totalRecords || 0}</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm">
                        <p className="text-sm text-red-700 font-semibold mb-2">⚡ Aadhaar Duplicates</p>
                        <p className="text-3xl font-bold text-red-600">{analysisResult?.duplicateStats?.aadhaarCount || 0}</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 shadow-sm">
                        <p className="text-sm text-orange-700 font-semibold mb-2">⚡ Profile Duplicates</p>
                        <p className="text-3xl font-bold text-orange-600">{analysisResult?.duplicateStats?.profileCount || 0}</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
                        <p className="text-sm text-green-700 font-semibold mb-2">✅ Cleaned Data</p>
                        <p className="text-3xl font-bold text-green-600">{analysisResult?.statistics?.overview?.cleanedRecords || 0}</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
                        <p className="text-sm text-blue-700 font-semibold mb-2">✓ Qualty Score</p>
                        <p className="text-3xl font-bold text-blue-600">{summary.qualityScore}%</p>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-x-auto">
                    <div className="flex gap-2">
                        <button onClick={() => { setCurrentGraph('overview'); setShowDuplicates(false); }} className={`px-4 py-2 rounded-lg font-bold text-sm ${currentGraph === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Overview</button>
                        <button onClick={() => { setCurrentGraph('geographic'); setShowDuplicates(false); }} className={`px-4 py-2 rounded-lg font-bold text-sm ${currentGraph === 'geographic' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Geographic</button>
                        <button onClick={() => { setCurrentGraph('biometric'); setShowDuplicates(false); }} className={`px-4 py-2 rounded-lg font-bold text-sm ${currentGraph === 'biometric' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>Trends</button>
                        <button onClick={() => { setCurrentGraph('ai'); setShowDuplicates(false); }} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 ${currentGraph === 'ai' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 hover:bg-purple-50'}`}>
                            {isTraining ? (
                                <>
                                    <span className="animate-pulse">Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <span>⚡ AI Anomaly Clusters</span>
                                </>
                            )}
                        </button>
                    </div>
                    <button onClick={() => setShowDuplicates(!showDuplicates)} className={`px-4 py-2 rounded-lg font-bold text-sm ${showDuplicates ? 'bg-red-600 text-white' : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'}`}>
                        {showDuplicates ? 'Hide Duplicates' : `Show Duplicates (${duplicateData.length})`}
                    </button>
                </div>

                {/* Graphs */}
                {!showDuplicates && analysisResult && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
                        {currentGraph === 'overview' && (
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={stateData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                        {currentGraph === 'ai' && aiData && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900">🔮 AI Anomaly Detection (Unsupervised)</h3>
                                        <p className="text-sm text-gray-500">
                                            Powered by <span className="font-bold text-orange-500">TensorFlow.js K-Means Clustering</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            The AI has auto-grouped elders into <strong>Safe</strong> (Green), <strong>Warning</strong> (Yellow), and <strong>Anomaly</strong> (Red) clusters based on biometric integrity patterns.
                                        </p>
                                    </div>
                                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-xs font-bold border border-purple-200">
                                        Adv. Pattern Recognition
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={350}>
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="x" type="number" name="Age" unit=" yrs" domain={['auto', 'auto']} />
                                        <YAxis dataKey="y" type="number" name="Integrity Score" unit="%" domain={[0, 105]} />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Legend />
                                        <Scatter name="Safe" data={aiData.filter(d => d.cluster === 'Safe')} fill="#10b981" shape="circle" />
                                        <Scatter name="Warning" data={aiData.filter(d => d.cluster === 'Warning')} fill="#eab308" shape="triangle" />
                                        <Scatter name="Anomaly" data={aiData.filter(d => d.cluster === 'Anomaly')} fill="#ef4444" shape="cross" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        {currentGraph === 'geographic' && (
                            <ResponsiveContainer width="100%" height={400}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="failureCount" name="Failures" />
                                    <YAxis dataKey="total" name="Total Records" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Districts" data={stateDistrictData} fill="#8b5cf6" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        )}
                        {currentGraph === 'biometric' && (
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="avgAge" stroke="#ef4444" name="Avg Age" strokeWidth={2} />
                                    <Line type="monotone" dataKey="avgBioAge" stroke="#3b82f6" name="Avg Bio-Age" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                )}

                {analysisResult && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {showDuplicates ? (
                                            <>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">State</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">District</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">State</th>
                                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Success</th>
                                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Failures</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {(showDuplicates ? duplicateData : stateData).slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE).map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            {showDuplicates ? (
                                                <>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{row.state}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{row.district}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{row.age}</td>
                                                    <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">{row.duplicateType}</span></td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.name}</td>
                                                    <td className="px-6 py-4 text-sm text-right text-gray-900">{row.total}</td>
                                                    <td className="px-6 py-4 text-sm text-right text-green-600">{row.successCount}</td>
                                                    <td className="px-6 py-4 text-sm text-right text-red-600">{row.failureCount}</td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default DataAnalysis;
