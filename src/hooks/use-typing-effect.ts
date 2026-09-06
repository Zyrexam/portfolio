"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Typewriter effect that types out the given text character by character.
 * Returns the currently displayed substring.
 */
export function useTypingEffect(
  text: string,
  options?: { speed?: number; startDelay?: number; enabled?: boolean },
) {
  const { speed = 28, startDelay = 300, enabled = true } = options ?? {};
  // When disabled, just return the full text immediately (no effect work).
  const [displayed, setDisplayed] = useState(enabled ? "" : text);
  const [done, setDone] = useState(!enabled);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    idxRef.current = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      const tick = () => {
        idxRef.current += 1;
        setDisplayed(text.slice(0, idxRef.current));
        if (idxRef.current >= text.length) {
          setDone(true);
          return;
        }
        timeout = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}
