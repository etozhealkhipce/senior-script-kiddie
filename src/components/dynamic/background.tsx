import { useRef, useState, useMemo } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import getStroke from "perfect-freehand";
import React from "react";

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}

export const Background = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<[number, number, number][]>([]);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const animate = () => {
      gsap.to(bgRef.current, {
        duration: 0.05,
        backgroundPosition: `${Math.floor(Math.random() * 100) + 1}% ${
          Math.floor(Math.random() * 10) + 1
        }%`,
        ease: "none",
        onComplete: animate,
      });
    };

    animate();
  }, []);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();

    (e.target as SVGSVGElement).setPointerCapture(e.pointerId);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();

    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  };

  const pathData = useMemo(() => {
    const stroke = getStroke(points, {
      size: 7,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
    });

    return getSvgPathFromStroke(stroke);
  }, [points]);

  return (
    <>
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-screen pointer-events-none mix-blend-multiply bg-[url(https://static.tumblr.com/rxfwyqf/20Zlzzth8/noise.png)] opacity-15"
      ></div>

      <svg
        className="fixed inset-0 w-full h-screen pointer-events-auto text-accent stroke-accent fill-accent"
        style={{ touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {points && <path d={pathData} />}
      </svg>
    </>
  );
};
