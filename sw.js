// Service Worker for GAT Certificate Management System PWA

const CACHE_NAME = 'gat-certificate-system-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline certificate requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'certificate-request-sync') {
    event.waitUntil(syncCertificateRequests());
  }
});

// Sync certificate requests when online
async function syncCertificateRequests() {
  try {
    // Get pending requests from IndexedDB or localStorage
    const pendingRequests = await getPendingRequests();
    
    for (const request of pendingRequests) {
      // Simulate API call to sync request
      console.log('Syncing certificate request:', request.id);
      // In a real implementation, this would send the request to the server
      await markRequestAsSynced(request.id);
    }
  } catch (error) {
    console.error('Failed to sync certificate requests:', error);
  }
}

// Helper functions for offline functionality
async function getPendingRequests() {
  // In a real implementation, this would get data from IndexedDB
  return [];
}

async function markRequestAsSynced(requestId) {
  // In a real implementation, this would update the request status
  console.log('Marked request as synced:', requestId);
}

// Handle push notifications (for future enhancement)
self.addEventListener('push', (event) => {
  const options = {
    body: 'You have a new certificate update!',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzYzNjZmMSIvPgo8cGF0aCBkPSJNOCAxMmg2djJIOHYtMnptMCA0aDEydjJIOHYtMnptMCA0aDEwdjJIOHYtMnoiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjIwIiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
    badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzYzNjZmMSIvPgo8cGF0aCBkPSJNOCAxMmg2djJIOHYtMnptMCA0aDEydjJIOHYtMnptMCA0aDEwdjJIOHYtMnoiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjIwIiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Certificate',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTRBNiA2IDAgMSAwIDggMmE2IDYgMCAwIDAgMCAxMloiIGZpbGw9IiM2MzY2ZjEiLz4KPC9zdmc+'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDRMNCA2IDQgNCAxMloiIGZpbGw9IiM2YjcyODAiLz4KPC9zdmc+'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GAT Certificate System', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    // Open the app to the relevant section
    event.waitUntil(
      clients.openWindow('/?notification=certificate-update')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    console.log('Notification closed by user');
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle message from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic background sync for checking certificate status updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'certificate-status-check') {
    event.waitUntil(checkCertificateStatusUpdates());
  }
});

async function checkCertificateStatusUpdates() {
  try {
    console.log('Checking for certificate status updates...');
    // In a real implementation, this would check with the server for updates
    // and show notifications for any status changes
  } catch (error) {
    console.error('Failed to check certificate status updates:', error);
  }
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection in Service Worker:', event.reason);
});

// Network status handling
self.addEventListener('online', () => {
  console.log('Network is back online');
  // Trigger sync of pending data
  self.registration.sync.register('certificate-request-sync');
});

self.addEventListener('offline', () => {
  console.log('Network is offline');
});

console.log('Service Worker loaded successfully');