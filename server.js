
import express from 'express';
import path from 'path';
import { exec } from 'child_process';
import os from 'os';
import { fileURLToPath } from 'url';
import cors from 'cors';
import compression from 'compression';
import fs from 'fs';
import { loginAdmin, logoutAdmin, verifyAuth } from './services/authService.js';
import { deduplicateData, generateStatistics, aggregateData } from './services/dataProcessingService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8888;

// Authentication Middleware
const verifyAuthToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const userId = verifyAuth(token);
    if (!userId) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.userId = userId;
    next();
};

// Get Local Network IP
const getNetworkIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '0.0.0.0';
};

app.use(express.static(__dirname));
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '100mb' }));

// ============ AUTH ENDPOINTS ============

// Admin Login only
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const result = loginAdmin(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const result = logoutAdmin(token);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoints removed successfully

// Download cleaned data endpoint
app.post('/api/download-cleaned-data', verifyAuthToken, (req, res) => {
    try {
        const { data } = req.body;
        if (!data || data.length === 0) {
            return res.status(400).json({ error: 'No data to download' });
        }

        // Convert to CSV format
        const headers = Object.keys(data[0]);
        let csv = headers.join(',') + '\n';

        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                if (value === null || value === undefined) return '';
                if (typeof value === 'string' && value.includes(',')) {
                    return `"${value}"`;
                }
                return value;
            });
            csv += values.join(',') + '\n';
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="cleaned_data_${Date.now()}.csv"`);
        res.send(csv);

    } catch (error) {
        res.status(500).json({ error: 'Failed to generate CSV: ' + error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    const networkIP = getNetworkIP();
    const localUrl = `http://localhost:${PORT}`;
    const networkUrl = `http://${networkIP}:${PORT}`;

    console.log(`
===================================================
  🚀 ELDERSNET PORTAL IS LIVE
===================================================
  > WINDOWS ACCESS:   ${localUrl}
  > MOBILE DEVICES:   ${networkUrl}

  ADMIN LOGIN CREDENTIALS:
  Email: admin@elderseva.com
  Password: Admin@123
===================================================
  `);

    // Auto-open browser on Windows
    const startCommand = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${startCommand} ${localUrl}`);
});
