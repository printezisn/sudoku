import ActionButton from './components/action-button';
import ThemeSwitch from './components/theme-switch';
import './styles/main.scss';

// Initialize components
customElements.define('app-theme-switch', ThemeSwitch);
customElements.define('app-action-button', ActionButton);

// Remove curtain
setTimeout(() => {
  document.body.classList.remove('curtain');
}, 0);

// Register service worker
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sudoku/service-worker.js');
}
