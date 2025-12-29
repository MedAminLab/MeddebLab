
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fonction pour retirer le loader HTML statique
const removeLoader = () => {
  const loader = document.getElementById('fallback-loader');
  if (loader) {
    loader.style.transition = 'opacity 0.5s ease';
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  // On rend l'application
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // On attend un court instant que React commence à monter pour retirer le loader
  setTimeout(removeLoader, 100);
} else {
  console.error("Impossible de trouver l'élément root");
}
