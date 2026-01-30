import React, { useState, useMemo } from 'react';

// Helper to generate realistic mock data
const generateMockTasks = (count) => {
    const firstNames = [
        'Ramesh', 'Suresh', 'Karthik', 'Aditya', 'Vikram', 'Meena', 'Jyoti', 'Bhavna', 'Priya', 'Deepa',
        'Tanuja', 'Ganesh', 'Lakshmi', 'Narayan', 'Hemant', 'Arjun', 'Vijay', 'Sanjay', 'Rahul', 'Anjali',
        'Kavita', 'Sunita', 'Rajesh', 'Amit', 'Sneha', 'Manish', 'Pooja', 'Riya', 'Vivek', 'Alok',
        'Ishaan', 'Vihaan', 'Aarav', 'Ananya', 'Diya', 'Sarthak', 'Neha', 'Varun', 'Swati', 'Preeti'
    ];
    const lastNames = [
        'Subramanian', 'Iyer', 'Menon', 'Rao', 'Reddy', 'Naidu', 'Patel', 'Gupta', 'Singh', 'Sharma',
        'Verma', 'Mishra', 'Joshi', 'Kulkarni', 'Deshmukh', 'Nair', 'Pillai', 'Gowda', 'Hegde', 'Shetty',
        'Fernandes', 'D\'Souza', 'Khan', 'Ahmed', 'Hussain', 'Ali', 'Chopra', 'Malhotra', 'Kapoor', 'Bhatia',
        'Saxena', 'Srivastava', 'Tiwari', 'Dubey', 'Pandey', 'Yadav', 'Das', 'Roy', 'Banerjee', 'Ghosh'
    ];
    const areas = ['Mylapore', 'T. Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'Guindy', 'Tambaram', 'Chromepet', 'Egmore', 'Kilpauk', 'Besant Nagar', 'Triplicane', 'Porur', 'Vadapalani', 'Kodambakkam'];
    const services = ['Manual Exception', 'Pension Claim', 'Digital Life Cert', 'Address Update'];
    const issues = ['Fingerprint Decay', 'Cataract / Iris fail', 'Face Match Low Conf', 'Biometric Lock', 'Data Mismatch'];
    const registryStatuses = ['Verification', 'Biometric Fail', 'Face Mismatch', 'Fingerprint Fail', 'Iris Scan Fail'];

    return Array.from({ length: count }, (_, i) => {
        const idSuffix = 100 + i;
        const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
        const randomArea = areas[Math.floor(Math.random() * areas.length)];
        const randomService = services[Math.floor(Math.random() * services.length)];
        const randomIssue = issues[Math.floor(Math.random() * issues.length)];
        const randomStatus = registryStatuses[Math.floor(Math.random() * registryStatuses.length)];

        return {
            id: `DLC-REQ-2026-X${idSuffix}`,
            aadhaar: `XXXX XXXX ${Math.floor(1000 + Math.random() * 9000)}`,
            name: `${randomFirst} ${randomLast}`,
            region: `Chennai South, ${randomArea}`,
            service: randomService,
            registryStatus: randomStatus,
            issue: randomIssue,
            verifiedAt: `${Math.floor(Math.random() * 59) + 1} mins ago`,
            status: 'Pending',
            age: Math.floor(60 + Math.random() * 30) // Ages 60-90
        };
    });
};

const AgentDashboard = () => {
    // Generate a pool of 100 tasks once
    const masterPool = useMemo(() => generateMockTasks(100), []);

    // Initial state: first 5 items
    const [visibleTasks, setVisibleTasks] = useState(masterPool.slice(0, 5));
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate network request
        setTimeout(() => {
            // Pick 5 random unique tasks from the master pool
            const shuffled = [...masterPool].sort(() => 0.5 - Math.random());
            setVisibleTasks(shuffled.slice(0, 5));
            setIsRefreshing(false);
        }, 600);
    };

    const handleApprove = (task) => {
        setVisibleTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'Resolved', registryStatus: 'Override Approved' } : t));

        // Generate detailed confirmation details
        const certId = `JE - ${Math.floor(Math.random() * 10000000)} `;
        const ppoNo = `PPO - ${Math.floor(Math.random() * 1000000)} `;
        const timestamp = new Date().toLocaleString();

        alert(`SUCCESS: Digital Life Certificate Generated!\n\nDetails: \n - Beneficiary: ${task.name} \n - Aadhaar: ${task.aadhaar} \n - Certificate ID: ${certId} \n - PPO Number: ${ppoNo} \n - Generated At: ${timestamp} \n\nStatus: SENT TO TREASURY`);
    };

    return (
        <div className="w-full max-w-[95%] mx-auto py-8 px-2 space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Live Console</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
                        Aadhaar Mitra <span className="text-blue-600">Field Ops</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-2 max-w-2xl">
                        National Biometric Exception Management & Override Interface
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-bold text-slate-900">Agent ID: AM-7782-CHN</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Zone: Chennai South</div>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        <span className="text-xl">👮‍♂️</span>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2">Pending High Priority</div>
                    <div className="text-4xl font-black text-orange-600">12</div>
                    <div className="text-xs font-bold text-orange-400/80 mt-2">+3 since last hour</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Resolved Today</div>
                    <div className="text-4xl font-black text-blue-600">45</div>
                    <div className="text-xs font-bold text-blue-400/80 mt-2">Target: 50/day</div>
                </div>
                <div className="bg-green-50 p-6 rounded-3xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2">Avg. Response Time</div>
                    <div className="text-4xl font-black text-green-700">18m</div>
                    <div className="text-xs font-bold text-green-600/80 mt-2">Top 5% National</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Agents</div>
                    <div className="text-4xl font-black text-slate-700">8</div>
                    <div className="text-xs font-bold text-slate-400/80 mt-2">Zone Capacity Full</div>
                </div>
            </div>

            {/* Main Work Queue */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Exception Registry</h2>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Real-time Sync • Database Pool: 100+
                        </span>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className={`bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${isRefreshing ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isRefreshing ? (
                            <svg className="animate-spin h-3 w-3 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        )}
                        {isRefreshing ? 'Fetching New...' : 'Refresh List'}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aadhaar (Masked)</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Citizen Name</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Region</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Service</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Registry Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified At</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {visibleTasks.map((task) => (
                                <tr key={task.id} className="hover:bg-blue-50/10 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-slate-700 font-mono text-sm tracking-widest bg-slate-100 inline-block px-2 py-1 rounded">
                                            {task.aadhaar}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-black text-slate-900 text-sm uppercase">{task.name}</div>
                                        <div className="text-[10px] text-slate-500 font-bold mt-1">Age: {task.age}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-slate-600">{task.region}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide">
                                            {task.service}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        {task.status === 'Resolved' ? (
                                            <span className="text-green-600 font-black text-[10px] uppercase tracking-widest">
                                                {task.registryStatus}
                                            </span>
                                        ) : (
                                            <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest">
                                                {task.registryStatus}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-bold text-slate-500">{task.verifiedAt}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        {task.status === 'Resolved' ? (
                                            <button disabled className="text-slate-300 font-bold text-xs uppercase cursor-not-allowed">
                                                Generated
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleApprove(task)}
                                                className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-lg shadow-blue-800/20 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Generate DLC
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AgentDashboard;
