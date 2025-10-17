const BOOTSTRAP_KEY = "bootstrap";
const QUEUE_KEY = "eventQueue";
const LAST_ACTIVE_KEY = "lastActiveTime";

/**
 * Fetch bootstrap time from server (initial sync)
 */
async function fetchBootstrap() {
  const res = await fetch("http://192.168.1.27:4000/api/bootstrap-time");
  if (!res.ok) throw new Error("bootstrap failed");
  const data = await res.json();

  const payload = {
    ...data,
    basePerfNow: performance.now(),
    baseClientTime: Date.now(),
  };

  localStorage.setItem(BOOTSTRAP_KEY, JSON.stringify(payload));
  localStorage.setItem(LAST_ACTIVE_KEY, Date.now());
  return payload;
}

/**
 * Integrity check to ensure time wasn't manipulated or system suspended too long
 */
function checkOfflineIntegrity() {
  const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) || "0", 10);
  const now = Date.now();
  const delta = now - lastActive;

  // Allow normal offline reopen; only flag if negative or huge (> 24h)
  if (delta < 0 || delta > 24 * 60 * 60 * 1000) {
    console.warn("⚠️ Time integrity check failed. Offline events blocked.");
    return false;
  }

  localStorage.setItem(LAST_ACTIVE_KEY, now);
  return true;
}

/**
 * Detect if device time has been tampered with (offline safe)
 */
function detectTamper(bs) {
  const now = Date.now();
  const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) || "0", 10);
  const elapsedSinceLast = now - lastActive;

  // 1️⃣ Normal offline reopen within 24h = safe
  if (elapsedSinceLast >= 0 && elapsedSinceLast < 24 * 60 * 60 * 1000) {
    return false;
  }

  // 2️⃣ Negative (time backward) or huge forward jump
  if (elapsedSinceLast < 0 || elapsedSinceLast > 24 * 60 * 60 * 1000) {
    return true;
  }

  // 3️⃣ Compare monotonic vs wall time drift
  const estimatedElapsed = performance.now() - bs.basePerfNow;
  const realElapsed = now - bs.baseClientTime;
  const delta = Math.abs(estimatedElapsed - realElapsed);

  // Allow up to 5 minutes drift
  return delta > 1 * 60 * 1000;
}

/**
 * Add event (clock-in or clock-out)
 */
async function addEvent(userId, type) {
  const bs = JSON.parse(localStorage.getItem(BOOTSTRAP_KEY));
  if (!bs) throw new Error("No bootstrap token. Please go online once.");

  // Allow offline but prevent clear tampering
  if (!checkOfflineIntegrity() && !navigator.onLine) {
    throw new Error(
      "System time changed or suspicious gap detected. Please reconnect to verify."
    );
  }

  const now = Date.now();
  const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) || "0", 10);
  const elapsedOffline = now - lastActive; // for fallback after app reopen

  // elapsed since bootstrap
  let elapsedMs = performance.now() - bs.basePerfNow;
  if (elapsedMs < 0 || elapsedMs > 24 * 60 * 60 * 1000) {
    elapsedMs = elapsedOffline; // fallback after reload
  }

  const estimatedUtc = new Date(bs.serverTime + elapsedMs).toISOString();
  const timezoneOffset = new Date().getTimezoneOffset();
  const deviceTime = new Date().toISOString();

  // improved tamper detection
  const tamperFlag = detectTamper(bs);

  const event = {
    userId,
    type,
    deviceTime,
    estimatedUtc,
    timezoneOffset,
    elapsedMs,
    tamperFlag,
    bootstrapNonce: bs.nonce,
  };

  // queue event locally
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  queue.push(event);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  localStorage.setItem(LAST_ACTIVE_KEY, now);

  console.log("Saved event:", event);
  return event;
}

/**
 * Clock in/out methods
 */
async function clockIn(userId) {
  return addEvent(userId, "clock-in");
}

async function clockOut(userId) {
  return addEvent(userId, "clock-out");
}

/**
 * Sync stored events to server
 */
async function syncEvents() {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  if (!queue.length) return { success: true, message: "nothing to sync" };

  const res = await fetch("http://192.168.1.27:4000/api/sync-clockins", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(queue),
  });

  const data = await res.json();
  if (data.success) {
    localStorage.removeItem(QUEUE_KEY);
  }
  return data;
}

/**
 * Auto-sync when online
 */
window.addEventListener("online", () => {
  syncEvents();
});

export default { fetchBootstrap, clockIn, clockOut, syncEvents };
