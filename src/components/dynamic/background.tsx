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

const DRAWING_CONFIG = {
  size: 7,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
};
const MAX_SAVED_DRAWINGS = 20;

export const Background = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<[number, number, number][]>([]);
  const [savedDrawings, setSavedDrawings] = useState<
    [number, number, number][][]
  >([]);
  const [isDrawing, setIsDrawing] = useState(false);

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
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (e.buttons !== 1) return;

    setPoints((prev) => [...prev, [e.pageX, e.pageY, e.pressure]]);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();

    if (isDrawing && points.length > 1) {
      const newDrawings = [...savedDrawings, points];
      setSavedDrawings(newDrawings);
    }

    if (savedDrawings.length + 1 > MAX_SAVED_DRAWINGS) {
      setSavedDrawings(savedDrawings.slice(1));
    }

    setPoints([]);
    setIsDrawing(false);
  };

  const savedPaths = useMemo(() => {
    return savedDrawings.map((drawingPoints) => {
      const stroke = getStroke(drawingPoints, DRAWING_CONFIG);
      return getSvgPathFromStroke(stroke);
    });
  }, [savedDrawings]);

  const currentPathData = useMemo(() => {
    if (points.length === 0) return "";

    const stroke = getStroke(points, DRAWING_CONFIG);

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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {savedPaths.map((pathData, index) => (
          <path key={`saved-${index}`} d={pathData} />
        ))}

        {currentPathData && <path d={currentPathData} />}
      </svg>
    </>
  );
};
