import { useEffect, type RefObject } from "react";

/**
 * Keeps Tab inside a dialog, and gives focus back when it closes.
 *
 * Escape and backdrop clicks are the caller's job — this only handles the two
 * things that are easy to get wrong: keyboard focus never escaping to the page
 * behind, and the trigger getting focus back so a keyboard user isn't dumped at
 * the top of the document.
 *
 * The focusable list is re-read on every Tab rather than cached, because a
 * dialog's contents can change while it is open (an error message appearing,
 * a field being revealed).
 */

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active = true) {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    /** `getClientRects` rather than `offsetParent` — the latter is null for
        anything inside a position:fixed ancestor, which is every dialog here. */
    const focusables = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );

    // Move focus in. The container carries tabIndex={-1} as the fallback for a
    // dialog that happens to contain nothing focusable yet.
    //
    // preventScroll matters: without it the browser scrolls to "reveal" the
    // newly focused control, which yanked the page hundreds of pixels the
    // instant a dialog opened — visible as a jump behind the backdrop.
    (focusables()[0] ?? node).focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !node.contains(current);

      if (e.shiftKey && (current === first || outside)) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && (current === last || outside)) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      // Guard: the trigger may have unmounted while the dialog was open.
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [ref, active]);
}
