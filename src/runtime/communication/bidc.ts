import { createChannel } from "bidc";

export type Channel = ReturnType<typeof createChannel>;

let channelInstance: Channel | null = null;

/**
 * Initialize the BIDC channel.
 * If target is not provided, it defaults to window.parent in iframe context.
 */
export function initChannel(
  target?: Window | Worker,
  namespace?: string
): Channel {
  if (channelInstance) {
    console.warn("BIDC channel already initialized");
    return channelInstance;
  }

  // In iframe, default to parent window if no target specified
  const targetContext =
    target || (typeof window !== "undefined" ? window.parent : undefined);

  if (!targetContext && typeof Worker === "undefined") {
    throw new Error("No target context available for BIDC channel");
  }

  if (targetContext) {
    if (namespace) {
      channelInstance = createChannel(targetContext, namespace);
    } else {
      channelInstance = createChannel(targetContext);
    }
  } else {
    // If no target context, we assume we're in a child context connecting to parent
    // In this case, the first argument can be the namespace
    channelInstance = createChannel(namespace as any);
  }
  return channelInstance;
}

export function createNamespacedChannel(
  namespace: string,
  target?: Window | Worker
): Channel {
  const targetContext =
    target || (typeof window !== "undefined" ? window.parent : undefined);

  if (targetContext) {
    return createChannel(targetContext, namespace);
  }

  return createChannel(namespace as any);
}

export function getChannel(): Channel {
  if (!channelInstance) {
    // Auto-init if not initialized, assuming we are in iframe talking to parent
    if (typeof window !== "undefined" && window.parent !== window) {
      return initChannel(window.parent);
    }
    throw new Error("BIDC channel not initialized. Call initChannel first.");
  }
  return channelInstance;
}

export const send = async (...args: Parameters<Channel["send"]>) => {
  return getChannel().send(...args);
};

export const receive = (...args: Parameters<Channel["receive"]>) => {
  return getChannel().receive(...args);
};
