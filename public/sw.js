let CACHE_NAME = `etms-app-v517`;
const urlsToCache = [
  "/",
  "/styles.css",
  "/script.js",
  "/favicon.png",
  "/logo192.png",
  "/cydc.png",
  "/cdci.png",
  "/ajanta.png",
  "/cydcS.png",
  "/manifest.json",
  "/static/js/bundle.js",
  "/static/js/0.chunk.js",
  "/static/js/main.chunk.js",
  "/static/media/cdci.c3086dbede58bfa92bbc.png",
  "/static/media/cydc.7e4e73c4c142a1178e47.png",
  "/static/media/cydcS.7e3975fb1af322170c0e.png",
  "/static/media/ajanta.40e66f72b4ef8567ac7b.png",
  "/static/media/cdciHeaderLogo.93f4b1b15bdb8891a65b.png",
  "/static/media/timeInOutIcon.1a8db04c3733ac2d575d.png",
  "/static/media/logoutIcon.2324100cc6e0d651d0e1.png",
  "/static/media/birthday.4d7b78ef22d1c07ae3c7.png",
  "/static/media/doctorIcon.ac48ef50340db327e97f.png",
  "/static/media/pdfIcon.6279a47b4effd0a7eae7.png",
  "/static/media/doctorIcons.ea189832c4ec60198288.png",
  "/static/media/DataNotFound.8177f6ba9a772afc77be531824c30336.svg",
  "/static/media/DataNotFound.5be6ec9629b39a837ea2b4d1834eb792.svg",
  "/static/media/BottomFillArrow.4a6e1a3c09b92499a627.svg",
  "/static/media/pdfImg.485efc5bd8c38ea462dd.png",
  "/static/media/slashIcon.935aa6d88d48732281e1.svg",
  "/static/media/DataNotFound.498f1304a210cbdb18c6.png",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js",
  "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
  "/login",
  "/check-browser-compatibility",
  "/dashboard",
  "/reports",
  "/sync",
  "/timeInOut",
  "/notifications",
  "/md/mdList",
  "/md/md-birthday",
  "/md/all-mdList",
  "/md/edit-call-mdList",
  "/md/missed-call-mdList",
  "/md/md-info",
  "/md/update-md-info",
  "/md/md-profiling",
  "/view-call-summary",
  "/callActivities",
  "/quickSign",
  "/group-call",
  "/promo-meterials",
  "/promo-meterials/receive",
  "/vmc",
  "/vmc/request-history",
  "/tactical",
  "/itinerary",
  "/itinerary/update-itinerary",
  "/itinerary/itinerary-per-day",
  "/itinerary/monthly-itinerary",
  "/itinerary/update-itinerary-history",
  "/itinerary/next-month-itinerary",
  "/group-call/current-month",
  "/group-call/next-month",
  "/group-call/report",
  "/user-survey",
  "/user-survey-sign",
];
const excludedUrls = [
  "/index.html",
  "/version.json",
  "/api/v1/login",
  "/api/v1/user/logout",
  "/api/v1/dashboard",
  "/api/v1/md/active-cycle",
  "/api/v1/off-line/media",
  "/api/v1/off-line/md-list",
  "/api/v1/off-line/reports",
  "/api/v1/off-line/quick-sign",
  "/api/v1/off-line/all-call-off-line",
  "/api/v1/off-line/changes-birthday",
  "/api/v1/off-line/md-master-list",
  "/api/v1/off-line/edit-call",
  "/api/v1/off-line/cumulative-call",
  "/api/v1/off-line/get_cumulative-call",
  "/api/v1/off-line/add-notes",
  "/api/v1/md/list",
  "/api/v1/md/add-md-reliever",
  "/api/v1/media",
  "/api/v1/quick-sign/add-md",
  "/api/v1/quick-sign/quickSign",
  "/api/v1/quick-sign/list-quick-sign",
  "/api/v1/quick-sign/count-quick-sign",
  "/api/v1/quick-sign/md-list-quick-sign",
  "/api/v1/quick-sign/drop-down-md-option",
  "/api/v1/quick-sign/universe-md-list",
  "/api/v1/quick-sign/add-quick-sign",
  "/api/v1/quick-sign/delete-quick-sign",
  "/api/v1/quick-sign/quick-sign-update",
  "/api/v1/promomat/reject-reasons",
  "/api/v1/promomat/promomat-type",
  "/api/v1/promomat/adjust-reasons",
  "/api/v1/promomat/return-material",
  "/api/v1/promomat/receive-materials",
  "/api/v1/promomat/material-issued-list",
  "/api/v1/promomat/material-balance-list",
  "/api/v1/out-of-field/list-oof-data",
  "/api/v1/out-of-field/get-model-data",
  "/api/v1/out-of-field/add-oof-data",
  "/api/v1/out-of-field/add-request-oof",
  "/api/v1/out-of-field/get-md-list-by-oof",
  "/api/v1/get-directions",
  "/api/v1/md/frequency",
  "/api/v1/itinerary/holidays",
  "/api/v1/itinerary/md-list",
  "/api/v1/itinerary/tm-list",
  "/api/v1/itinerary/change-request",
  "/api/v1/itinerary/get-change-request",
  "/api/v1/itinerary/edit-change-request",
  "/api/v1/itinerary/delete-change-request",
  "/api/v1/itinerary/get-change-request-list",
  "/api/v1/itinerary/disapproval-reason",
  "/api/v1/itinerary/disapproval-request",
  "/api/v1/itinerary/approval-request",
  "/api/v1/itinerary/summary/data",
  "/api/v1/itinerary/summary/report-data",
  "/api/v1/itinerary/summary/call-plan",
  "/api/v1/itinerary/holidays-frequency",
  "/api/v1/dashboard/call-summary-md-class",
  "/api/v1/dashboard/md-coverage-today",
  "/api/v1/dashboard/samples-issuance",
  "/api/v1/dashboard/promo-mats-issuance",
  "/api/v1/dashboard/call-concentration",
  "/api/v1/dashboard/days-field",
  "/api/v1/dashboard/md-excuse",
  "/api/v1/dashboard/promo-mats-inventory",
  "/api/v1/dashboard/incidental-calls",
  "/api/v1/dashboard/daily-call-rate",
  "/api/v1/dashboard/daily-md-rate",
  "/api/v1/dashboard/monthly-call-rate",
  "/api/v1/dashboard/monthly-md-rate",
  "/api/v1/notification/count",
  "/api/v1/notification/list",
  "/api/v1/notification/read-notification",
  "/api/v1/notification/list-data",
  "/api/v1/notification/birth-day-data",
  "/api/v1/out-of-field/get-request-list",
  "/api/v1/out-of-field/disapproval-request",
  "/api/v1/out-of-field/approval-request",
  "/api/v1/tactical/product",
  "/api/v1/tactical/add-tactical",
  "/api/v1/tactical/activity-list",
  "/api/v1/time/get-time",
  "/api/v1/time/add-time",
  "/api/v1/time/delete-time",
  "/api/v1/md/get-md-request",
  "/api/v1/md/add-md-request",
  "/api/v1/call-recording/get-md-insert-data",
  "/api/v1/refresh-token",
  "/api/v1/user/get-access-token",
  "/api/v1/group-call/activities",
  "/api/v1/group-call/get-call",
  "/api/v1/group-call/add-call",
  "/api/v1/group-call/attend-call",
  "/api/v1/group-call/report",
  "/api/v1/md/edit-md",
  "/api/v1/md/profile-form-data",
  "/api/v1/survey/question",
  "/api/v1/survey/get",
  "/api/v1/survey/add",
  "/api/v1/traces",
  "/api/bootstrap-time",
  "/api/sync-clockins",
];

const safeOperation = async (operation, fallback = null) => {
  try {
    return await operation();
  } catch (error) {
    console.warn("Service worker operation failed:", error);
    return fallback;
  }
};

const reCacheMissingAssets = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedRequests = await cache.keys();
    const cachedUrls = cachedRequests.map((request) => request.url);
    const res = await fetch("/asset-manifest.json", { cache: "reload" });
    const manifest = await res.json();
    const allURLsToCache = [
      ...urlsToCache,
      ...Object.values(manifest.files).filter(
        (url) =>
          url &&
          url.startsWith("/static/") &&
          !url.includes(".js.map") &&
          !urlsToCache.includes(url)
      ),
    ];
    const missingUrls = allURLsToCache.filter((url) => {
      const absoluteUrl = new URL(url, self.location.origin).href;
      return !cachedUrls.includes(absoluteUrl);
    });
    if (missingUrls.length > 0) {
      await Promise.all(
        missingUrls.map(async (url) => {
          await safeOperation(async () => {
            const response = await fetch(url, { cache: "reload" });
            if (response.ok) await cache.put(url, response.clone());
          });
        })
      );
    }
  } catch (error) {
    console.warn("Re-caching failed:", error);
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    safeOperation(async () => {
      const cache = await caches.open(CACHE_NAME);
      await safeOperation(async () => {
        const oldCaches = await caches.keys();
        await Promise.all(
          oldCaches
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      });
      const res = await fetch("/asset-manifest.json", { cache: "reload" });
      const manifest = await res.json();
      const urlsToCache2 = [
        ...urlsToCache,
        ...Object.values(manifest.files).filter(
          (url) =>
            url &&
            url.startsWith("/static/") &&
            !url.includes(".js.map") &&
            !urlsToCache.includes(url)
        ),
      ];
      await Promise.all(
        urlsToCache2.map(async (url) => {
          safeOperation(async () => {
            const response = await fetch(url, { cache: "reload" });
            if (response.ok) await cache.put(url, response.clone());
          });
        })
      );
      return self.skipWaiting();
    }, true)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    safeOperation(async () => {
      await safeOperation(async () => {
        const oldCaches = await caches.keys();
        await Promise.all(
          oldCaches
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      });
      await safeOperation(() => self.clients.claim());
      return true;
    }, true)
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.href.includes("mediaDevices")) {
    event.respondWith(fetch(url));
    return;
  }
  if (
    !url.protocol.startsWith("http") ||
    url.href.includes("bugsnag.com") ||
    url.href.includes("ingest.us.sentry.io") ||
    url.href.includes("/images/720/") ||
    url.href.includes("/product-images/") ||
    excludedUrls.some((path) => url.href.includes(path))
  ) {
    return;
  }
  event.respondWith(
    safeOperation(async () => {
      try {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          event.waitUntil(
            safeOperation(async () => {
              const networkResponse = await fetch(url, { cache: "reload" });
              if (networkResponse.ok) {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(event.request, networkResponse.clone());
              }
            })
          );
          return cachedResponse;
        }

        const networkResponse = await fetch(url, { cache: "reload" });
        if (networkResponse && networkResponse.ok) {
          await safeOperation(async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        }
        const fallbackCachedResponse = await caches.match(event.request);
        if (fallbackCachedResponse) return fallbackCachedResponse;
        return offlineResponse;
      } catch (error) {
        const fallbackCachedResponse = await caches.match(event.request);
        if (fallbackCachedResponse) return fallbackCachedResponse;
        try {
          const networkResponse = await fetch(url, { cache: "reload" });
          if (networkResponse && networkResponse.ok) {
            await safeOperation(async () => {
              const cache = await caches.open(CACHE_NAME);
              await cache.put(event.request, networkResponse.clone());
            });
            return networkResponse;
          }
          return offlineResponse;
        } catch (networkError) {
          console.warn("Network fallback failed:", networkError);
          return offlineResponse;
        }
      }
    }, offlineResponse)
  );
});

const offlineResponse = new Response(
  `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Offline - TMS App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          color: #333;
        }
        .tc_offline_container {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 90%;
          width: 400px;
        }
        .tc_offline_container h1 {
          color: #115b48;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .tc_offline_container p {
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .tc_offline_container .reload-button {
          background-color: #115b48;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
          font-family: inherit;
        }
        .tc_offline_container .reload-button:hover {
          background-color: #0d4a3b;
        }
        .tc_offline_container .reload-button:active {
          transform: scale(0.98);
        }
        @media (max-width: 480px) {
          .tc_offline_container {
            width: 85%;
            padding: 1.5rem;
          }
          .tc_offline_container h1 {
            font-size: 1.25rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="tc_offline_container">
        <h1>Unable to Load the App</h1>
        <p>Sorry, we are having trouble loading the app. This could be due to a network issue or a problem with our servers. Please check your internet connection and try again.</p>
        <button class="reload-button" onclick="location.reload()">Try Again</button>
      </div>
    </body>
  </html>
  `,
  {
    headers: { "Content-Type": "text/html" },
  }
);

self.addEventListener("message", async (event) => {
  await safeOperation(async () => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      await self.skipWaiting();
    } else if (event.data && event.data.type === "CHECK_VERSION") {
      try {
        const response = await fetch(`/version.json`, { cache: "reload" });
        const data = await response.json();
        const currentVersion = CACHE_NAME.split("-").pop();
        if (data?.version !== currentVersion) {
          event.ports[0].postMessage({
            type: "VERSION_UPDATE",
            newVersion: data.version,
          });
        }
      } catch (error) {
        console.warn("Version check failed:", error);
      }
    } else if (event.data && event.data.type === "RE_CACHE_ASSETS") {
      await reCacheMissingAssets();
      event.ports[0].postMessage({
        type: "RE_CACHE_COMPLETE",
        message: "Re-caching of missing assets completed.",
      });
    }
  });
});

self.addEventListener("error", (event) => {
  console.warn("Service worker error:", event.error);
  event.preventDefault();
});

self.addEventListener("unhandledrejection", (event) => {
  console.warn("Service worker unhandled rejection:", event.reason);
  event.preventDefault();
});
