
export const handle = async(m, { up, q, d, conn, isBotAdmin, isAdmin, budy, userAfk }) => {
	// REPLY
	const rep = async (teks) => await conn.sendteks(m.chat, teks, d.f1('Notifikasi Keamanan Group', ''))
	// DELETE
	const del = async () => await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} });
	// KICK
	const kik = async () => await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
	const pp = async () => {let user = userAfk.get(m.sender);if (user[2] == true) {return conn.sendteks(m.chat,`Kamu berhenti afk...\nSetelah alasan : ${user[1]}\nSelama : ${q.time(new Date()*1- user[0])}`, m);userAfk.set(m.sender, [0,null,false])}}
	// AFK DETEKTOR
	try {
		// AFK ANTI TAGS OR REACT
		let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : []), ...(m.react ? [m.rtarget] : [])])]
		for (let u of jids) {
			let user = userAfk.get(u);
			if (!user) continue
			if (!user[0] || user[0] < 0) continue
			if (m.fromMe) continue
			conn.sendteks(m.chat, `Ssstt🤫 ${m.react ? '@'+m.sender.split('@')[0] : ''}, orang nya sedang afk...\n Kamu jangan tag dia!!!\nJangan react Dia!!!\nJangan Reply Dia!!!\nDia afk sejak : ${q.time(new Date - user[0])} yang lalu\nDengan alasan : ${user[1]}`, m, {mentions: [m.sender]})
		}
pp()
		if (m.chat.endsWith(q.idgc)) {
			// DETECTOR LINK
			if (conn.db.data.chat[m.chat].antilink) {
				if (budy.match(`chat.whatsapp.com`)) {
					rep('[ Anti Link ]\ngroup ini dilengkapi dengan anti link\nanda melanggar larangan bot\nAnda berhak di kick');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
					kik();
				}
			}
			// DETECTOR STICKER
			if (conn.db.data.chat[m.chat].antistik) {
				if (m.mtype === 'stickerMessage') {
					rep('[ Anti Stiker ]\ngroup ini dilengkapi dengan anti sticker\nSticker anda dihapus Bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR BOT
			if (conn.db.data.chat[m.chat].antibot) {
				if (up.key.id.startsWith('BAE5') && !up.key.fromMe) {
					rep('[ Anti Bot ]\ngroup ini dilengkapi dengan anti bot\nanda melanggar larangan bot\nAnda berhak di kick');
					if (isAdmin) throw 'Maaf Kamu admin ternyata'
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					kik();
				}
			}
			// DETECTOR VN
			if (conn.db.data.chat[m.chat].antivn) {
				if (m.mtype === 'audioMessage') {
					rep('[ Anti Voice Note ]\ngroup ini dilengkapi dengan anti VN\nVN anda dihapus bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR VIDEO
			if (conn.db.data.chat[m.chat].antivid) {
				if (m.mtype === 'videoMessage') {
					rep('[ Anti Video ]\ngroup ini dilengkapi dengan anti Video\nVideo anda dihapus bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata'
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR IMAGE
			if (conn.db.data.chat[m.chat].antiimg) {
				if (m.mtype === 'imageMessage') {
					rep('[ Anti Image ]\ngroup ini dilengkapi dengan anti image\nImage anda dihapus bot');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					del();
				}
			}
			// DETECTOR LUAR
			if (conn.db.data.chat[m.chat].antiluar) {
				if (!(m.sender.startsWith('62'))) {
					rep('[ Anti orang luar ]\ngroup ini dilengkapi dengan anti nomor luar');
					if (isAdmin) throw 'Maaf Kamu admin ternyata';
					if (m.isOwn) throw 'Oh tidak, kamu ownerku';
					if (!isBotAdmin) throw 'Oh tidak, Bot not admin';
					kik();
				}
			}
		}
	} catch (e) {
		conn.sendteks(m.chat, e, m)
	}
};