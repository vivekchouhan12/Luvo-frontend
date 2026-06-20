import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { categories as fetchCategories } from "../services/service";
import { motion, useScroll, useTransform } from "framer-motion";
import CanvasSequence from "./CanvasSequence";
import useMagnetic from "./hooks/useMagnetic";

const Content = ({
  title = "Experience the city with calm confidence",
  subtitle = "A curated guide to Bhopal — elegant, premium, and experiential. Discover cafes, events, and timeless locations without the noise.",
  ctaText = "Explore Bhopal →",
  ctaLink = "/category/tourist",
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: typeof window !== 'undefined' ? undefined : undefined });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const magneticRef = useMagnetic(0.08, 8);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative w-full overflow-visible bg-white">
      {/* Animation section with pinned hero overlay */}
      <div className="sticky top-24 min-h-screen w-full overflow-hidden">
        <CanvasSequence
          folder="/birla-images"
          prefix="ezgif-frame-"
          start={1}
          end={136}
          fps={24}
          autoplay={false}
          initialIndex={0}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />

        <div
          className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 text-center"
          ref={containerRef}
        >
          <motion.h1
            style={{
              y: titleY,
              backgroundImage: "linear-gradient(90deg, #ffffff 0%, #C9A24D 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg"
          >
            {title}
          </motion.h1>

          <motion.p
            style={{ y: subtitleY }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed drop-shadow"
          >
            <span className="text-white/90">{subtitle}</span>
          </motion.p>

          <motion.div style={{ y: ctaY }} className="mt-10 flex justify-center">
            <Link
              to={ctaLink}
              ref={magneticRef}
              className="hover-elevate rounded-full px-9 py-3 text-sm font-medium text-white shadow-md ring-1 ring-white/20"
              style={{
                backgroundImage: "linear-gradient(90deg, #C9A24D 0%, #E8C56F 100%)",
              }}
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
        {/* Subtle scroll indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-xs">Scroll</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Spacer to keep categories hidden during animation scroll */}
      <div className="h-[200vh] w-full" />

      <section className="relative z-20 bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20 sm:py-28">
            {/* Title */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-medium tracking-wide text-gray-900">Discover by Category</h2>
              <p className="mt-2 text-sm text-gray-600">Cafes · Events · Tourist Locations</p>
            </div>

            {/* Grid */}
            <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {loading && <p className="text-gray-500">Loading categories...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading &&
                categories.map((category) => (
                  <motion.div
                    key={category.type}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Link
                      to={`/category/${category.type}`}
                      className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
                    >
                      {/* Image with fixed aspect ratio */}
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 z-10 p-5">
                        <div className="inline-block rounded-xl bg-black/30 backdrop-blur-sm px-4 py-3">
                          <h3 className="text-xs uppercase tracking-widest text-white/80">
                            {category.title} · {category.count}
                          </h3>
                          <p className="mt-1 text-base font-medium text-white/95 line-clamp-2">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Content;
