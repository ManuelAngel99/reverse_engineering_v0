import { createNamespacedChannel, type Channel } from "./bidc";

export const CHANNEL_NAMESPACES = {
  CONSOLE: "v0-console",
  ERROR: "v0-error",
  RESOURCE: "v0-resource",
  SYSTEM: "v0-system",
} as const;

export class ChannelManager {
  private channels: Map<string, Channel> = new Map();
  private target?: Window | Worker;

  constructor(target?: Window | Worker) {
    this.target = target;
  }

  getChannel(namespace: string): Channel {
    if (!this.channels.has(namespace)) {
      this.channels.set(
        namespace,
        createNamespacedChannel(namespace, this.target)
      );
    }
    return this.channels.get(namespace)!;
  }

  get console() {
    return this.getChannel(CHANNEL_NAMESPACES.CONSOLE);
  }

  get error() {
    return this.getChannel(CHANNEL_NAMESPACES.ERROR);
  }

  get resource() {
    return this.getChannel(CHANNEL_NAMESPACES.RESOURCE);
  }

  get system() {
    return this.getChannel(CHANNEL_NAMESPACES.SYSTEM);
  }
}

export const channelManager = new ChannelManager();
