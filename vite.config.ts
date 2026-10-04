import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api/kinopoisk": {
                    target: "https://api.poiskkino.dev",   // ← НОВЫЙ домен
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/kinopoisk/, ""),
                    headers: {
                        "X-API-KEY": env.VITE_KINOPOISK_TOKEN,
                    },
                },
            },
        },
    };
});