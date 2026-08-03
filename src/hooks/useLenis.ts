import Lenis from "lenis";
import { createContext, useContext } from "react";

export const LenisContext = createContext<Lenis | null>(null);
export const LenisScrollContext = createContext({ scrollY: 0, isScrolling: false });

export function useLenis() {
  return useContext(LenisContext);
}

/** Shared scroll feed — drives the navbar's three-act behaviour. */
export function useScrollState() {
  return useContext(LenisScrollContext);
}
