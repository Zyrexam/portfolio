import { ImageResponse } from "next/og";
import { profile, stats } from "@/lib/content";

export const alt = "Mohit Kumar — Backend Engineer · MohitOS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MONO = "'ui-monospace', 'SFMono-Regular', Menlo, Consolas, monospace";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1e1e1e",
          fontFamily: MONO,
          color: "#f2f2f2",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: 999,
            background:
              "linear-gradient(135deg, rgba(78,201,176,0.28), rgba(78,201,176,0) 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -140,
            width: 640,
            height: 640,
            borderRadius: 999,
            background:
              "linear-gradient(135deg, rgba(0,122,204,0.22), rgba(0,122,204,0) 60%)",
          }}
        />

        {/* top hairline */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 6,
            background: "linear-gradient(90deg, #007acc, #4ec9b0)",
          }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 64,
            padding: "0 72px",
            position: "relative",
          }}
        >
          {/* left: identity */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 22,
                color: "#8a8a8a",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "#4ec9b0",
                }}
              />
              <span>
                {profile.osName} {profile.osVersion} · /home/mohit
              </span>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 62,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: -1,
              }}
            >
              {profile.name}
              <span style={{ color: "#4ec9b0" }}>.</span>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 28,
                color: "#9cdcfe",
              }}
            >
              {profile.credential}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 20,
                lineHeight: 1.55,
                color: "#a9a9a9",
                maxWidth: 560,
              }}
            >
              Distributed systems, async pipelines, payment-grade APIs.
              {stats.map((s) => ` ${s.value} ${s.label.toLowerCase()} ·`).join("")}
            </div>
          </div>

          {/* right: terminal window */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 430,
              borderRadius: 14,
              border: "1px solid #3a3a3a",
              background: "rgba(13,13,13,0.9)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 20px",
                background: "#1d1d1d",
                fontSize: 16,
                color: "#626262",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#ff5f56",
                }}
              />
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#ffbd2e",
                }}
              />
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#27c93f",
                }}
              />
              <span style={{ marginLeft: 8 }}>mohit@dev: ~</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "24px 24px 28px",
                fontSize: 20,
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#4ec9b0" }}>visitor@mohit</span>
                <span style={{ color: "#8a8a8a" }}>:</span>
                <span style={{ color: "#569cd6" }}>~$</span>
                <span style={{ color: "#ffffff" }}>stats</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {stats.map((s) => (
                  <div key={s.label} style={{ display: "flex", gap: 14 }}>
                    <span style={{ color: "#8a8a8a", width: 150 }}>
                      {s.label}
                    </span>
                    <span style={{ color: "#dcdcaa" }}>{s.value}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 6,
                  fontSize: 18,
                  color: "#4ec9b0",
                }}
              >
                <span style={{ color: "#8a8a8a" }}>→ open to backend roles · </span>
                <span>mohit --why</span>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 72px 40px",
            fontSize: 18,
            color: "#6f6f6f",
            position: "relative",
          }}
        >
          <span>github.com/Zyrexam · linkedin · leetcode (400+)</span>
          <span style={{ color: "#4ec9b0" }}>mohitkumar-six.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}