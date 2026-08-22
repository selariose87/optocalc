export interface OpticaSettings {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  logoDataUrl: string | null;
}

export const OPTICA_SETTINGS_KEY = "optocalc:optica-settings";

export const EMPTY_OPTICA_SETTINGS: OpticaSettings = {
  nombre: "",
  direccion: "",
  telefono: "",
  email: "",
  logoDataUrl: null,
};

export function readOpticaSettings(): OpticaSettings {
  if (typeof window === "undefined") return EMPTY_OPTICA_SETTINGS;
  try {
    const raw = window.localStorage.getItem(OPTICA_SETTINGS_KEY);
    if (!raw) return EMPTY_OPTICA_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<OpticaSettings>;
    return { ...EMPTY_OPTICA_SETTINGS, ...parsed };
  } catch {
    return EMPTY_OPTICA_SETTINGS;
  }
}

export function writeOpticaSettings(settings: OpticaSettings): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OPTICA_SETTINGS_KEY, JSON.stringify(settings));
}
