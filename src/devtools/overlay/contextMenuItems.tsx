/**
 * DevTools Context Menu Components
 * Source: 3a384aa7a60f1de8.js (Module 13072, lines 520-539)
 *
 * Styled menu items for DevTools context menus
 */

import React from "react";
import { ContextMenuItem } from "@/ui/components/ui/context-menu";
import { DropdownMenuItem } from "@/ui/components/ui/dropdown-menu";
import { cn } from "@/ui/lib/utils";
import { GeistSans } from "@/shared/fonts";

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Styled DropdownMenuItem for DevTools
 */
export function DevToolsDropdownMenuItem({ children, onClick }: MenuItemProps) {
  return (
    <DropdownMenuItem
      asChild
      className={cn(
        GeistSans.className,
        "rounded-[2px] w-full px-[8px] py-[4px] text-[12px] text-[#fff] font-[400] leading-[16px] hover:bg-[#444] hover:text-[#fff] focus:bg-[#444] focus:text-[#fff] focus:outline-none"
      )}
    >
      <button onClick={onClick}>{children}</button>
    </DropdownMenuItem>
  );
}

/**
 * Styled ContextMenuItem for DevTools
 */
export function DevToolsContextMenuItem({ children, onClick }: MenuItemProps) {
  return (
    <ContextMenuItem
      onClick={onClick}
      className={cn(
        GeistSans.className,
        "rounded-[2px] px-[8px] py-[4px] text-[12px] font-[400] leading-[16px] focus:bg-[#444] focus:text-[#fff]"
      )}
    >
      {children}
    </ContextMenuItem>
  );
}

