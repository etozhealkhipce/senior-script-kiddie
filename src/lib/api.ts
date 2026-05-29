import { $fetch, FetchError } from "ofetch";
import type { NoteApiData } from "@/components/dynamic/notes-page/types";

const baseURL = process.env.API_URL ?? "http://localhost:3000";

export const api = $fetch.create({ baseURL });

export async function getNotes(type: "note" | "work"): Promise<NoteApiData[]> {
  try {
    return await api<NoteApiData[]>("/notes", { params: { type } });
  } catch (e) {
    if (e instanceof FetchError) {
      console.error(`[api] GET /notes?type=${type} failed:`, e.message);
    }
    return [];
  }
}

export async function getNote(slug: string): Promise<NoteApiData | null> {
  try {
    return await api<NoteApiData>(`/notes/${slug}`);
  } catch (e) {
    if (e instanceof FetchError && e.status === 404) return null;
    if (e instanceof FetchError) {
      console.error(`[api] GET /notes/${slug} failed:`, e.message);
    }
    return null;
  }
}
