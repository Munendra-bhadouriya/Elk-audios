"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function LayoutNavigation() {
  const pathname = usePathname();
  
  // Hide navigation on home (Hero has its own)
  if (pathname === "/") {
    return null;
  }

  return (
    <Navigation
      variant="dark"
      fixed={pathname === "/products/boutique-architectural"}
    />
  );
}
