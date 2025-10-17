const BOOTSTRAP_KEY = "bootstrap";
const QUEUE_KEY = "eventQueue";
const LAST_ACTIVE_KEY = "lastActiveTime";

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

async function addEvent(userId, type) {
  const bs = JSON.parse(localStorage.getItem(BOOTSTRAP_KEY));
  if (!bs) throw new Error("No bootstrap token. Please go online once.");

  if (!checkOfflineIntegrity() && !navigator.onLine) {
    throw new Error(
      "System time changed or suspicious gap detected. Please reconnect to verify."
    );
  }

  const lastActive = parseInt(
    localStorage.getItem(LAST_ACTIVE_KEY) || Date.now(),
    10
  );
  const now = Date.now();
  const elapsedOffline = now - lastActive; // fallback for offline reopen

  // Use monotonic if app not reloaded; else fallback
  let elapsedMs = performance.now() - bs.basePerfNow;
  if (elapsedMs < 0 || elapsedMs > 24 * 60 * 60 * 1000) {
    elapsedMs = elapsedOffline; // fallback
  }

  const estimatedUtc = new Date(bs.serverTime + elapsedMs).toISOString();
  const timezoneOffset = new Date().getTimezoneOffset();
  const deviceTime = new Date().toISOString();

  // tamperFlag: only true if system time jumped backward or unrealistically large gap
  const delta = Math.abs(now - bs.baseClientTime - elapsedMs);
  const tamperFlag = delta > 60_000 && delta < 24 * 60 * 60 * 1000;

  console.log("delta", delta);
  console.log("tamperFlag", tamperFlag);

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

  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  queue.push(event);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  localStorage.setItem(LAST_ACTIVE_KEY, now);

  return event;
}

async function clockIn(userId) {
  return addEvent(userId, "clock-in");
}
async function clockOut(userId) {
  return addEvent(userId, "clock-out");
}

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

window.addEventListener("online", () => {
  syncEvents();
});

export default { fetchBootstrap, clockIn, clockOut, syncEvents };
