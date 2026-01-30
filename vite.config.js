import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import process from 'process';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            react(),
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
                manifest: {
                    name: 'Elders Seva - National Biometric Portal',
                    short_name: 'EldersSeva',
                    description: 'Biometric Obsolescence Solution for the Elderly',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                }
            })
        ],
        define: {
            'process.env.API_KEY': JSON.stringify(env.API_KEY)
        },
        server: {
            port: 5173,
            open: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:8888',
                    changeOrigin: true,
                    secure: false,
                }
            }
        }
    };
});
