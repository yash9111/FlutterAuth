'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "c4a6b17a93d02e5de5ec6984c17ed8a5",
"assets/AssetManifest.bin.json": "d028d93471dd69d32d71b4b5db4940f0",
"assets/AssetManifest.json": "8a46e81febd54eb461562fde05b00786",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/NOTICES": "dcb1219b84c994080382cb0b3f06c9b2",
"assets/packages/auth_buttons/images/default/apple.svg": "ead30544d55b2c61eb349ea5944aa4b8",
"assets/packages/auth_buttons/images/default/email.svg": "720b2e4750311bbe2da2eec0ad4d2729",
"assets/packages/auth_buttons/images/default/facebook.svg": "930f12e4368ca21a906e5e0be269cb0b",
"assets/packages/auth_buttons/images/default/github_black.svg": "3f95161c44b7dc2a10a52195ca2d44ef",
"assets/packages/auth_buttons/images/default/google.svg": "c8a84e9ebef3c08f4cdcbfd0dc8044bb",
"assets/packages/auth_buttons/images/default/huawei.svg": "5d26303d0f2d5c47a61572d381211f7e",
"assets/packages/auth_buttons/images/default/microsoft.svg": "0143e7fa98f86f66b31eda99d45da935",
"assets/packages/auth_buttons/images/default/twitter.svg": "a44723fac9b4d66805d745c59b566033",
"assets/packages/auth_buttons/images/outlined/apple.svg": "546549e93151fc78951029fae842f855",
"assets/packages/auth_buttons/images/outlined/email.svg": "780cd3d1832fa5b1cd59b16494579241",
"assets/packages/auth_buttons/images/outlined/facebook.svg": "17ae60cd022e23148789be8a68716da0",
"assets/packages/auth_buttons/images/outlined/github.svg": "9b5dbdf8912fa2c6c58d832e40ee290e",
"assets/packages/auth_buttons/images/outlined/google.svg": "9100a6ae9c08541533fdfd1ffa8d4edd",
"assets/packages/auth_buttons/images/outlined/huawei.svg": "43e6bce20aff1651bea89a5ba1d74cef",
"assets/packages/auth_buttons/images/outlined/microsoft.svg": "9c395ca56ab2544abb46c60a4acaf08d",
"assets/packages/auth_buttons/images/outlined/twitter.svg": "e09792ccb093063a1d0a84d619cd6830",
"assets/packages/auth_buttons/images/secondary/apple.svg": "e7ae0b5fd7b2a11ec4629a884641c383",
"assets/packages/auth_buttons/images/secondary/email.svg": "15397430afa56e895000113fd8aabe6a",
"assets/packages/auth_buttons/images/secondary/facebook.svg": "2c40fb4ce64eab0b32b6ab4f253566e7",
"assets/packages/auth_buttons/images/secondary/github.svg": "e2b548a359b2df7c7fe2e18d6ec15b2a",
"assets/packages/auth_buttons/images/secondary/google.svg": "d198f5fd4ff5986d8af9cf8eb9027713",
"assets/packages/auth_buttons/images/secondary/huawei.svg": "c88269d9f902df301d4b6c49b5a5e9d8",
"assets/packages/auth_buttons/images/secondary/microsoft.svg": "f3cab8f90deddd345b878b74e860352e",
"assets/packages/auth_buttons/images/secondary/twitter.svg": "4f9c57fcb40ec7aa0406071c4dec6eff",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "f0e440f6446dbd1d70f2b4cf241fbfc2",
"/": "f0e440f6446dbd1d70f2b4cf241fbfc2",
"main.dart.js": "a8b4a89b718d8bf8018f8f96ff4f5e69",
"manifest.json": "c1144d195bf97a59feddcec20d90b529",
"version.json": "9d5d81e39d4f4db82b6aec2cace75378"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
