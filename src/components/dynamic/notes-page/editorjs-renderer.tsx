import DOMPurify from "isomorphic-dompurify";
import type { ElementType, FC } from "react";
import type { EditorBlock, EditorData } from "./types";

const sanitize = (html: string) => DOMPurify.sanitize(html);

type Props = {
  content: EditorData;
};

const renderBlock = (block: EditorBlock) => {
  const { type, data } = block;
  const key = block.id ?? type;

  switch (type) {
    case "paragraph": {
      const text = data.text as string | undefined;
      if (!text) return null;
      return <p key={key} dangerouslySetInnerHTML={{ __html: sanitize(text) }} />;
    }

    case "header": {
      const level = Math.min(Math.max((data.level as number) ?? 3, 1), 6);
      const text = data.text as string | undefined;
      if (!text) return null;
      const headerTags: Record<number, ElementType> = {
        1: "h1",
        2: "h2",
        3: "h3",
        4: "h4",
        5: "h5",
        6: "h6",
      };
      const Tag = headerTags[level] ?? "h3";
      return <Tag key={key} dangerouslySetInnerHTML={{ __html: sanitize(text) }} />;
    }

    case "list": {
      const raw = (data.items ?? []) as (string | { content: string; items?: unknown[] })[];
      const ordered = data.style === "ordered";
      const ListTag = ordered ? "ol" : "ul";

      const renderItems = (items: typeof raw): React.ReactNode =>
        items.map((item, i) => {
          const html = typeof item === "string" ? item : item.content;
          const nested =
            typeof item === "object" && item.items?.length
              ? renderItems(item.items as typeof raw)
              : null;
          return (
            <li key={i}>
              <span dangerouslySetInnerHTML={{ __html: sanitize(html) }} />
              {nested && <ListTag>{nested}</ListTag>}
            </li>
          );
        });

      return <ListTag key={key}>{renderItems(raw)}</ListTag>;
    }

    case "quote": {
      const text = data.text as string | undefined;
      const caption = data.caption as string | undefined;
      if (!text) return null;
      return (
        <blockquote key={key}>
          <p dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
          {caption && <footer dangerouslySetInnerHTML={{ __html: sanitize(caption) }} />}
        </blockquote>
      );
    }

    case "delimiter":
    case "divider":
      return <hr key={key} className="my-4 border-neutral-700" />;

    case "code": {
      const code = data.code as string | undefined;
      if (!code) return null;
      return (
        <pre key={key} className="bg-neutral-900 rounded p-4 overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>
      );
    }

    case "table": {
      const rows = (data.content as string[][]) ?? [];
      if (!rows.length) return null;
      return (
        <div key={key} className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-neutral-800">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-1.5"
                      dangerouslySetInnerHTML={{ __html: sanitize(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "embed": {
      const src = data.embed as string | undefined;
      const caption = data.caption as string | undefined;
      if (!src) return null;
      return (
        <figure key={key} className="my-4">
          <iframe
            src={src}
            title={caption ?? "Embedded content"}
            className="w-full rounded"
            style={{ minHeight: 300 }}
            allowFullScreen
          />
          {caption && <figcaption className="text-xs text-neutral-500 mt-1">{caption}</figcaption>}
        </figure>
      );
    }

    case "imageGallery": {
      type GalleryImage = { id?: string; url: string; caption?: string; alt?: string };
      const images = (data.images as GalleryImage[] | undefined) ?? [];
      if (!images.length) return null;

      const count = images.length;

      const gridClass =
        count === 1
          ? "grid-cols-1"
          : count === 2
            ? "grid-cols-2"
            : count === 3
              ? "grid-cols-2"
              : "grid-cols-2";

      return (
        <figure key={key} className={`my-4 grid gap-1 rounded-xl overflow-hidden ${gridClass}`}>
          {images.map((img, i) => {
            const spanClass = count === 3 && i === 0 ? "row-span-2" : "";
            return (
              <div
                key={img.id ?? i}
                className={`relative overflow-hidden bg-neutral-900 ${spanClass}`}
              >
                <img
                  src={img.url}
                  alt={img.alt ?? img.caption ?? ""}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  style={{
                    aspectRatio: count === 1 ? "16/9" : count === 3 && i === 0 ? "1/2" : "1/1",
                  }}
                />
              </div>
            );
          })}
        </figure>
      );
    }

    case "imageSingle":
    case "image": {
      const url =
        (data.url as string | undefined) ?? (data.file as { url?: string } | undefined)?.url;
      const caption = data.caption as string | undefined;
      const alt = (data.alt as string | undefined) ?? caption ?? "";
      if (!url) return null;
      return (
        <figure key={key} className="my-4">
          <img src={url} alt={alt} className="rounded max-w-full" loading="lazy" decoding="async" />
          {caption && (
            <figcaption className="text-xs text-neutral-500 mt-1 text-center">{caption}</figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
};

export const EditorJsRenderer: FC<Props> = ({ content }) => {
  if (!content?.blocks?.length) {
    return null;
  }

  return <div className="space-y-4">{content.blocks.map(renderBlock)}</div>;
};
