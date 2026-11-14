import App from '../App';

// The arm's one screen. All state and all engine access live in App.tsx /
// src/state.ts exactly as in arm-react — file routing is the only Next.js
// differentiator this prototype exercises, and it is deliberately unused
// beyond this one route (recorded in the results filing).
export default function Page() {
  return <App />;
}
