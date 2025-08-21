import type { FC } from "react";
import { Link } from "../common/link";
import type { StructuredContent, ParagraphElement, Paragraph } from "./types";

type Props = {
  content: StructuredContent;
};

const renderParagraphElement = (element: ParagraphElement, index: number) => {
  if (element.type === "text") {
    return <span key={index}>{element.content}</span>;
  }

  if (element.type === "link") {
    return (
      <Link
        key={index}
        href={element.url}
        className="text-primary hover:text-primary/80 underline underline-offset-2 !text-base"
        target={element.external ? "_blank" : "_self"}
      >
        {element.text ?? element.url}
      </Link>
    );
  }

  return null;
};

export const NoteParser: FC<Props> = ({ content }) => {
  return (
    <div className="space-y-4">
      {content.paragraphs.map((paragraph: Paragraph) => (
        <p key={paragraph.id}>
          {paragraph.elements.map((element: ParagraphElement, index: number) =>
            renderParagraphElement(element, index)
          )}
        </p>
      ))}
    </div>
  );
};
