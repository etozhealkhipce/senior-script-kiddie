import { $fetch, FetchError } from "ofetch";
import type { NoteApiData } from "@/components/dynamic/notes-page/types";

const baseURL = process.env.API_URL ?? import.meta.env.API_URL;

export const api = $fetch.create({ baseURL });

interface CacheEntry<T> {
  value: T;
  expires: number;
}

const store = new Map<string, CacheEntry<unknown>>();
const TTL_MS = 60_000;

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = store.get(key) as CacheEntry<T> | undefined;

  if (entry) {
    if (now < entry.expires) {
      return entry.value;
    }

    void fn().then((fresh) => store.set(key, { value: fresh, expires: Date.now() + TTL_MS }));

    return entry.value;
  }

  const value = await fn();
  store.set(key, { value, expires: now + TTL_MS });
  return value;
}

export async function getNotes(type: "note" | "work"): Promise<NoteApiData[]> {
  return cached(`notes:${type}`, async () => {
    try {
      return await api<NoteApiData[]>("/notes", { params: { type } });
    } catch (e) {
      if (e instanceof FetchError) {
        console.error(`[api] GET /notes?type=${type} failed:`, e.message);
      }
      return [];
    }
  });
}

export async function getNote(slug: string): Promise<NoteApiData | null> {
  return cached(`note:${slug}`, async () => {
    try {
      return await api<NoteApiData>(`/notes/${slug}`);
    } catch (e) {
      if (e instanceof FetchError && e.status === 404) return null;
      if (e instanceof FetchError) {
        console.error(`[api] GET /notes/${slug} failed:`, e.message);
      }
      return null;
    }
  });
}
