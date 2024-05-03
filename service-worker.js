// 서비스 워커 설치
self.addEventListener('install', function(event) {
  console.log('서비스 워커가 설치되었습니다.');
});

// 서비스 워커 활성화
self.addEventListener('activate', function(event) {
  console.log('서비스 워커가 활성화되었습니다.');
});

// 오프라인 캐싱
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 캐시에서 요청을 찾으면 반환
        if (response) {
          return response;
        }
        // 네트워크 요청에 대한 응답을 받아 캐시에 추가하고 반환
        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open('my-cache')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});