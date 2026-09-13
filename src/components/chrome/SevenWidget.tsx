"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, SendIcon } from "@/components/Icons";
import { useSevenEyes } from "@/hooks/useSevenEyes";
import { COLOR, FONT } from "@/lib/theme";

export function SevenWidget({ hidden }: { hidden: boolean }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hover, setHover] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useSevenEyes();

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  useEffect(() => {
    if (hidden && open) {
      setOpen(false);
      setClosing(false);
      setHover(false);
    }
  }, [hidden, open]);

  const toggle = () => {
    if (open) {
      setClosing(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setOpen(false);
        setClosing(false);
        setHover(false);
      }, 230);
    } else {
      if (timer.current) clearTimeout(timer.current);
      setOpen(true);
      setClosing(false);
    }
  };

  const visible = open || closing;

  return (
    <div
      style={{
        position: "fixed",
        right: "clamp(12px, 3vw, 28px)",
        bottom: "clamp(12px, 3vw, 28px)",
        zIndex: 60,
        fontFamily: FONT.body,
        animation: hidden
          ? "m7sevenOut .5s cubic-bezier(.5,0,.6,1) both"
          : "m7sevenIn .6s cubic-bezier(.34,1.4,.64,1) both",
      }}
    >
      {visible ? (
        <div
          style={{
            width: "min(344px, calc(100vw - 24px))",
            background: COLOR.card,
            border: `1px solid ${COLOR.lineStrong}`,
            borderRadius: "20px 20px 2px 20px",
            boxShadow: "0 28px 70px rgba(28,21,15,0.22)",
            overflow: "hidden",
            transformOrigin: "bottom right",
            animation: closing
              ? "sevenOut .22s cubic-bezier(.4,0,.7,.3) both"
              : "sevenIn .38s cubic-bezier(.18,.89,.32,1.12) both",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 18px",
              borderBottom: `1px solid ${COLOR.line}`,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: COLOR.card,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flex: "0 0 auto",
              }}
            >
              <canvas data-eq style={{ width: 24, height: 24, display: "block" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: FONT.head,
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                Seven AI
              </div>
            </div>
            <span
              onClick={toggle}
              style={{
                cursor: "pointer",
                color: COLOR.muted,
                display: "inline-flex",
                padding: "2px",
              }}
            >
              <ChevronDownIcon />
            </span>
          </div>

          <div
            style={{
              padding: 18,
              background: COLOR.cream,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "80%",
                background: COLOR.card,
                border: `1px solid ${COLOR.line}`,
                borderRadius: "14px 14px 14px 4px",
                padding: "12px 15px",
                fontSize: 14,
                lineHeight: 1.45,
              }}
            >
              Hi! I&apos;m Seven. Looking for a device, a trade-in, or a store?
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                maxWidth: "80%",
                background: COLOR.rust,
                color: COLOR.cream,
                borderRadius: "14px 14px 4px 14px",
                padding: "12px 15px",
                fontSize: 14,
                lineHeight: 1.45,
              }}
            >
              What&apos;s my old phone worth?
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 14px",
              borderTop: `1px solid ${COLOR.line}`,
            }}
          >
            <input
              placeholder="Message Seven…"
              style={{
                flex: 1,
                background: COLOR.cream,
                border: "none",
                outline: "none",
                borderRadius: 99,
                padding: "12px 16px",
                fontFamily: FONT.body,
                fontSize: 14,
              }}
            />
            <span
              style={{
                display: "inline-flex",
                width: 42,
                height: 42,
                alignItems: "center",
                justifyContent: "center",
                background: COLOR.rust,
                color: COLOR.cream,
                borderRadius: 99,
                cursor: "pointer",
              }}
            >
              <SendIcon />
            </span>
          </div>
        </div>
      ) : (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={toggle}
          style={{
            display: "flex",
            alignItems: "center",
            background: COLOR.dark,
            color: COLOR.card,
            borderRadius: 999,
            padding: 6,
            boxShadow: "0 18px 44px rgba(28,21,15,0.28)",
            cursor: "pointer",
            transformOrigin: "bottom right",
            animation: "sevenPillIn .32s cubic-bezier(.18,.89,.32,1.1) both",
          }}
        >
          <span
            style={{
              flex: "0 0 auto",
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: COLOR.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <canvas data-eq style={{ width: 26, height: 26, display: "block" }} />
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-start",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition:
                "max-width .42s cubic-bezier(.4,0,.2,1),opacity .3s ease",
              maxWidth: hover ? 180 : 0,
              opacity: hover ? 1 : 0,
            }}
          >
            <span
              style={{
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: 15,
                lineHeight: 1,
                padding: "0 16px 0 12px",
              }}
            >
              Ask Seven AI
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
