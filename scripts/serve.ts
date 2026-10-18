/**
 * Serves build/ the way the Cloud Storage bucket behind Cloudflare does.
 *
 *   yarn build && yarn preview
 *
 * Not `vite preview`: that falls back to the app shell for an unknown path, which the
 * bucket will not do, so it hides exactly the clean-URL mistakes worth catching. This
 * mimics the bucket's website configuration instead — MainPageSuffix=index.html,
 * NotFoundPage=404.html with a real 404 status, and a 301 from /lab to /lab/ — so a
 * local preview and a deployed page disagree about as little as possible.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(process.argv[2] ?? 'build');
const PORT = Number(process.env.PORT ?? 4193);

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
	const path = normalize(decodeURIComponent(url.pathname));

	// A directory without its trailing slash is a redirect, not a page: relative asset
	// URLs would resolve one level too high otherwise.
	if (!path.endsWith('/') && !extname(path) && existsSync(join(ROOT, path, 'index.html'))) {
		res.writeHead(301, { location: `${path}/${url.search}` }).end();
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

server.listen(PORT, () => console.log(`Serving ${ROOT} like a bucket on http://localhost:${PORT}`));
