"use client";

import { useCallback, useMemo, useState } from "react";
import PackDrawer from "@/components/PackDrawer";
import { PackContext, type PackContextValue, type PackItem } from "@/lib/pack-context";

export type { PackItem } from "@/lib/pack-context";
export { usePack } from "@/lib/pack-context";

export function PackProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PackItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const add = useCallback((item: PackItem) => {
    setItems((current) => {
      if (current.some((entry) => entry.id === item.id)) return current;
      // Studio covers everything, and the collection covers every single piece,
      // so upgrading shouldn't charge for both.
      if (item.id === "studio") return [item];
      if (item.id === "collection") {
        return current.some((entry) => entry.id === "studio") ? current : [item];
      }
      if (current.some((entry) => entry.id === "collection" || entry.id === "studio")) {
        return current;
      }
      return [...current, item];
    });
    setLastAdded(item.title);
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const value = useMemo<PackContextValue>(
    () => ({
      items,
      count: items.length,
      total: items.reduce((sum, item) => sum + item.price, 0),
      isOpen,
      add,
      remove,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [items, isOpen, add, remove],
  );

  return (
    <PackContext.Provider value={value}>
      {children}
      <PackDrawer lastAdded={lastAdded} />
    </PackContext.Provider>
  );
}
