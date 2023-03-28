import {defineConfig} from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    server: {
        https: true,
        open: '/src/index.html',
        proxy: {
            '/api': {
                target: 'https://localhost:7133',
                changeOrigin: true,
                secure: false
            },
        }
    },
    plugins: [mkcert()]
})