import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Auth.jsx";
import { useContext } from "react";
import { CATEGORIES, toCategoryLabel, toCategorySubtitle } from "../constants/categories";

const Category = () => {
  const { isLoggedIn} = useContext(AuthContext);
  const { categoryType } = useParams(); // /category/:categoryType
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Minimal UI: curated-first experience, no explicit filters on the page
  const [filterTrending] = useState(false);
  const [sortBy] = useState("rating-desc");

  // Derived list must be computed before any conditional returns to keep hooks order stable
  const processedPlaces = useMemo(() => {
    let list = [...places];
    if (filterTrending) list = list.filter((p) => p.isTrending);
    switch (sortBy) {
      case "rating-asc":
        list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "name-asc":
        list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        break;
      case "name-desc":
        list.sort((a, b) => String(b.name).localeCompare(String(a.name)));
        break;
      default: // rating-desc
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [places, filterTrending, sortBy]);

  useEffect(() => { 
    const fetchPlaces = async () => {
      try {
        setLoading(true); 
        if (!CATEGORIES.includes(categoryType)) {
          throw new Error("Unknown category");
        }
        const res = await fetch(
          `https://luvo-backend.vercel.app/places?category=${categoryType}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch places");
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [categoryType]);

  const skeletonCards = new Array(8).fill(null);
  if (loading) {
    return (
      <section className="bg-neutral-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-20">
          {/* Section header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-light capitalize text-gray-900 tracking-tight">
                {toCategoryLabel(categoryType)}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {toCategorySubtitle(categoryType)}
              </p>
            </div>
            <Link to={`/category/${categoryType}`} className="text-sm text-gray-600 link-underline hidden sm:block">
              View all →
            </Link>
          </div>

          {/* Horizontal skeleton list */}
          <div className="mt-10 overflow-x-auto scrollbar-hide">
            <ul className="flex gap-6 snap-x snap-mandatory">
              {skeletonCards.map((_, i) => (
                <li key={i} className="snap-start min-w-[82%] sm:min-w-[360px] lg:min-w-[420px] rounded-3xl bg-white shadow-sm">
                  <div className="h-56 w-full skeleton rounded-3xl" />
                  <div className="p-5 space-y-2">
                    <div className="h-4 w-2/3 skeleton rounded" />
                    <div className="h-3 w-1/2 skeleton rounded" />
                    <div className="h-3 w-1/3 skeleton rounded" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
      </div>
    );


  const renderStars = (rating = 0) => (
    <div className="flex items-center justify-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <span
          key={i}
          style={{ color: i <= Math.round(rating) ? "var(--brand)" : undefined }}
          className={i <= Math.round(rating) ? "" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <section className="bg-neutral-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-20">
        {/* Section header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-light capitalize text-gray-900 tracking-tight">
              {toCategoryLabel(categoryType)}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {toCategorySubtitle(categoryType)}
            </p>
          </div>
          <Link to={`/category/${categoryType}`} className="text-sm text-gray-600 link-underline hidden sm:block">
            View all →
          </Link>
        </div>

        {/* Horizontal curated list */}
        {processedPlaces.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-700">No curated places found.</p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto scrollbar-hide">
            <ul className="flex gap-6 snap-x snap-mandatory">
              {processedPlaces.map((place) => (
                <li
                  key={place._id}
                  className="snap-start group min-w-[85%] sm:min-w-[360px] lg:min-w-[420px] rounded-3xl bg-white shadow-sm transition duration-500 hover:shadow-lg hover-elevate"
                >
                  <Link to={isLoggedIn ? `/place/${place._id}` : "/login"} className="block">
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        src={place.images?.[0]}
                        alt={place.name}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {place.isTrending && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
                          Trending
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                        {place.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {place.address}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        {renderStars(place.rating)}
                        <span className="text-gray-700">{place.rating ?? "N/A"}</span>
                      </div>
                      {Array.isArray(place.tags) && place.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {place.tags.slice(0, 2).map((t, i) => (
                            <span key={`${t}-${i}`} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
