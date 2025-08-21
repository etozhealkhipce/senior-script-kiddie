export type TextElement = {
  type: "text";
  content: string;
};

export type LinkElement = {
  type: "link";
  url: string;
  text?: string;
  external?: boolean;
};

export type ParagraphElement = TextElement | LinkElement;

export type Paragraph = {
  id: string;
  elements: ParagraphElement[];
};

export type StructuredContent = {
  paragraphs: Paragraph[];
};
