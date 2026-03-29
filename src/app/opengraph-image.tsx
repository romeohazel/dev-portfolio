import { ImageResponse } from "next/og";

export const alt = "Romeo Hazel — Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b08",
          position: "relative",
        }}
      >
        {/* Subtle gradient glow */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(90,122,82,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />

        {/* Plant icon */}
        <svg
          width="48"
          height="68"
          viewBox="0 0 40 56"
          fill="none"
          style={{ marginBottom: 32, opacity: 0.6 }}
        >
          <line x1="20" y1="56" x2="20" y2="28" stroke="#5a7a52" strokeWidth="1.5" />
          <path d="M20 36 Q10 30 8 20 Q14 26 20 30" fill="#3a5a3a" opacity="0.7" />
          <path d="M20 32 Q30 26 32 16 Q26 22 20 28" fill="#5a7a52" opacity="0.5" />
        </svg>

        {/* Name */}
        <div
          style={{
            fontSize: 48,
            letterSpacing: "0.3em",
            color: "#e4e0d8",
            fontWeight: 300,
            textTransform: "uppercase",
            marginBottom: 16,
            fontFamily: "system-ui, sans-serif",
            display: "flex",
          }}
        >
          Romeo Hazel
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.12em",
            color: "#a8a296",
            fontFamily: "monospace",
            marginBottom: 24,
            display: "flex",
          }}
        >
          full stack · CSUDH · incoming SWE @ Meta
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(to right, transparent, #5a7a52, transparent)",
            marginBottom: 24,
            display: "flex",
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.08em",
            color: "#6b6660",
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          romeohazel.com
        </div>
      </div>
    ),
    { ...size }
  );
}
