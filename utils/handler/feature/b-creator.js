export const handle = async (m, { q, conn }) => {
	let kontak = [
		[q.name, q.developer[0], 'Dev Bot' ],
		['Bot', q.developer[1], 'Yo Guys 🥶' ],
		];
	await conn.sendkon(m.chat, q.name, kontak, m)
	.catch(v => conn.sendteks(m.chat, q.gagal, m));
}