import simi from 'similarity';
let sensitive = 0.75
export const handle = async (m, { q, conn, bb, budy }) => {
	let i = m.chat
	// GAME ASAH NGOTAK
	conn.ngotak = conn.ngotak ? conn.ngotak : {}
	if (i in conn.ngotak) {
		if (simi(conn.ngotak[i][2], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nSoalan:\n${bb(conn.ngotak[i][1])}\nJawaban : ${conn.ngotak[i][2]}`, m)
			clearTimeout(conn.ngotak[i][3])
			delete conn.ngotak[i]
		}
	}
	// GAME CAK LON - T
	conn.caklontong = conn.caklontong ? conn.caklontong : {}
	if (i in conn.caklontong) {
		if (simi(conn.caklontong[i][2], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nSoalan:\n${bb(conn.caklontong[i][1])}\nJawaban : ${conn.caklontong[i][2]}`, m)
			clearTimeout(conn.caklontong[i][3])
			delete conn.caklontong[i]
		}
	}
	// GAME SIAPA KAMU?
	conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
	if (i in conn.siapakahaku) {
		if (simi(conn.siapakahaku[i][2], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nSoalan:\n${bb(conn.siapakahaku[i][1])}\nJawaban : ${conn.siapakahaku[i][2]}`, m)
			clearTimeout(conn.siapakahaku[i][3])
			delete conn.siapakahaku[i]
		}
	}
	// GAME SUSUN OMAH
	conn.susunkata = conn.susunkata ? conn.susunkata : {}
	if (i in conn.susunkata) {
		if (simi(conn.susunkata[i][2], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nSoalan:\n${bb(conn.susunkata[i][1])}\nJawaban : ${conn.susunkata[i][2]}`, m)
			clearTimeout(conn.susunkata[i][3])
			delete conn.susunkata[i]
		}
	}
	// GAME TEBAK KATE
	conn.kata = conn.kata ? conn.kata : {}
	if (i in conn.kata) {
		if (simi(conn.kata[i][2], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nSoalan:\n${bb(conn.kata[i][1])}\nJawaban : ${conn.kata[i][2]}`, m)
			clearTimeout(conn.kata[i][3])
			delete conn.kata[i]
		}
	}
	// GAME TEBAK KALIMAT
	conn.kalimat = conn.kalimat ? conn.kalimat : {}
	if (i in conn.kalimat) {
		if (simi(conn.kalimat[i][2], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nSoalan:\n${bb(conn.kalimat[i][1])}\nJawaban : ${conn.kalimat[i][2]}`, m)
			clearTimeout(conn.kalimat[i][3])
			delete conn.kalimat[i]
		}
	}
	// GAME TEBAK GAMBARE
	conn.gambare = conn.gambare ? conn.gambare : {}
	if (i in conn.gambare) {
		if (simi(conn.gambare[i][1], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nJawaban : ${conn.gambare[i][1]}`, m)
			clearTimeout(conn.gambare[i][2])
			delete conn.gambare[i]
		}
	}
	// GAME TEBAK BENDERA
	conn.bendera = conn.bendera ? conn.bendera : {}
	if (i in conn.bendera) {
		if (simi(conn.bendera[i][1], budy.toLowerCase()) >= sensitive) {
			conn.sendteks(i, `Jawaban benarr🥳\n\nJawaban : ${conn.bendera[i][1]}`, m)
			clearTimeout(conn.bendera[i][2])
			delete conn.bendera[i]
		}
	}
	// GAME FAMILY 1000
	conn.family = conn.family ? conn.family : {};
	conn.addfamily = conn.addfamily ? conn.addfamily : {};
	if (i in conn.family) {
		if (conn.addfamily[i][2].includes(budy) && conn.addfamily[i][0][conn.addfamily[i][3]]) {
			conn.sendteks(i, '', m);
			clearInterval(conn.family[i][1]);
			conn.family[i].pop()
			if (conn.addfamily[i][3] <= conn.addfamily[i][0].length) {
				let index = conn.addfamily[3];
				conn.family[i].push(setInterval(async() => {
					if (conn.family[i]) {
						await conn.sendteks(i,`Waktu habis!!!\n\n@${conn.addfamily[i][0][index]}`,m, {mentions: [conn.addfamily[i][0][index]]});
						conn.addfamily[i][3]++
						await q.delay(1000);
						if (conn.addfamily[i][3] >= conn.addfamily[i][0].length) {
							clearInterval(conn.family[i][1]);
							conn.sendteks(i, `Jawaban tidak selesai!!\nSoal : ${conn.addfamily[i][1]}\n\n${conn.addfamily[i][2].join('\n')}`, m);
							delete conn.addfamily[i];
							delete conn.family[i];
						} else await conn.sendteks(i, `Giliran kamu : @${conn.addfamily[i][0][index]}\nJawab lah pertanyaan ini:\n${bb(conn.addfamily[i][1])}\n\nAda Opsi ${conn.addfamily[i][2].length} Jawaban\n🕰️Waktu : ${q.timeoutgame/1000} Detik`, m, {mentions: [conn.addfamily[i][0][index]]});
					}
				}, q.timeoutgame));
			}
		}
	}
}