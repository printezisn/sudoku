import initThemeSwitch from './components/theme-switch';
import './styles/main.scss';

initThemeSwitch();

// Remove curtain
setTimeout(() => {
  document.body.style.opacity = '';
}, 500);

// Register service worker
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sudoku/service-worker.js');
}
