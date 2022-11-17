import fs from 'fs';

const json = JSON.parse(fs.readFileSync('./Models/Pesan/commands.json'));

export const handle = async (m, { q, conn, d, bb, getpp, more }) => {
	let teks = q.tit('Total Fitur Bot')+'\n\n'
		teks += `Terdapat : ${json[0].length + json[1].length}`
	conn.sendteks(m.chat, teks, d.f1('Slime Bot Simple Menu',''), d.f2('Github:me',await getpp(m.sender), q.home))
}
