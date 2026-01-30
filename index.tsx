
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical Failure during React hydration:", error);
    container.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace;">
      <h1 style="color: #ef4444;">FATAL SYSTEM ERROR</h1>
      <p>Failed to initialize KIHA Scouting UI. Check console for details.</p>
    </div>`;
  }
} else {
  console.error("Critical Failure: Root element not found.");
}
