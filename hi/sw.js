const CACHE_NAME = 'ai-tutor-v2';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// 1. 설치 단계: 파일들을 캐시에 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. 실행 단계: 네트워크 요청 시 캐시된 데이터 먼저 확인
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 캐시 반환, 없으면 인터넷(네트워크)에서 가져옴
        return response || fetch(event.request);
      })
  );
});
