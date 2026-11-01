// shared day/night state — one toggle, every page, persisted
export type ThemeName = 'light' | 'dark';

let current = $state<ThemeName>('light');

if (typeof localStorage !== 'undefined') {
	const saved = localStorage.getItem('twenty-oh-theme');
	if (saved === 'light' || saved === 'dark') current = saved;
}

function persist() {
	try {
		localStorage.setItem('twenty-oh-theme', current);
	} catch {
		/* private mode etc — theme just won't persist */
	}
}

export const theme = {
	get current(): ThemeName {
		return current;
	},
	toggle() {
		current = current === 'light' ? 'dark' : 'light';
		persist();
	},
	set(v: ThemeName) {
		current = v;
		persist();
	}
};
