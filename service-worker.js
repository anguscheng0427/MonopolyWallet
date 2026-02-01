    const CACHE_NAME = 'monopoly-wallet-v1';
    const urlsToCache = [
      './',
      './index.html',
      './manifest.json',
      'https://cdn.tailwindcss.com',
      'https://unpkg.com/react@18/umd/react.production.min.js',
      'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
      'https://unpkg.com/@babel/standalone/babel.min.js',
      'https://unpkg.com/lucide@latest',
      'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
      'https://unpkg.com/html5-qrcode'
    ];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => cache.addAll(urlsToCache))
      );
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) return response;
            return fetch(event.request);
          })
      );
    });
    ```

3.  **最後一步**：在 `index.html` 的 `<head>` 區塊內（大約在 `<title>` 下方）加入以下兩行程式碼，來連結這兩個檔案：
    ```html
    <link rel="manifest" href="manifest.json">
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('service-worker.js');
        });
      }
    </script>
    

