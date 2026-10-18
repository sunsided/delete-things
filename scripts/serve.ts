/**
 * Serves build/ the way a static host does (GitHub Pages, a bucket).
 *
 *   yarn build && yarn preview
 *
 * Not `vite preview`: that falls back to the app shell for an unknown path, which a static
 * host will not do. This serves index.html for a directory, a real 404, and a 301 onto the
 * trailing slash. With BASE_PATH set (as the Pages build sets it), the site is served under
 * that prefix, the way a GitHub project page is, and nothing outside it exists.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(process.argv[2] ?? 'build');
const PORT = Number(process.env.PORT ?? 4193);
const BASE = process.env.BASE_PATH ?? '';

const types: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain; charset=utf-8',
	'.xml': 'application/xml',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff'
};

function send(res: import('node:http').ServerResponse, status: number, file: string) {
	res.writeHead(status, {
		'content-type': types[extname(file)] ?? 'application/octet-stream',
		// The deploy sets these for real; mirroring them locally keeps surprises down.
		'cache-control': file.includes('/_app/immutable/')
			? 'public, max-age=31536000, immutable'
			: 'public, max-age=0, must-revalidate'
	});
	createReadStream(file).pipe(res);
}

const server = createServer((req, res) => {
	const url = new URL(req.url ?? '/', 'http://localhost');
	if (BASE && url.pathname === BASE) {
		res.writeHead(301, { location: `${BASE}/${url.search}` }).end();
		return;
	}
	const inBase = !BASE || url.pathname.startsWith(`${BASE}/`);
	const path = normalize(decodeURIComponent(url.pathname.slice(inBase ? BASE.length : 0)));
	if (!inBase) {
		res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
		return;
	}

	// A directory without its trailing slash is a redirect, not a page: relative asset
	// URLs would resolve one level too high otherwise.
	if (!path.endsWith('/') && !extname(path) && existsSync(join(ROOT, path, 'index.html'))) {
		res.writeHead(301, { location: `${BASE}${path}/${url.search}` }).end();
		return;
	}

	const target = join(ROOT, path.endsWith('/') ? `${path}index.html` : path);
	if (target.startsWith(ROOT) && existsSync(target) && statSync(target).isFile()) {
		send(res, 200, target);
		return;
	}

	const notFound = join(ROOT, '404.html');
	if (existsSync(notFound)) {
		send(res, 404, notFound);
		return;
	}
	res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
});

server.listen(PORT, () => console.log(`Serving ${ROOT} on http://localhost:${PORT}${BASE}/`));
