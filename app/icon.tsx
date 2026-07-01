import { ImageResponse } from "next/og";

// Tarayıcı sekmesi / yer imi simgesi (favicon) — "AA" markası
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#102a43",
          color: "#fbbf24",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          borderRadius: 12,
        }}
      >
        AA
      </div>
    ),
    { ...size }
  );
}
