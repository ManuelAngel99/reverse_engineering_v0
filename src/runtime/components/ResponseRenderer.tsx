/**
 * Response Rendering Components
 * Source: module_448763 (Lines 638-707)
 *
 * Renders Response objects based on content-type with appropriate formatting.
 * Handles text, JSON, and image responses with Suspense boundaries.
 */

import { Suspense, use } from "react";

// ============================================================================
// Types
// ============================================================================

/**
 * Response renderer props
 */
export interface ResponseRendererProps {
  /** Response object to render */
  response: Response | React.ReactElement;
}

/**
 * Text renderer props
 */
interface TextRendererProps {
  /** Promise data */
  data: Promise<string>;
  /** Optional formatter function */
  formatter?: (text: string) => string;
}

/**
 * Image renderer props
 */
interface ImageRendererProps {
  /** Promise data */
  data: Promise<ArrayBuffer>;
  /** MIME type for the image */
  mime: string;
}

// ============================================================================
// Response Cache
// ============================================================================

/**
 * WeakMap cache for response data
 * Prevents duplicate fetches of the same response
 */
const responseCache = new WeakMap<
  Response,
  Promise<string> | Promise<ArrayBuffer>
>();

// ============================================================================
// Helper Components
// ============================================================================

/**
 * Text Renderer
 * Renders text content with optional formatting
 *
 * @param props - Text renderer props
 * @returns Rendered text
 */
function TextRenderer({ data, formatter }: TextRendererProps) {
  const text = use(data);
  return <>{formatter ? formatter(text) : text}</>;
}

/**
 * Image Renderer
 * Renders image from ArrayBuffer as base64 data URL
 *
 * @param props - Image renderer props
 * @returns Rendered image element
 */
function ImageRenderer({ data, mime }: ImageRendererProps) {
  const buffer = use(data);

  // Convert ArrayBuffer to base64
  const base64 = btoa(
    new Uint8Array(buffer).reduce(
      (str, byte) => str + String.fromCharCode(byte),
      ""
    )
  );

  return <img src={`data:${mime};base64,${base64}`} alt="Image preview" />;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Response Renderer
 * Renders Response objects based on their content-type
 *
 * Supports:
 * - text/* → Plain text or formatted text
 * - application/json → Pretty-printed JSON
 * - image/* → Base64-encoded image
 * - application/svg+xml → SVG image
 *
 * @param props - Response renderer props
 * @returns Rendered response content
 */
export function ResponseRenderer({ response }: ResponseRendererProps) {
  let content: React.ReactNode;

  // If already a React element, return as-is
  if (!(response instanceof Response)) {
    if ("$$typeof" in response) {
      return response;
    }
    throw new Error(
      `Invalid response from server: Expected a Response object but got ${typeof response}`
    );
  }

  const contentType = response.headers.get("content-type");

  // Handle text responses
  if (contentType?.startsWith("text/")) {
    const textData = responseCache.get(response) || response.text();
    responseCache.set(response, textData as Promise<string>);

    content = (
      <Suspense fallback={<div>Loading text...</div>}>
        <TextRenderer data={textData as Promise<string>} />
      </Suspense>
    );
  }
  // Handle JSON responses
  else if (contentType?.startsWith("application/json")) {
    const jsonData = responseCache.get(response) || response.text();
    responseCache.set(response, jsonData as Promise<string>);

    content = (
      <Suspense fallback={<div>Loading JSON...</div>}>
        <TextRenderer
          data={jsonData as Promise<string>}
          formatter={(text) => {
            try {
              return JSON.stringify(JSON.parse(text), null, 2);
            } catch {
              return text;
            }
          }}
        />
      </Suspense>
    );
  }
  // Handle image responses
  else if (
    contentType?.startsWith("image/") ||
    contentType === "application/svg+xml" ||
    contentType === "application/svg"
  ) {
    const imageData =
      responseCache.get(response) ||
      response
        .clone()
        .arrayBuffer()
        .catch(() => new ArrayBuffer(0));
    responseCache.set(response, imageData as Promise<ArrayBuffer>);

    content = (
      <Suspense fallback={<div>Loading image...</div>}>
        <ImageRenderer
          data={imageData as Promise<ArrayBuffer>}
          mime={contentType || "image/png"}
        />
      </Suspense>
    );
  }
  // Unsupported content type
  else {
    content = "No preview available for this content type.";
  }

  return (
    <pre className="font-mono whitespace-pre-wrap text-sm p-1">{content}</pre>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default ResponseRenderer;

// Export helper components for testing
export { TextRenderer, ImageRenderer };
