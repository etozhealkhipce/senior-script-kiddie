import type { EditorBlock, EditorData } from "@/components/dynamic/notes-page/types";

export function resolveUploads(content: EditorData | null, apiUrl: string): EditorData | null {
  if (!content) return content;
  const backend = apiUrl.replace(/\/api$/, "");
  const prefix = (url: unknown) =>
    typeof url === "string" && url.startsWith("/uploads/") ? `${backend}${url}` : url;

  return {
    ...content,
    blocks: content.blocks.map((block: EditorBlock) => {
      if (block.type === "imageSingle" || block.type === "image") {
        return { ...block, data: { ...block.data, url: prefix(block.data.url) } };
      }
      if (block.type === "imageGallery") {
        const images = block.data.images as Array<Record<string, unknown>> | undefined;
        if (images) {
          return {
            ...block,
            data: {
              ...block.data,
              images: images.map((img) => ({ ...img, url: prefix(img.url) })),
            },
          };
        }
      }
      return block;
    }),
  };
}
