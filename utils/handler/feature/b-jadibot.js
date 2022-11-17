const { default: A, DisconnectReason, useMultiFileAuthState } = (await import('baileys')).default;
import ws from 'ws';
import qrcd from 'qrcode';
import { configConnectionJadibot, store } from '../../config-connection.js';
import msgUp from '../msg-upsert.js';
import { convertBase64 } from '../../util/convert-media.js';

let jadibott = 0
const bebek = async (m, u, a, q, g, p) => {
	let { lastDisconnect, connection, qr } = u
	if (qr) {
		if (jadibott == 5) {
			jadibott = 0
			p.logout();
			return a.sendteks(m.chat, `Tidak tersambung!!!\nJadi bot otomatis berhenti hehe`, m);
		}
		let scanner = await a.sendimgbuf(m.chat, Buffer.from((await qrcd.toDataURL(qr, { scale: 8 })).split(',')[1], 'base64'), `Jadi Bot Whatsapp\n\nSilahkan Scan QR Code ini!!!\nWaktu scan Cuma ${q.longqr/1000} detik...\n\nQR akan berhenti dengan sendiri jika tidak ada yang tersambung!!!`, m);
		setTimeout(async () => {
			await a.sendMessage(m.chat, { delete: scanner.key });
		}, q.longqr);
		jadibott++
	}
	if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && a.ws.readyState !== ws.CONNECTING) p(g, a, q, m)
	else if (connection == 'open') {
		a.sendteks(m.chat, `@${m.sender.split('@')[0]} Telah tersambung ke server ${q.name}....`, m);
		jadibott = 0
	} else if (connection == 'close') {
		a.sendteks(g, `Koneksi terputus!!!\nTunggu sedang menyambungkan ulang!!!`, m);
	}
}

const conn2 = async (user, conn, q, m) => {
	let folder = `TMP/jadibot-${user}`
	const { state, saveCreds } = await useMultiFileAuthState(folder);
	const c = A(Object.assign(configConnectionJadibot, { auth: state }));
	store.bind(c.ev);
	c.ev.on('connection.update', async (u) => bebek(m, u, conn, q, user, conn2, c));
	c.ev.on('messages.upsert', async (u) => msgUp(u, c));
	c.ev.on('creds.update', saveCreds);
}

export const handle = async(m, { q, conn }) => {
	let user = m.sender
	await conn.sendteks(m.chat, `🕰️ Tunggu sebentar!!!\nSedang meload QR code`, m);
	conn2(user, conn, q, m)
}