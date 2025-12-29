
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fonction pour retirer le loader HTML statique une fois que React est prêt
const removeLoader = () => {
  const loader = document.getElementById('fallback-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 300);
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Impossible de trouver l'élément root");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// On retire le loader dès que le rendu initial est fait
removeLoader();
