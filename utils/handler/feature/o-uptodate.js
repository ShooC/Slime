import { exec } from 'child_process';

export const handle = async (m, { q, conn }) => {
	if (!m.isOwn) return
	exec(`git config --global user.email ${q.emailgh} && git config --global user.name ${q.usernamegh} && git add . && git commit -m "Update" && git push`, (stderr, stdout) => {
		if (stderr) return conn.sendteks(m.chat, stderr, m);
		if (stdout) return conn.sendteks(m.chat, stdout, m);
	})
}