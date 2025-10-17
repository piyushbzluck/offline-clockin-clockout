import React, { useState, useEffect, useRef } from "react";

const ServiceWWrapper = () => {
  const intervalRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registerServiceWorker = async () => {
        const swURL = `${process.env.PUBLIC_URL}/sw.js`;
        try {
          const reg = await navigator.serviceWorker.register(swURL);
          setRegistration(reg);

          if (localStorage.getItem("app_update_pending") === "true") {
            localStorage.removeItem("app_update_pending");
            return;
          }

          if (reg.waiting) {
            setShowPopup(true);
          }

          reg.addEventListener("updatefound", () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.addEventListener("statechange", () => {
                if (
                  installingWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  setShowPopup(true);
                }
              });
            }
          });

          const controller = navigator.serviceWorker.controller;
          if (controller) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            checkVersion(controller);
            intervalRef.current = setInterval(() => {
              if (navigator.serviceWorker.controller) {
                checkVersion(navigator.serviceWorker.controller);
              }
            }, 60000);
            return () => {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
            };
          }
        } catch (error) {}
      };
      registerServiceWorker();
      navigator.serviceWorker.ready.then((registration) => {
        const channel = new MessageChannel();
        registration.active.postMessage({ type: "RE_CACHE_ASSETS" }, [
          channel.port2,
        ]);
      });
    }
  }, []);

  const checkVersion = async (controller) => {
    if (!controller) {
      return;
    }
    try {
      const response = await fetch(`/version.json`, { cache: "reload" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data?.version) {
        localStorage.setItem("app_version", data.version);
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          if (event.data && event.data.type === "VERSION_UPDATE") {
            setShowPopup(true);
          }
        };
        controller.postMessage({ type: "CHECK_VERSION" }, [channel?.port2]);
      }
    } catch (error) {}
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("app_update_pending", "true");
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        await new Promise((resolve) => {
          const checkActivation = () => {
            if (
              registration.active &&
              registration.active !== registration.waiting
            ) {
              resolve();
            } else {
              setTimeout(checkActivation, 100);
            }
          };
          checkActivation();
        });
      }
      window.location.reload(true);
    } catch (error) {
      setIsLoading(false);
      setShowPopup(false);
    }
  };

  return <></>;
};

export default ServiceWWrapper;
