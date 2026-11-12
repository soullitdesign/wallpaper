"use client";

import { useEffect } from "react";
import { hydrateStore } from "@/lib/store";

/** Reads the saved cart + wishlist from localStorage once the app mounts. */
export function StoreHydrator() {
  useEffect(() => {
    hydrateStore();
  }, []);
  return null;
}
