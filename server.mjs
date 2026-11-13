import http from 'node:http';
import fs from 'node:fs/promises';
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
export function createServer() {
  return http.createServer(async (req, res) => {
    const files = {
      '/': ['index.html', 'text/html; charset=utf-8'],
      '/app.js': ['app.js', 'text/javascript'],
      '/style.css': ['style.css', 'text/css'],
    };
    const file = files[req.url];
    if (req.method !== 'GET' || !file) {
      res.writeHead(404);
      return res.end('Not found');
    }
    try {
      const data = await fs.readFile(new URL('./public/' + file[0], import.meta.url));
      res.writeHead(200, {
        'Content-Type': file[1],
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'",
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(data);
    } catch {
      res.writeHead(500);
      res.end('File unavailable');
    }
  });
}
if (
  process.argv[1] &&
  realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1])
) {
  const port = Number(process.env.PORT ?? 4330);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  const server = createServer();
  server.listen(port, '127.0.0.1', () => console.log('UI recipes: http://127.0.0.1:' + port));
  for (const s of ['SIGINT', 'SIGTERM']) process.on(s, () => server.close());
}
