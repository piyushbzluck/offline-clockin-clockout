export default function swDev() {
  if ("serviceWorker" in navigator) {
    const registerServiceWorker = async () => {
      const swURL = `${process.env.PUBLIC_URL}/sw.js`;

      try {
        const registration = await navigator.serviceWorker.register(swURL);

        if (registration.waiting) {
          showUpdatePrompt(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener("statechange", () => {
              if (
                installingWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                showUpdatePrompt(installingWorker);
              }
            });
          }
        });

        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.location.reload();
        });
      } catch (error) {}
    };

    registerServiceWorker();
  }
}

function showUpdatePrompt(worker) {
  const userConfirmed = window.alert(
    "A new version of the app is available. Please refresh now to update!"
  );

  if (userConfirmed) {
    worker.postMessage({ type: "SKIP_WAITING" });
  }
}
