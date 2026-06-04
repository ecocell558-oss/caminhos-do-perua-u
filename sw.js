// sw.js - Service Worker para notificações push do Blog Caminhos do Peruaçu
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Caminhos do Peruaçu';
  const options = {
    body: data.body || 'Novo conteúdo disponível no blog!',
    icon: data.icon || '/logoperuacu.png',
    badge: '/logoperuacu.png',
    data: { url: data.url || '/' },
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.url;
  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});