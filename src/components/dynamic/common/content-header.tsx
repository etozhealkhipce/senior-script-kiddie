import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  title: string;
  subtitle: string;
};

export const ContentHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <h1 className="font-secondary text-3xl lg:text-5xl font-medium">
        {title}
      </h1>
      <p className="text-secondary font-secondary text-sm">{subtitle}</p>
    </div>
  );
};
