let enabled = false;
let intervalId;
let lastClickAt = 0;

function isTempChatActive() {
  return !!document.querySelector("chat-window.is-temporary-chat");
}

function ensureTempChat() {
  if (!enabled || isTempChatActive()) return;
  if (!/^\/app\/?$/.test(location.pathname)) return;

  const button = document.querySelector('button[aria-label="Temporary chat"]');
  if (!button || button.disabled || button.getClientRects().length === 0)
    return;
  if (Date.now() - lastClickAt < 1000) return;

  lastClickAt = Date.now();
  button.click();
}

function setEnabled(value) {
  enabled = !!value;
  clearInterval(intervalId);
  intervalId = undefined;
  if (!enabled) return;

  lastClickAt = 0;
  ensureTempChat();
  intervalId = setInterval(ensureTempChat, 500);
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.enabled) {
    setEnabled(changes.enabled.newValue);
  }
});

chrome.storage.local.get("enabled", (result) => setEnabled(result.enabled));
