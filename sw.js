// Living Well Rep Portal — Service Worker
self.addEventListener('push', function(event) {
  let data = { title: '🛍️ Living Well', body: 'You have a new notification' };
  try { data = event.data.json(); } catch(e) {}

  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200, 100, 200],
    data: { url: self.location.origin },
    actions: [{ action: 'open', title: 'Open Portal' }]
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
