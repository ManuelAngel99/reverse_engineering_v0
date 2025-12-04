import { channelManager } from "../communication/channel-manager";

export function initErrorReporter() {
  if (typeof window === "undefined") return;

  (window as any).addEventListener("error", (event: ErrorEvent) => {
    channelManager.error.send({
      type: "error",
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
    });
  });

  (window as any).addEventListener("unhandledrejection", (event: any) => {
    const reason = event.reason;
    let message = "Unhandled Rejection";
    let stack = "";

    if (reason instanceof Error) {
      message = reason.message;
      stack = reason.stack || "";
    } else {
      try {
        message = String(reason);
      } catch (e) {
        message = "Unhandled Rejection (non-stringifiable)";
      }
    }

    channelManager.error.send({
      type: "unhandledrejection",
      message,
      stack,
      reason: reason instanceof Error ? undefined : reason,
    });
  });
}
