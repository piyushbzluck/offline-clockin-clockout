import "./App.css";
import React, { useEffect, useState } from "react";
import clockInManager from "./clockInManager";

function App() {
  const [status, setStatus] = useState("initializing...");
  const [eventsCount, setEventsCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Bootstrap on load
  useEffect(() => {
    async function init() {
      try {
        await clockInManager.fetchBootstrap();
        setStatus("✅ Ready");
      } catch (e) {
        console.warn("Bootstrap failed:", e.message);
        setStatus("⚠️ No bootstrap (offline first mode)");
      }
      updateEventCount();
    }
    init();

    // Detect online/offline changes
    const handleOnline = () => {
      setIsOnline(true);
      setStatus("🌐 Back online — syncing...");
      clockInManager
        .syncEvents()
        .then(() => setStatus("✅ Synced after reconnect"))
        .catch(() => setStatus("⚠️ Sync failed"));
    };

    const handleOffline = () => {
      setIsOnline(false);
      setStatus("📴 Offline mode");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Helper to count queued events
  const updateEventCount = () => {
    const queue = JSON.parse(localStorage.getItem("eventQueue") || "[]");
    setEventsCount(queue.length);
  };

  // Handle clock in
  async function handleClockIn() {
    try {
      const ev = await clockInManager.clockIn(1);
      setStatus("🕒 Clock-in saved locally");
      updateEventCount();
      console.log("Saved event:", ev);
    } catch (e) {
      console.error("Clock-in error:", e);
      setStatus("❌ " + e.message);
    }
  }

  // Handle clock out
  async function handleClockOut() {
    try {
      const ev = await clockInManager.clockOut(1);
      setStatus("🔚 Clock-out saved locally");
      updateEventCount();
      console.log("Saved event:", ev);
    } catch (e) {
      console.error("Clock-out error:", e);
      setStatus("❌ " + e.message);
    }
  }

  // Manual sync button
  async function handleSync() {
    try {
      setStatus("🔄 Syncing...");
      const result = await clockInManager.syncEvents();
      if (result.success) {
        setStatus("✅ Synced successfully");
      } else {
        setStatus("⚠️ " + (result.message || "Sync failed"));
      }
      updateEventCount();
    } catch (e) {
      setStatus("❌ " + e.message);
    }
  }

  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <h1>🕰️ Clock-In Demo (Offline Safe)</h1>
      <p>
        <b>Status:</b> {status}
        <br />
        <b>Online:</b> {isOnline ? "✅ Yes" : "📴 No"}
        <br />
        <b>Queued Events:</b> {eventsCount}
      </p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleClockIn}>Clock In</button>{" "}
        <button onClick={handleClockOut}>Clock Out</button>{" "}
        <button onClick={handleSync}>Manual Sync</button>
      </div>

      <p style={{ marginTop: "20px", color: "#666" }}>
        Open browser console to see saved events and flags.
      </p>
    </div>
  );
}

export default App;
