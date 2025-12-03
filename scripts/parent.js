// ============================================================================
// v0 Parent Debug Script
// ============================================================================
// Copy and paste this entire script into the Chrome DevTools Console 
// while inspecting the PARENT window (v0.dev or localhost:3000).
// ============================================================================

(function() {
  const TAG = "[v0-Parent]";
  const STYLE_RECEIVED = "background: #00d8ff; color: #000; padding: 2px 4px; border-radius: 2px;";
  const STYLE_SENT = "background: #ffd700; color: #000; padding: 2px 4px; border-radius: 2px;";
  
  console.clear();
  
  if (window.__v0_debug_listening) {
    console.log(`%c${TAG} Already listening. Refresh page to reset.`, "color: orange");
    return;
  }
  window.__v0_debug_listening = true;

  console.log(`%c${TAG} Debugger Started`, "background: #222; color: #bada55; font-size: 14px; padding: 4px;");

  // 1. Intercept Incoming Messages (Iframe -> Parent)
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (data && typeof data === "object" && data.__v0_remote__) {
      console.groupCollapsed(`%cReceived%c ${data.type}`, STYLE_RECEIVED, "font-weight: bold; color: #00d8ff");
      console.log("Payload:", data);
      console.log("Origin:", event.origin);
      console.log("Source:", event.source);
      console.groupEnd();
    }
  });

  // 2. Intercept Outgoing Messages (Parent -> Iframe)
  // Note: We can only easily intercept if we find the iframe and monkey-patch its contentWindow.postMessage
  // This works best if we identify the iframe element correctly.
  
  const findAndPatchIframe = () => {
    const frames = document.querySelectorAll('iframe');
    let patchedCount = 0;

    frames.forEach((iframe, index) => {
      try {
        // We can only patch if same-origin or if we patch the HTMLIFrameElement prototype (which is messy)
        // Instead, let's try to patch the specific contentWindow reference if accessible.
        // If cross-origin, accessing contentWindow properties throws. 
        // But postMessage is a method on the Window interface.
        
        // A safer way to "log" outgoing is to know that the parent script usually uses a specific function 
        // to send. Since we can't easily hook into the bundled closure, we rely on the user 
        // seeing the "Received" log in the Iframe console for the other side of the conversation.
        
        // HOWEVER, we can try to wrap the iframe's postMessage if we can access it.
        // Usually restricted for cross-origin.
        
        if (iframe.contentWindow) {
             // Just a visual marker that we found iframes
             // console.log(`${TAG} Found iframe [${index}]`);
        }
      } catch (e) {
        // Ignore cross-origin access errors
      }
    });
  };

  // Run periodically to catch new iframes
  findAndPatchIframe();
  
  console.log(`${TAG} Waiting for messages...`);
  console.log(`${TAG} Note: To see outgoing messages from Parent, look at the Iframe's console (Incoming).`);
})();

