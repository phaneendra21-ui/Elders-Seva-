/**
 * Authentication Service - Admin Only
 * Simple admin login for accessing analysis dashboard
 */

// Admin credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@elderseva.com',
    password: 'Admin@123'  // Change in production
};

const sessions = new Map();

// JWT-like token generator (simple implementation)
function generateToken(userId) {
    const payload = {
        userId,
        timestamp: Date.now(),
        randomId: Math.random().toString(36).substr(2, 9),
        role: 'admin'
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function verifyToken(token) {
    try {
        const payload = JSON.parse(Buffer.from(token, 'base64').toString());
        // Token expires in 24 hours
        if (Date.now() - payload.timestamp > 24 * 60 * 60 * 1000) {
            return null;
        }
        return payload.userId;
    } catch (e) {
        return null;
    }
}

// Admin login only
function loginAdmin(email, password) {
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
        throw new Error('Invalid admin credentials');
    }

    const token = generateToken('admin');
    sessions.set(token, {
        userId: 'admin',
        role: 'admin',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    return {
        success: true,
        token,
        user: {
            email: email,
            role: 'admin',
            name: 'Administrator'
        }
    };
}

// Logout
function logoutAdmin(token) {
    sessions.delete(token);
    return { success: true, message: 'Logged out successfully' };
}

// Verify authentication
function verifyAuth(token) {
    if (!token) return null;
    
    const userId = verifyToken(token);
    if (!userId) return null;

    const session = sessions.get(token);
    if (!session) return null;

    return userId;
}

// Get admin info
function getAdminInfo() {
    return {
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
        name: 'Administrator'
    };
}

export {
    loginAdmin,
    logoutAdmin,
    verifyAuth,
    generateToken,
    verifyToken,
    getAdminInfo
};
