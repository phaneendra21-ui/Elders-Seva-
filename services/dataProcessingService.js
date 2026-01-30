/**
 * Data Processing Service
 * Handles data cleaning, deduplication, and aggregation with fast algorithms
 */

// Fast deduplication using Set and Map for O(1) lookups
function deduplicateData(records) {
    const seenAadhaar = new Set();
    const seenProfile = new Map();
    const duplicates = [];
    const cleanedRecords = [];
    const duplicateMetrics = {
        aadhaarDuplicates: 0,
        profileDuplicates: 0,
        totalDuplicates: 0
    };

    records.forEach((record, index) => {
        const isAadhaarDuplicate = record.aadhaar && record.aadhaar !== 'N/A' && seenAadhaar.has(record.aadhaar);
        const profileKey = `${record.name}-${record.age}-${record.pincode}`;
        const isProfileDuplicate = seenProfile.has(profileKey);

        if (isAadhaarDuplicate || isProfileDuplicate) {
            duplicates.push({
                ...record,
                duplicateType: isAadhaarDuplicate ? 'AADHAAR' : 'PROFILE',
                detectedAt: index,
                reason: isAadhaarDuplicate ? 'Same Aadhaar ID' : 'Same Name-Age-Pincode'
            });
            
            if (isAadhaarDuplicate) duplicateMetrics.aadhaarDuplicates++;
            if (isProfileDuplicate) duplicateMetrics.profileDuplicates++;
            duplicateMetrics.totalDuplicates++;
        } else {
            cleanedRecords.push(record);
            
            if (record.aadhaar && record.aadhaar !== 'N/A') {
                seenAadhaar.add(record.aadhaar);
            }
            seenProfile.set(profileKey, index);
        }
    });

    return {
        cleanedRecords,
        duplicates,
        metrics: duplicateMetrics,
        originalCount: records.length,
        cleanedCount: cleanedRecords.length,
        removalRate: ((duplicateMetrics.totalDuplicates / records.length) * 100).toFixed(2)
    };
}

// Normalize data fields
function normalizeRecord(data) {
    return {
        aadhaar: String(data.aadhaar || data.aadhar || 'N/A').trim(),
        name: String(data.name || 'Unknown').trim().toUpperCase(),
        state: String(data.state || 'Unknown').trim().toUpperCase(),
        district: String(data.district || 'Unknown').trim().toUpperCase(),
        pincode: String(data.pincode || '000000').trim(),
        age: Math.max(0, parseInt(data.age) || 0),
        bioAge: Math.max(0, parseInt(data.bioage || data['bio-age'] || data.biometric_age) || 0),
        biometricType: String(data.biometrictype || data['biometric-type'] || 'Unknown').trim(),
        status: (String(data.status || '')).toLowerCase().includes('success') ? 'Success' : 'Failure',
        timestamp: new Date()
    };
}

// Fast aggregation using Maps
function aggregateData(records) {
    const stateAgg = new Map();
    const districtAgg = new Map();
    const ageAgg = new Map();
    const stateDistrictAgg = new Map();
    const bioAgeRangeAgg = new Map();

    let totalFailures = 0;

    records.forEach(record => {
        // State Aggregation
        const stateKey = record.state;
        if (!stateAgg.has(stateKey)) {
            stateAgg.set(stateKey, { total: 0, sumBioAge: 0, pincodes: new Set(), failures: 0, avgAge: 0, ageSum: 0 });
        }
        const state = stateAgg.get(stateKey);
        state.total++;
        state.sumBioAge += record.bioAge;
        state.pincodes.add(record.pincode);
        state.ageSum += record.age;
        if (record.status === 'Failure') {
            state.failures++;
            totalFailures++;
        }

        // District Aggregation
        const districtKey = `${record.state}-${record.district}`;
        if (!districtAgg.has(districtKey)) {
            districtAgg.set(districtKey, { total: 0, sumBioAge: 0, pincodes: new Set(), failures: 0, ageSum: 0 });
        }
        const district = districtAgg.get(districtKey);
        district.total++;
        district.sumBioAge += record.bioAge;
        district.pincodes.add(record.pincode);
        district.ageSum += record.age;
        if (record.status === 'Failure') district.failures++;

        // Age Aggregation
        const ageKey = record.age;
        if (!ageAgg.has(ageKey)) {
            ageAgg.set(ageKey, { total: 0, sumBioAge: 0, pincodes: new Set(), failures: 0 });
        }
        const age = ageAgg.get(ageKey);
        age.total++;
        age.sumBioAge += record.bioAge;
        age.pincodes.add(record.pincode);
        if (record.status === 'Failure') age.failures++;

        // Bio-Age Range Aggregation
        let bioAgeRange = 'Unknown';
        if (record.bioAge < 30) bioAgeRange = '< 30';
        else if (record.bioAge < 40) bioAgeRange = '30-40';
        else if (record.bioAge < 50) bioAgeRange = '40-50';
        else if (record.bioAge < 60) bioAgeRange = '50-60';
        else bioAgeRange = '60+';

        if (!bioAgeRangeAgg.has(bioAgeRange)) {
            bioAgeRangeAgg.set(bioAgeRange, { total: 0, sumBioAge: 0, failures: 0 });
        }
        const bioRange = bioAgeRangeAgg.get(bioAgeRange);
        bioRange.total++;
        bioRange.sumBioAge += record.bioAge;
        if (record.status === 'Failure') bioRange.failures++;

        // State-District Aggregation
        if (!stateDistrictAgg.has(districtKey)) {
            stateDistrictAgg.set(districtKey, { state: record.state, district: record.district, total: 0, failures: 0 });
        }
        const sd = stateDistrictAgg.get(districtKey);
        sd.total++;
        if (record.status === 'Failure') sd.failures++;
    });

    // Transform Maps to arrays for JSON serialization
    const transformToArray = (map) => {
        return Array.from(map.entries()).map(([key, val]) => ({
            name: key,
            total: val.total,
            avgBioAge: Math.round(val.sumBioAge / val.total) || 0,
            pincodeCount: val.pincodes?.size || 0,
            failures: val.failures || 0,
            failureRate: ((val.failures / val.total) * 100).toFixed(2),
            avgAge: Math.round((val.ageSum || 0) / val.total) || 0
        })).sort((a, b) => b.total - a.total);
    };

    const transformBioAgeRange = (map) => {
        const bioAgeOrder = ['< 30', '30-40', '40-50', '50-60', '60+'];
        return bioAgeOrder.map(range => {
            const val = map.get(range);
            if (!val) return null;
            return {
                name: range,
                total: val.total,
                avgBioAge: Math.round(val.sumBioAge / val.total) || 0,
                failures: val.failures || 0,
                failureRate: ((val.failures / val.total) * 100).toFixed(2)
            };
        }).filter(Boolean);
    };

    return {
        byState: transformToArray(stateAgg),
        byDistrict: transformToArray(districtAgg),
        byAge: transformToArray(ageAgg),
        byBioAgeRange: transformBioAgeRange(bioAgeRangeAgg),
        stateDistrictMap: Array.from(stateDistrictAgg.values()),
        totalRecords: records.length,
        totalFailures: totalFailures,
        failureRate: ((totalFailures / records.length) * 100).toFixed(2)
    };
}

// Generate statistics
function generateStatistics(aggregations, cleanedRecords, duplicates) {
    const stats = {
        overview: {
            totalRecords: aggregations.totalRecords,
            totalFailures: aggregations.totalFailures,
            failureRate: aggregations.failureRate,
            duplicatesRemoved: duplicates.length,
            dataQualityScore: (100 - parseFloat(aggregations.failureRate)).toFixed(2)
        },
        geographic: {
            statesCount: aggregations.byState.length,
            districtsCount: aggregations.byDistrict.length,
            topState: aggregations.byState[0],
            topDistrict: aggregations.byDistrict[0]
        },
        demographic: {
            ageGroups: aggregations.byAge.length,
            avgAge: Math.round(cleanedRecords.reduce((sum, r) => sum + r.age, 0) / cleanedRecords.length || 0),
            bioAgeRanges: aggregations.byBioAgeRange
        },
        biometric: {
            avgBioAge: Math.round(cleanedRecords.reduce((sum, r) => sum + r.bioAge, 0) / cleanedRecords.length || 0),
            maxBioAge: Math.max(...cleanedRecords.map(r => r.bioAge), 0),
            minBioAge: Math.min(...cleanedRecords.map(r => r.bioAge), 0)
        }
    };

    return stats;
}

export {
    deduplicateData,
    normalizeRecord,
    aggregateData,
    generateStatistics
};
