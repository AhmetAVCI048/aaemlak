"use client";

import { useState } from "react";
import { CloseIcon } from "./icons";

/*
  Danışman vesikalık fotoğrafı — yuvarlak gösterilir, tıklanınca büyür (popup).
*/
export default function DanismanFoto({
  src,
  ad,
  className = "h-12 w-12",
}: {
  src: string;
  ad: string;
  className?: string;
}) {
  const [acik, setAcik] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAcik(true)}
        className={`${className} shrink-0 overflow-hidden rounded-full ring-2 ring-brand-100 transition hover:ring-accent-400`}
        aria-label={`${ad} fotoğrafını büyüt`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={ad} className="h-full w-full object-cover" />
      </button>

      {acik && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setAcik(false)}
        >
          <button
            onClick={() => setAcik(false)}
            className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
            aria-label="Kapat"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={ad}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-3 font-semibold text-white">{ad}</p>
          </div>
        </div>
      )}
    </>
  );
}
