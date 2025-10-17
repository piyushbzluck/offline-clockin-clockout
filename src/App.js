import "./App.css";
import React, { useEffect, useState } from "react";
import clockInManager from "./clockInManager";

function App() {
  const [status, setStatus] = useState("init");
  useEffect(() => {
    async function init() {
      try {
        await clockInManager.fetchBootstrap();
        setStatus("ready");
      } catch (e) {
        setStatus("no-bootstrap");
      }
    }
    init();
  }, []);

  async function handleClockIn() {
    try {
      const ev = await clockInManager.clockIn(1);
      setStatus("saved");
      console.log("Saved event", ev);
    } catch (e) {
      alert(e.message);
    }
  }
  async function handleSync() {
    await clockInManager.syncEvents();
    setStatus("synced");
  }

  return (
    <div className="container">
      <h1>ClockIn Demo</h1>
      <p>
        Status: {status} - Online: {navigator.onLine ? "yes" : "no"}
      </p>
      <button onClick={handleClockIn}>Clock In</button>
      <button onClick={handleSync}>Sync</button>
      <p>Open console to see saved events.</p>
    </div>
  );
}

export default App;
