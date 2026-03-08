import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0b0b",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.8 }}>
          THE BLACK BOK
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            marginTop: 20,
            lineHeight: 1.1,
          }}
        >
          รับทำเว็บไซต์
        </div>

        <div
          style={{
            fontSize: 48,
            marginTop: 10,
            color: "#4388C6",
          }}
        >
          Digital Marketing
        </div>

        <div
          style={{
            fontSize: 28,
            marginTop: 30,
            opacity: 0.9,
          }}
        >
          Ads • Landing • Tracking • Report
        </div>
      </div>
    ),
    size
  );
}