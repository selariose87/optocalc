import {
  EMPTY_OPTICA_SETTINGS,
  OpticaSettings,
  readOpticaSettings,
  writeOpticaSettings,
} from "./opticaSettings";

type Listener = () => void;

let cache: OpticaSettings = EMPTY_OPTICA_SETTINGS;
let initialized = false;
const listeners = new Set<Listener>();

function ensureInitialized(): void {
  if (!initialized && typeof window !== "undefined") {
    cache = readOpticaSettings();
    initialized = true;
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): OpticaSettings {
  ensureInitialized();
  return cache;
}

export function getServerSnapshot(): OpticaSettings {
  return EMPTY_OPTICA_SETTINGS;
}

export function setOpticaSettings(next: OpticaSettings): void {
  cache = next;
  initialized = true;
  writeOpticaSettings(next);
  listeners.forEach((listener) => listener());
}
