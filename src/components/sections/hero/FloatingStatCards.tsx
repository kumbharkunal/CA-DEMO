import { motion, useReducedMotion } from "framer-motion";
import { duration, easeOut } from "@/lib/motion";
import { heroStats } from "@/lib/hero";

/**
 * Card choreography, zipped 1:1 with `heroStats` by index. The two timing
 * concerns — entrance rise and continuous float — are split across two
 * nested layers below, because a single keyframed `y` channel forces
 * entrance and loop to share one duration.
 */
const CARD_LAYOUT = [
  { top: "18%", right: "6%", x: "-2rem", rise: 24, float: 8 },
  { top: "32%", right: "12%", x: "-1rem", rise: 40, float: 12 },
  { top: "46%", right: "8%", x: "-0.5rem", rise: 56, float: 10 },
] as const;

/**
 * Three floating fidelity cards ("clarity cards") — each holds one
 * compliance metric. The outer layer enters in a diagonal cascade at hero
 * load (top-right first, filling backward); the inner layer breathes on
 * independent durations so the trio never looks synchronized.
 * GPU-only transforms.
 */
export function FloatingStatCards() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {heroStats.map((s, i) => {
        const { top, right, x, rise, float } = CARD_LAYOUT[i];
        const delay = 0.65 + i * 0.1; // cards follow headline

        if (reducedMotion) {
          return (
            <motion.div
              key={s.label}
              className="absolute rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md"
              style={{ top, right, translateX: x }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: duration.micro }}
            >
              <CardFace value={s.value} label={s.label} sublabel={s.sublabel} />
            </motion.div>
          );
        }

        return (
          /* Outer layer: one-time entrance, where the card rests dead-center
             of its float loop's amplitude (±4px). */
          <motion.div
            key={s.label}
            className="absolute"
            style={{ top, right, x }}
            initial={{ opacity: 0, y: rise }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: duration.entrance, ease: easeOut }}
          >
            {/* Inner layer: endless, symmetric float — a true loop with no
                seam, independent of when the entrance finished. */}
            <motion.div
              className="hero-float rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md"
              animate={{ y: [0, -4, 0, 4, 0] }}
              transition={{
                duration: float,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            >
              <CardFace value={s.value} label={s.label} sublabel={s.sublabel} />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function CardFace({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="text-left">
      <p className="font-display text-3xl leading-tight text-text-inverse">
        {value}
      </p>
      <p className="mt-2 text-body-s text-text-inverse">{label}</p>
      <p className="mt-0.5 text-caption text-text-inverse-muted">{sublabel}</p>
    </div>
  );
}
