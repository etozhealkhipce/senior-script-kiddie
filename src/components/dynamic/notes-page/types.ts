export interface EditorBlock {
  id?: string;
  type: string;
  data: Record<string, unknown>;
}

export interface EditorData {
  time?: number;
  blocks: EditorBlock[];
  version?: string;
  meta?: Record<string, unknown>;
}

export interface SubtitleItem {
  title: string;
  highlight: boolean;
}

export interface NoteApiData {
  id: number;
  slug: string;
  contentType: string;
  title: string;
  preview: string;
  content: EditorData | null;
  subtitle: SubtitleItem[] | null;
  tags: string[] | null;
  link: string | null;
  linkText: string | null;
  createdAt: string;
  updatedAt: string;
}
