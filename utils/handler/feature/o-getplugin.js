import { readdirSync, readFileSync } from 'node:fs';
import cp, { exec as _exec } from 'node:child_process';
import { promisify } from 'node:util';
let cache = new Map();
let path = './utils/handler/feature/';
let exc = promisify(_exec).bind(cp);

export const handle = async (m, { q, conn }) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m);
	let allPluginName = await readdirSync(path);
	if (!m.query) return conn.sendteks(m.chat, `Mau cari plugin apa??\n\n${q.a6}\n\n${allPluginName.map(_=>'*'+_.split('.js')[0]+'*').join('\n')}`, m);
	if (!(allPluginName.includes(m.query+'.js'))) return conn.sendteks(m.chat, `Plugin yang anda cari tidak ada bang !!!\n\n${q.a6}\n\n${allPluginName.map(_=>'*'+_.split('.js')[0]+'*').join('\n')}`, m);
	if (!cache.has(m.query)) {
		let plugin = await exc(`cat utils/handler/feature/${m.query}.js`);
		if (plugin.stderr) return conn.sendteks(m.chat, plugin.stderr, m);
			await cache.set(m.query, plugin.stdout);
			conn.sendteks(m.chat, plugin.stdout, m)
	} else if (cache.has(m.query)) {
		conn.sendteks(m.chat, await cache.get(m.query), m)
	}
};