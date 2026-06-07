"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 768px)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** Matches boutique split mobile breakpoint in boutique-globals.css */
export function useIsMobileSplitViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
