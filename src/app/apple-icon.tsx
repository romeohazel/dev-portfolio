import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b08",
          borderRadius: 36,
        }}
      >
        <svg
          width="80"
          height="112"
          viewBox="0 0 40 56"
          fill="none"
        >
          <line x1="20" y1="56" x2="20" y2="28" stroke="#5a7a52" strokeWidth="1.5" />
          <path d="M20 36 Q10 30 8 20 Q14 26 20 30" fill="#3a5a3a" opacity="0.7" />
          <path d="M20 32 Q30 26 32 16 Q26 22 20 28" fill="#5a7a52" opacity="0.5" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
