import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../server.mjs';
test('serves only the recipe assets with explicit content types', async (t) => {
  const server = createServer();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  t.after(() => {
    server.closeAllConnections();
    return new Promise((r) => server.close(r));
  });
  const url = 'http://127.0.0.1:' + server.address().port;
  assert.match(await (await fetch(url)).text(), /Good interfaces/);
  assert.match((await fetch(url + '/app.js')).headers.get('content-type'), /javascript/);
  assert.equal((await fetch(url + '/package.json')).status, 404);
});
