"use client";

import { useSyncExternalStore } from "react";

export type CartLine = {
  slug: string;
  licence: "personal" | "extended";
  qty: number;
};

const CART_KEY = "nocturne.cart.v1";
const WISH_KEY = "nocturne.wishlist.v1";

let cart: CartLine[] = [];
let wishlist: string[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function hydrateStore() {
  if (hydrated || typeof window === "undefined") return;
  cart = read<CartLine[]>(CART_KEY, []);
  wishlist = read<string[]>(WISH_KEY, []);
  hydrated = true;
  emit();
}

function persist() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  } catch {
    /* storage full or blocked — cart still works for this session */
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/* ---------------- cart actions ---------------- */

export function addToCart(slug: string, licence: CartLine["licence"] = "personal", qty = 1) {
  hydrateStore();
  const line = cart.find((l) => l.slug === slug && l.licence === licence);
  if (line) line.qty = Math.min(9, line.qty + qty);
  else cart = [...cart, { slug, licence, qty }];
  persist();
  emit();
}

export function removeLine(slug: string, licence: CartLine["licence"]) {
  cart = cart.filter((l) => !(l.slug === slug && l.licence === licence));
  persist();
  emit();
}

export function setQty(slug: string, licence: CartLine["licence"], qty: number) {
  if (qty <= 0) return removeLine(slug, licence);
  cart = cart.map((l) =>
    l.slug === slug && l.licence === licence ? { ...l, qty: Math.min(9, qty) } : l,
  );
  persist();
  emit();
}

export function clearCart() {
  cart = [];
  persist();
  emit();
}

export function toggleWish(slug: string) {
  hydrateStore();
  wishlist = wishlist.includes(slug) ? wishlist.filter((s) => s !== slug) : [...wishlist, slug];
  persist();
  emit();
}

/* ---------------- hooks ---------------- */

const emptyCart: CartLine[] = [];
const emptyWish: string[] = [];

export function useCart() {
  const lines = useSyncExternalStore(
    subscribe,
    () => cart,
    () => emptyCart,
  );
  return lines;
}

export function useWishlist() {
  return useSyncExternalStore(
    subscribe,
    () => wishlist,
    () => emptyWish,
  );
}

export function useCartReady() {
  return useSyncExternalStore(
    subscribe,
    () => hydrated,
    () => false,
  );
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}
