
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Gestionnaire d'erreurs pour aider au diagnostic sur mobile/github
window.onerror = function(msg, url, line, col, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="background: #1e293b; color: #ef4444; padding: 20px; border-radius: 10px; margin: 20px; font-family: monospace; font-size: 12px; border: 1px solid #ef4444;">
        <h3 style="margin-top:0">Erreur de démarrage :</h3>
        <p>${msg}</p>
        <small>Ligne: ${line} | Col: ${col}</small>
      </div>
    `;
  }
  return false;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
