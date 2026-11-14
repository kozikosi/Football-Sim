// v3 acceptance config — lives beside the spec so one @playwright/test copy
// resolves everything. Servers are managed by the runner (v3_pw_run.sh);
// BASE_URL points at the arm under test.
import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: '.',
	timeout: 30000,
	retries: 0,
	reporter: [['line']],
	use: {
		headless: true,
		baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
	},
	outputDir: process.env.PW_OUTPUT_DIR ?? '/tmp/pw-results',
});
