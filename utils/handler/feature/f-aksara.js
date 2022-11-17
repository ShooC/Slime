import { latinToAksara } from '@bochilteam/scraper';

export const handle = async (m, { q, conn }) => {
	if (!m.query) return conn.sendteks(m.chat, q.notext, m);
	conn.sendteks(m.chat, `Terjemah dari : ${m.query}\n\n${await latinToAksara(m.query)}`, m)
}