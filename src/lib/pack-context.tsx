"use client";

import { createContext, useContext } from "react";

export type PackItem = {
  id: string;
  title: string;
  meta: string;
  price: number;
  image: string;
};

export type PackContextValue = {
  items: PackItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (item: PackItem) => void;
  remove: (id: string) => void;
  open: () => void;
  close: () => void;
};

export const PackContext = createContext<PackContextValue | null>(null);

export function usePack() {
  const ctx = useContext(PackContext);
  if (!ctx) throw new Error("usePack must be used inside <PackProvider>");
  return ctx;
}
