// VLC V1 — main.tsx
// React entry point. Bootstraps the engine and mounts the app.
// At release, Vite bundles this + src/ into a single self-contained HTML file.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
