import { useState, useEffect } from "react";

// matches your dashboard's teal/green primary
const TEAL = "#0D9E75";
const TEAL_DARK = "#0A8A65";
const TEAL_LT = "#E6F7F2";

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  useEffect(() => {
    const suppressed = sessionStorage.getItem("medicore_welcome_suppressed");

    if (!suppressed) {
      const t = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    if (dontShow) {
      sessionStorage.setItem("medicore_welcome_suppressed", "true");
    }

    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes wm-in  { from{opacity:0;transform:translateY(20px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes wm-out { to{opacity:0;transform:translateY(12px) scale(0.98)} }
        @keyframes wm-bg  { from{opacity:0} to{opacity:1} }
        .wm-overlay { animation: wm-bg 0.2s ease forwards; }
        .wm-box { animation: ${closing ? "wm-out 0.28s ease forwards" : "wm-in 0.32s cubic-bezier(0.22,1,0.36,1) forwards"}; }
        .wm-close:hover { background: #e9f7f3 !important; color: ${TEAL} !important; }
        .wm-cta:hover { background: ${TEAL_DARK} !important; }
      `}</style>

      <div
        className="wm-overlay"
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          background: "rgba(15,27,45,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          className="wm-box"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 420,
            overflow: "hidden",
            fontFamily: "'Segoe UI', sans-serif",
            border: "1px solid #E4EDE8",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: TEAL,
              padding: "24px 24px 20px",
              position: "relative",
            }}
          >
            <button
              className="wm-close"
              onClick={close}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(255,255,255,0.18)",
                border: "none",
                color: "#fff",
                width: 28,
                height: 28,
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              ></div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>
                  {greeting}, Dr. Admin
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.75)",
                    marginTop: 2,
                  }}
                >
                  MedCore Hospital · City General
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "18px 24px 8px" }}>
            <p
              style={{
                fontSize: 13,
                color: "#4A5568",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              You have <strong style={{ color: TEAL }}>3 alerts</strong> and{" "}
              <strong style={{ color: "#C47D0A" }}>6 pending invoices</strong>{" "}
              awaiting review. ICU occupancy is at{" "}
              <strong style={{ color: "#C0392B" }}>94%</strong>.
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "14px 24px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#8896AC",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
                style={{ accentColor: TEAL, width: 13, height: 13 }}
              />
              Don't show again
            </label>
            <button
              className="wm-cta"
              onClick={close}
              style={{
                backgroundColor: TEAL,
                color: "#fff",
                border: "none",
                padding: "9px 22px",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
              }}
            >
              Get started →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
