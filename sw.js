// ده اسم نسخة الملفات اللي هنخزنها
const CACHE_NAME = 'mstore-cache-v1';

// الملفات اللي هنقدر نشتغل بيها أوفلاين
const urlsToCache = [
  'mstore.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo&display=swap'
];

// لما التطبيق يتحمل أول مرة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم تخزين الملفات للأوفلاين');
        return cache.addAll(urlsToCache);
      })
  );
});

// لما نطلب أي ملف
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // لو الملف موجود عندنا مخزن
        if (response) {
          return response;
        }
        // لو مش موجود، نحمله من الإنترنت
        return fetch(event.request);
      })
  );
});