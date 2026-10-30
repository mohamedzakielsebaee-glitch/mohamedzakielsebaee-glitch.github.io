/* Gas Maintenance Group - Firebase Cloud Messaging service worker */

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if ('focus' in client) {
          try { client.navigate(targetUrl); } catch (e) {}
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCnCxBurG8x82dgCLIbps-3yUk9P7FgK6k',
  authDomain: 'gas-maintenance-app.firebaseapp.com',
  projectId: 'gas-maintenance-app',
  storageBucket: 'gas-maintenance-app.firebasestorage.app',
  messagingSenderId: '712614942966',
  appId: '1:712614942966:web:5160b841b594d605a974d7',
  measurementId: 'G-TXW9XH9QS9'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Background message:', payload);

  const notification = payload.notification || {};
  const data = payload.data || {};
  const title = notification.title || data.title || 'Gas Maintenance Group';
  const body = notification.body || data.body || 'لديك إشعار جديد';
  const url = data.url || './';

  return self.registration.showNotification(title, {
    body,
    icon: data.icon || './icon-192.png',
    badge: data.badge || './icon-192.png',
    tag: data.tag || 'gmg-notification',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [300, 100, 300],
    data: { url }
  });
});
