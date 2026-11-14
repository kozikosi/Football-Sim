// @ts-nocheck
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
// v3 fix: global CSS imported by the root App component (moved here from
// src/routes/index.tsx — a CSS import inside a route file keyed the route
// module graph with `pick=$css` and the SSR branch rendered empty; receipts
// in logs/v3-solidstart-*.log).
import './app.css';

export default function App() {
	return (
		<Router root={(props) => <>{props.children}</>}>
			<FileRoutes />
		</Router>
	);
}
