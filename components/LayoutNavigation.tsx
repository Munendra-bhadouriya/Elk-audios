"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function LayoutNavigation() {
  const pathname = usePathname();
  
  // Hide navigation on home page since Hero has its own with animations
  if (pathname === "/") {
    return null;
  }

  return <Navigation variant="dark" />;
}
