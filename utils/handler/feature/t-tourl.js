import { toUrl } from '../../util/convert-media.js';
// BELOM FIX
export const handle = async (m, { q, conn, quoted, mime }) => {
	if (!/image/.test(mime)) return conn.sendteks(m.chat, 'Upload lah gambar!', m);
	let dl = await quoted.download()
	let res = await toUrl(dl)
	conn.sendteks(m.chat, res, m)
}