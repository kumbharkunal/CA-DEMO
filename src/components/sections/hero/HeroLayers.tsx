import { motion, useReducedMotion } from "framer-motion";
import { duration, easeOut } from "@/lib/motion";

/** Final resting opacity — the mesh fades back so the copy stays the hero. */
const MESH_REST_OPACITY = 0.55;

/**
 * The hero's atmosphere — one single ink-gradient + brass-mesh layer that
 * breathes via a pure translate/rotate keyframe. content-visibility:auto
 * + contain:paint keep it from ever costing scroll. Reduced-motion:
 * static mesh at the same resting opacity, no drift, no entrance.
 */
export function HeroLayers() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="hero-mesh"
        style={{ animation: "none", opacity: MESH_REST_OPACITY }}
      />
    );
  }

  // Breathing halo — sits under the 3D cards and copy. The entrance is a
  // single scale+fade at page duration; it never exceeds the 500ms cap.
  return (
    <motion.div
      aria-hidden="true"
      className="hero-mesh"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: MESH_REST_OPACITY, scale: 1 }}
      transition={{ duration: duration.page, ease: easeOut }}
    />
  );
}
