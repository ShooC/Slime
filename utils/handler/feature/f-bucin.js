import { bucin } from '@bochilteam/scraper';

export const handle = async (m, { q, conn, bb }) => {
	conn.sendteks(m.chat, bb(await bucin())+'\n\nBy bolaxd', m)
}