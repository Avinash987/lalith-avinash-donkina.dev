import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
	assetsInclude: ['**/*.JPG'],
	plugins: [
		react(),
		imagetools(),
		compression({
			algorithm: 'brotliCompress',
			ext: '.br',
		}),
		compression({
			algorithm: 'gzip',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	base: '/lalith-avinash-donkina.dev',
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true, 
				dead_code: true,
				drop_debugger: true,
			},
		},
	},
});
