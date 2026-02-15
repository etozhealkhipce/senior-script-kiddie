import getStroke from "perfect-freehand";
import React, { type FC, useMemo, useState } from "react";
import { getSvgPathFromStroke } from "@/lib/get-svg-path-from-stroke";

const DRAWING_CONFIG = {
  size: 7,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
};
const MAX_SAVED_DRAWINGS = 20;

export const Background: FC = () => {
  const [points, setPoints] = useState<[number, number, number][]>([]);
  const [savedDrawings, setSavedDrawings] = useState<[number, number, number][][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    (e.target as SVGSVGElement).setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints([[x, y, e.pressure]]);
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (e.buttons !== 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => [...prev, [x, y, e.pressure]]);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();

    if (isDrawing && points.length > 1) {
      const allDrawings = [...savedDrawings, points];

      const newDrawings =
        allDrawings.length > MAX_SAVED_DRAWINGS ? allDrawings.slice(1) : allDrawings;

      setSavedDrawings(newDrawings);
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
      <div className="fixed inset-0 w-full h-screen pointer-events-none mix-blend-multiply bg-[url(https://static.tumblr.com/rxfwyqf/20Zlzzth8/noise.png)] opacity-15"></div>

      <svg
        className="hidden lg:block fixed inset-0 w-full h-screen pointer-events-auto text-accent stroke-accent fill-accent touch-none"
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
