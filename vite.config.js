import { sveltekit } from '@sveltejs/kit/vite';

export default {
        plugins: [sveltekit()],
        server: {
                host: '0.0.0.0',
                port: 5000,
                allowedHosts: true,
                hmr: { 
                        clientPort: 443,
                        host: 'localhost'
                }
        }
};