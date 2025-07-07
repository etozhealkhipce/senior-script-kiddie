// State management utilities for Astro
export interface StateManager<T> {
  get(): T | null;
  set(value: T): void;
  remove(): void;
  subscribe(callback: (value: T | null) => void): () => void;
}

class LocalStateManager<T> implements StateManager<T> {
  private key: string;
  private listeners: Set<(value: T | null) => void> = new Set();

  constructor(key: string) {
    this.key = key;

    // Listen for storage events from other tabs/windows
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === this.key) {
          const value = e.newValue ? JSON.parse(e.newValue) : null;
          this.notifyListeners(value);
        }
      });
    }
  }

  get(): T | null {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(this.key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  set(value: T): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.key, JSON.stringify(value));
      this.notifyListeners(value);
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  }

  remove(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem(this.key);
    this.notifyListeners(null);
  }

  subscribe(callback: (value: T | null) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(value: T | null): void {
    this.listeners.forEach((callback) => callback(value));
  }
}

class SessionStateManager<T> implements StateManager<T> {
  private key: string;
  private listeners: Set<(value: T | null) => void> = new Set();

  constructor(key: string) {
    this.key = key;
  }

  get(): T | null {
    if (typeof window === "undefined") return null;

    try {
      const stored = sessionStorage.getItem(this.key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  set(value: T): void {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.setItem(this.key, JSON.stringify(value));
      this.notifyListeners(value);
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  }

  remove(): void {
    if (typeof window === "undefined") return;

    sessionStorage.removeItem(this.key);
    this.notifyListeners(null);
  }

  subscribe(callback: (value: T | null) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(value: T | null): void {
    this.listeners.forEach((callback) => callback(value));
  }
}

// Factory functions
export function createLocalState<T>(key: string): StateManager<T> {
  return new LocalStateManager<T>(key);
}

export function createSessionState<T>(key: string): StateManager<T> {
  return new SessionStateManager<T>(key);
}

// Predefined state managers for common use cases
export const userPreferences = createLocalState<{
  theme: "light" | "dark";
  language: string;
  sidebarCollapsed: boolean;
}>("user-preferences");

export const navigationState = createSessionState<{
  lastVisitedPage: string;
  scrollPosition: Record<string, number>;
}>("navigation-state");

export const formData = createSessionState<{
  [formId: string]: any;
}>("form-data");
