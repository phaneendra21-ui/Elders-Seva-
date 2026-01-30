# Innovation Report: Elders Seva

**Hackathon: Google Lakecity Hackathon 2026**

## 🚀 Core Google Technology: Progressive Web App (PWA)
We have implemented **Offline PWA Capabilities** using Google's **Workbox** libraries (via `vite-plugin-pwa`).

### How it works:
1.  **Offline-First**: The application caches all critical resources (HTML, CSS, JS) upon first load.
2.  **Service Worker**: A service worker intercepts network requests. If the internet is disconnected, it serves the cached version of the app.
3.  **Installable**: Users can install "Elders Seva" directly onto their Android/iOS devices or Desktop, behaving like a native application.

This is critical for our target demographic (rural elders) where internet connectivity can be intermittent.

---

## 🎯 Innovative Feature: Zero-Knowledge Edge Analytics

Unlike traditional analytics dashboards that upload sensitive biometric data to a centralized server (posing huge privacy and security risks), we introduced **Client-Side Edge Analytics**.

### The Innovation:
- **100% Local Processing**: When an Admin uploads a Biometric CSV, the file is **NEVER** sent to the cloud or our backend server.
- **In-Browser Compute**: The parsing, deduplication algorithm (O(1) using HashMaps), and statistical aggregation all happen directly in the User's browser memory (JavaScript).
- **Privacy Guarantee**: This "Zero-Knowledge" approach ensures that raw Aadhaar data never leaves the official's device, making it fully compliant with strict data privacy laws (like DPDP Act 2023).

### Impact:
- **Zero Latency**: Instant analysis without network round-trips.
- **Infinite Scalability**: Our server load is zero, regardless of dataset size, as the compute is distributed to the client devices.
- **Privacy Compliance**: Automatic compliance by design.
