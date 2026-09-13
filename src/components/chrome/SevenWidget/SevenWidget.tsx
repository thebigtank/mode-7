"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, SendIcon } from "@/components/Icons";
import { useSevenEyes } from "@/hooks/useSevenEyes";
import content from "@/content/chrome.json";

export function SevenWidget({ hidden }: { hidden: boolean }) {
  const c = content.sevenWidget;
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
      className="seven-widget fixed"
      data-hidden={hidden ? "true" : "false"}
    >
      {visible ? (
        <div
          className="seven-widget__panel overflow-hidden"
          data-closing={closing ? "true" : "false"}
        >
          <div className="seven-widget__head flex items-center">
            <div className="seven-widget__eq flex items-center justify-center overflow-hidden shrink-0">
              <canvas data-eq className="seven-widget__eq-canvas block" />
            </div>
            <div className="seven-widget__title-wrap flex-1">
              <div className="seven-widget__title">{c.title}</div>
            </div>
            <span
              onClick={toggle}
              className="seven-widget__collapse inline-flex"
            >
              <ChevronDownIcon />
            </span>
          </div>

          <div className="seven-widget__body flex flex-col">
            <div className="seven-widget__bubble" data-tone="bot">
              {c.botMessage}
            </div>
            <div className="seven-widget__bubble" data-tone="user">
              {c.userMessage}
            </div>
          </div>

          <div className="seven-widget__footer flex items-center">
            <input
              placeholder={c.inputPlaceholder}
              className="seven-widget__input flex-1"
            />
            <span className="seven-widget__send inline-flex items-center justify-center">
              <SendIcon />
            </span>
          </div>
        </div>
      ) : (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={toggle}
          className="seven-widget__pill flex items-center"
        >
          <span className="seven-widget__pill-eq flex items-center justify-center overflow-hidden shrink-0">
            <canvas data-eq className="seven-widget__pill-eq-canvas block" />
          </span>
          <span
            className="seven-widget__pill-label inline-flex items-center justify-start overflow-hidden whitespace-nowrap"
            data-hover={hover ? "true" : "false"}
          >
            <span className="seven-widget__pill-label-text">{c.pillLabel}</span>
          </span>
        </div>
      )}
    </div>
  );
}
