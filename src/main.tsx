import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register';
import { requestNotificationPermission } from './functions/setNotifications.ts';

registerSW({
  immediate: true,
  onRegisteredSW: () => {
    requestNotificationPermission()
  }
});

createRoot(document.getElementById('root')!).render(
  <App />
)
