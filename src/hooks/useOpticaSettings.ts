"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { OpticaSettings } from "@/lib/opticaSettings";
import {
  getServerSnapshot,
  getSnapshot,
  setOpticaSettings,
  subscribe,
} from "@/lib/opticaSettingsStore";

export function useOpticaSettings() {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const updateSettings = useCallback((next: OpticaSettings) => {
    setOpticaSettings(next);
  }, []);

  return { settings, updateSettings };
}
