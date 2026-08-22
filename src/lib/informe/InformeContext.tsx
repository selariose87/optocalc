"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import type { InformeItem } from "./types";

interface InformeContextValue {
  items: InformeItem[];
  addItem: (item: Omit<InformeItem, "id">) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

const InformeContext = createContext<InformeContextValue | null>(null);

export function InformeProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InformeItem[]>([]);

  const addItem = useCallback((item: Omit<InformeItem, "id">) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    setItems((prev) => [...prev, { ...item, id }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearItems = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearItems }),
    [items, addItem, removeItem, clearItems]
  );

  return <InformeContext.Provider value={value}>{children}</InformeContext.Provider>;
}

export function useInforme(): InformeContextValue {
  const ctx = useContext(InformeContext);
  if (!ctx) throw new Error("useInforme debe usarse dentro de InformeProvider");
  return ctx;
}
