/**
 * Element Overlay Component
 * Source: 3a384aa7a60f1de8.js (Module 13072, lines 570-773)
 *
 * Renders an overlay on top of inspected elements with DevTools controls.
 */

import React from "react";
import { DismissableLayerBranch } from "@radix-ui/react-dismissable-layer";
import { cn } from "@/ui/lib/utils";
import type {
  ElementOverlayState,
  JSXSourceInfo,
  DevToolsContextMenuRef,
} from "@/shared/types/runtime";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/ui/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/ui/components/ui/context-menu";
import { DiamondIcon } from "lucide-react";
import { GeistMono } from "@/shared/fonts";
import { DevToolsContextMenuItem } from "./contextMenuItems";
import { getElementBounds } from "./elementUtils";

interface ElementOverlayProps extends ElementOverlayState {
  locked: boolean;
  hoverStyle?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  contextMenuRef: React.RefObject<DevToolsContextMenuRef>;
  fileMapping: Record<string, string>;
  contentEditingElement?: ElementOverlayState | null;
  hide?: boolean;
  inlineEdit?: any;
  allowRefinement?: boolean;
}

/**
 * Renders an overlay highlighting an element with DevTools controls
 */
export function ElementOverlay(props: ElementOverlayProps) {
  const { hoverStyle = false } = props;
  const borderWidth = hoverStyle ? 2 : 1;

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // Calculate overlay position, clamped to viewport
  let top = Math.min(props.bounds.top - borderWidth, windowHeight - 1);
  let bottom = Math.max(props.bounds.bottom + borderWidth, 1);
  let left = Math.min(props.bounds.left - borderWidth, windowWidth - 1);
  let right = Math.max(props.bounds.right + borderWidth, 1);

  let width = Math.max(
    0,
    Math.max(props.bounds.width, right - left - 2 * borderWidth)
  );
  let height = Math.max(
    0,
    Math.max(props.bounds.height, bottom - top - 2 * borderWidth)
  );

  // Check if element fills entire viewport
  let isFullScreen = false;
  if (top <= 0 && left <= 0 && bottom >= windowHeight && right >= windowWidth) {
    top = 0;
    left = 0;
    width = windowWidth - 2;
    height = windowHeight - 2;
    isFullScreen = true;
  }

  // Check if padding should be displayed
  const hasPadding = props.padding.some((p) => p > 0);

  // Build overlay element
  let overlay = (
    <DismissableLayerBranch
      className="fixed select-none border-[#60a5fa]"
      data-v0-devtool-overlay
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      style={{
        borderWidth,
        boxSizing: "content-box",
        top,
        left,
        width,
        height,
        zIndex: props.locked ? 99998 : 99999,
        pointerEvents:
          props.contentEditingElement?.element === props.element
            ? "none"
            : "auto",
        transition: "opacity 0.1s ease",
        opacity: props.hide ? 0 : 1,
      }}
    >
      {/* Dropdown menu for locked elements */}
      {props.locked && props.element.isConnected && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span
              className={cn(
                GeistMono.className,
                "font-medium antialiased absolute flex w-min select-none items-center gap-[2px] whitespace-nowrap rounded-[8px] border border-[rgb(29_78_216/0.1)] bg-[#dbeafe] px-[6px] py-[2px] pr-[4px] text-[12px] text-[#1d4ed8] hover:bg-[#bfdbfe]",
                isFullScreen
                  ? "top-0 translate-y-[8px]"
                  : top >= 30
                  ? "bottom-full translate-y-[-8px]"
                  : "top-full translate-y-[8px]",
                isFullScreen
                  ? "left-0 translate-x-[8px]"
                  : left >= 5
                  ? "left-0 translate-x-[-1px]"
                  : "left-0 translate-x-[4px]"
              )}
            >
              <DiamondIcon className="size-3.5" />
              {props.source.name}
              {/* Chevron down icon */}
              <svg
                height="14"
                width="14"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={4}
            className="z-[2147483645] rounded-[4px] border-[#444] bg-[#222] p-[4px] text-[#fff]"
            data-v0-devtool-dropdown-menu
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => props.contextMenuRef.current!.goto(props.source)}
                className={cn(
                  GeistMono.className,
                  "rounded-[2px] w-full px-[8px] py-[4px] text-[12px] text-[#fff] font-[400] leading-[16px] hover:bg-[#444] focus:bg-[#444]"
                )}
              >
                Go to code
              </DropdownMenuItem>
              {props.inlineEdit && (
                <DropdownMenuItem
                  onClick={() => props.contextMenuRef.current!.edit()}
                  className={cn(
                    GeistMono.className,
                    "rounded-[2px] w-full px-[8px] py-[4px] text-[12px] text-[#fff] font-[400] leading-[16px] hover:bg-[#444] focus:bg-[#444]"
                  )}
                >
                  Edit content
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => props.contextMenuRef.current!.copy(props.source)}
                className={cn(
                  GeistMono.className,
                  "rounded-[2px] w-full px-[8px] py-[4px] text-[12px] text-[#fff] font-[400] leading-[16px] hover:bg-[#444] focus:bg-[#444]"
                )}
              >
                Copy component code
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  props.contextMenuRef.current!.delete(props.source)
                }
                className={cn(
                  GeistMono.className,
                  "rounded-[2px] w-full px-[8px] py-[4px] text-[12px] text-[#fff] font-[400] leading-[16px] hover:bg-[#444] focus:bg-[#444]"
                )}
              >
                Delete element
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Padding indicator */}
      {hasPadding && (
        <div
          className="pointer-events-none absolute box-border border-[#60a5fa]"
          style={{
            borderStyle: "dotted",
            borderWidth: 1,
            left: props.padding[3] - 1,
            top: props.padding[0] - 1,
            right: props.padding[1] - 1,
            bottom: props.padding[2] - 1,
          }}
        />
      )}
    </DismissableLayerBranch>
  );

  // Wrap in context menu
  overlay = (
    <ContextMenu
      onOpenChange={(open) => {
        props.contextMenuRef.current!.open = open;
      }}
    >
      <ContextMenuTrigger>{overlay}</ContextMenuTrigger>
      <ContextMenuContent
        data-v0-devtool-contextmenu
        style={{ zIndex: 0x7ffffffd }}
        className="rounded-[4px] border-[#444] bg-[#222] text-[#fff]"
      >
        <DevToolsContextMenuItem
          onClick={() => props.contextMenuRef.current!.goto(props.source)}
        >
          Go to code
        </DevToolsContextMenuItem>
        {props.inlineEdit && (
          <DevToolsContextMenuItem
            onClick={() => props.contextMenuRef.current!.edit()}
          >
            Edit content
          </DevToolsContextMenuItem>
        )}
        <DevToolsContextMenuItem
          onClick={() => props.contextMenuRef.current!.copy(props.source)}
        >
          Copy component code
        </DevToolsContextMenuItem>
        <DevToolsContextMenuItem
          onClick={() => props.contextMenuRef.current!.delete(props.source)}
        >
          Delete element
        </DevToolsContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );

  // If no related elements or hidden, return just the overlay
  if (props.relatedElements.size <= 1 || props.hide) {
    return overlay;
  }

  // Render related elements as additional overlays
  const relatedOverlays: React.ReactElement[] = [];
  let relatedIndex = 0;

  props.relatedElements.forEach((relatedElement) => {
    if (relatedElement === props.element) return;

    const bounds = getElementBounds(relatedElement);
    relatedOverlays.push(
      <div
        key={`_v0_r_${++relatedIndex}`}
        className="pointer-events-none fixed box-content select-none border border-dotted border-blue-400/60 bg-blue-100/25 mix-blend-multiply"
        style={{
          top: bounds.bounds.top - 1,
          left: bounds.bounds.left - 1,
          width: Math.max(0, bounds.bounds.width),
          height: Math.max(0, bounds.bounds.height),
          zIndex: 9999,
        }}
      />
    );
  });

  return (
    <>
      {relatedOverlays}
      {overlay}
    </>
  );
}

export default ElementOverlay;
