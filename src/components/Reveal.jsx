import { motion } from "framer-motion";

/**
 * Reveal: fades/slides content in when it enters the viewport.
 * Props: as="div", y=16, delay=0, duration=0.6, once=true
 */
export default function Reveal({
  as: Tag = "div",
  children,
  y = 16,
  delay = 0,
  duration = 0.6,
  once = true,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay }}
      className={className}
      as={Tag}
    >
      {children}
    </motion.div>
  );
}
