import { channelManager } from "../communication/channel-manager";

export function interceptConsole() {
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
  };

  function sendToParent(level: string, args: any[]) {
    try {
      // We send async without awaiting
      channelManager.console.send({ level, args });
    } catch (e) {
      // If serialization fails, we might want to log that it failed, but avoid infinite recursion
      originalConsole.warn("Failed to send console log to parent:", e);
    }
  }

  console.log = (...args: any[]) => {
    originalConsole.log(...args);
    sendToParent("log", args);
  };

  console.warn = (...args: any[]) => {
    originalConsole.warn(...args);
    sendToParent("warn", args);
  };

  console.error = (...args: any[]) => {
    originalConsole.error(...args);
    sendToParent("error", args);
  };

  console.info = (...args: any[]) => {
    originalConsole.info(...args);
    sendToParent("info", args);
  };

  console.debug = (...args: any[]) => {
    originalConsole.debug(...args);
    sendToParent("debug", args);
  };

  return () => {
    // Restore
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.info = originalConsole.info;
    console.debug = originalConsole.debug;
  };
}
