// ============================================================================
// v0 Iframe Debug Script
// ============================================================================
// Copy and paste this entire script into the Chrome DevTools Console 
// while inspecting the IFRAME window (the preview pane).
// ============================================================================

(function() {
  const TAG = "[v0-Iframe]";
  const STYLE_RECEIVED = "background: #ff00d8; color: #fff; padding: 2px 4px; border-radius: 2px;";
  const STYLE_SENT = "background: #ffd700; color: #000; padding: 2px 4px; border-radius: 2px;";
  
  console.clear();
  
  if (window.__v0_debug_listening) {
    console.log(`%c${TAG} Already listening. Refresh page to reset.`, "color: orange");
    return;
  }
  window.__v0_debug_listening = true;

  console.log(`%c${TAG} Debugger Started`, "background: #222; color: #bada55; font-size: 14px; padding: 4px;");

  // 1. Intercept Incoming Messages (Parent -> Iframe)
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (data && typeof data === "object" && data.__v0_remote__) {
      console.groupCollapsed(`%cReceived%c ${data.type}`, STYLE_RECEIVED, "font-weight: bold; color: #ff00d8");
      console.log("Payload:", data);
      console.log("Origin:", event.origin);
      console.groupEnd();
    }
  });

  // 2. Intercept Outgoing Messages (Iframe -> Parent)
  // This effectively logs calls to window.parent.postMessage
  try {
    // We can't overwrite window.parent.postMessage directly if it's cross-origin 
    // (property assignment is ignored or throws).
    // But we can try to wrap the call if the app uses a global helper, which it doesn't (it uses a module).
    
    // Attempting to patch window.parent directly usually fails.
    // However, we can help the user by logging that we are listening.
    
  } catch (e) {
    console.warn(`${TAG} Could not patch outgoing messages (likely cross-origin).`);
  }

  console.log(`${TAG} Waiting for messages...`);
  console.log(`${TAG} Note: To see outgoing messages from Iframe, look at the Parent's console (Incoming).`);
})();

