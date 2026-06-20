import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toCategoryLabel } from "../constants/categories";

const PlaceOverview = () => {
  const { placeid } = useParams();
  const [place, setPlace] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://luvo-backend.vercel.app/places/${placeid}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch place");
        const data = await res.json();
        setPlace(data);
        setSelectedImage(data.images?.[0] || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (placeid) fetchPlace();
  }, [placeid]);

  // Fetch nearby places by category (excluding current place)
  useEffect(() => {
    const fetchNearby = async () => {
      if (!place?.category) return;
      try {
        const res = await fetch(`https://luvo-backend.vercel.app/places?category=${place.category}`, { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        const filtered = Array.isArray(data)
          ? data.filter((p) => p._id !== place._id).slice(0, 10)
          : [];
        setNearby(filtered);
      } catch (_) {
        // silently ignore for now
      }
    };
    fetchNearby();
  }, [place]);

  if (loading) {
    return (
      <section className="bg-neutral-50 min-h-screen pt-18 pb-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <div className="aspect-square w-full rounded-3xl skeleton" />
            <div className="mt-6 flex justify-center gap-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="h-20 w-20 rounded-xl skeleton" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-64 skeleton rounded" />
            <div className="h-4 w-24 skeleton rounded" />
            <div className="h-20 w-full skeleton rounded" />
            <div className="h-10 w-40 skeleton rounded" />
          </div>
        </div>
      </section>
    );
  }
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!place) return <div className="text-center py-20">Place not found</div>;

  const item = place;
  const details = place.images || [];
  const area = (place.address || "").split(",")[0];

  const addToWishlist = async () => {
    try {
      const res = await fetch('https://luvo-backend.vercel.app/places/wishlist', {
        method: 'POST',
        credentials: 'include', // send session cookie so backend can read req.session
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId: place._id }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to add to wishlist');
      }
      // optional: handle success (toast/visual feedback)
    } catch (error) {
      console.error('Add to wishlist failed:', error);
    }
    alert('Place added to your Visit list!');
  };

  const renderStars = (rating = 0) => (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? 'currentColor' : 'none'} stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="bg-neutral-50 min-h-screen">
      {/* HERO SECTION */}
      <div className="relative w-full">
        <div className="h-[52vh] sm:h-[60vh] w-full overflow-hidden">
          <img src={selectedImage || details[0]} alt={item.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3">
              {item.isTrending && (
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">Trending</span>
              )}
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white drop-shadow-sm">{item.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-2">
                {renderStars(item.rating)}
                <span className="font-medium">{item.rating ?? 'N/A'}</span>
              </div>
              <span className="text-white/80">{toCategoryLabel(item.category)}</span>
              <span className="text-white/80">{area}</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* About */}
        <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900">About</h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-base sm:text-lg max-w-4xl">
            {item.description || "A curated spot in Bhopal. Explore the ambiance, local culture, and nearby gems that make this place worth visiting."}
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Card */}
          <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"/></svg>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Address</h3>
                <p className="mt-1 text-gray-600">{item.address}</p>
                <a
                  href={item.location && item.location.lat && item.location.lng
                    ? `https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address || item.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-gray-700 hover:text-gray-900"
                >
                  View on Map →
                </a>
              </div>
            </div>
          </div>

          {/* Tags Card */}
          <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h6l6 6-6 6H7l-6-6 6-6Z"/></svg>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">Tags</h3>
                {item.tags && item.tags.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.slice(0, 12).map((t, i) => (
                      <span key={`${t}-${i}`} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">{t}</span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-gray-500">Curated spot with a calm vibe.</p>
                )}
              </div>
            </div>
          </div>

          {/* Best Time Card (optional) */}
          {item.bestTime && (
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v2m6 7h2M4 12H2m15.536-7.536 1.414 1.414M4.05 4.05 5.464 5.464M12 19v2m7.536-1.536-1.414 1.414M5.464 18.536 4.05 19.95"/></svg>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Best Time to Visit</h3>
                  <p className="mt-1 text-gray-600">{item.bestTime}</p>
                </div>
              </div>
            </div>
          )}

          {/* Timing / Entry Card (optional) */}
          {item.timing && (
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v5l3 2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20Z"/></svg>
                <div>
                  <h3 className="text.sm font-medium text-gray-900">Timing / Entry</h3>
                  <p className="mt-1 text-gray-600">{item.timing}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        {details.length > 0 && (
          <div className="rounded-3xl bg-white shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-medium text-gray-900">Gallery</h2>
            <div className="mt-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-4">
                {details.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`snap-start min-w-[200px] h-[140px] rounded-2xl overflow-hidden bg-white shadow-sm border transition ${selectedImage === img ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={img} alt={`Gallery ${idx+1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
                {Array.from({ length: Math.max(0, 6 - details.length) }).map((_, i) => (
                  <div key={`ph-${i}`} className="snap-start min-w-[200px] h-[140px] rounded-2xl bg-gray-100 border border-gray-200" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={addToWishlist}
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Add to Wishlist
          </button>
          <a
            href={item.location && item.location.lat && item.location.lng
              ? `https://www.google.com/maps/search/?api=1&query=${item.location.lat},${item.location.lng}`
              : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address || item.name)}`}
            target="_blank" rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-500 transition"
          >
            View on Map
          </a>
        </div>

        {/* Nearby Places */}
        {!!nearby.length && (
          <div className="pt-4">
            <h2 className="text-lg font-medium text-gray-900">Nearby Places</h2>
            <div className="mt-4 overflow-x-auto scrollbar-hide">
              <ul className="flex gap-6 snap-x snap-mandatory">
                {nearby.map((p) => (
                  <li key={p._id} className="snap-start min-w-[80%] sm:min-w-[320px] lg:min-w-[380px] rounded-3xl bg-white shadow-sm transition hover:shadow-md">
                    <a href={`/place/${p._id}`} className="block">
                      <div className="relative overflow-hidden rounded-3xl">
                        <img src={p.images?.[0]} alt={p.name} className="h-56 w-full object.cover transition-transform duration-500 group-hover:scale-105" />
                        {p.isTrending && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">Trending</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-medium text-gray-900 line-clamp-1">{p.name}</h3>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          {renderStars(p.rating)}
                          <span className="text-gray-700">{p.rating ?? 'N/A'}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlaceOverview;
