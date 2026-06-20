import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch wishlist from server
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("https://luvo-backend.vercel.app/places/wishlist", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setItems(data.wishlist || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove item and delete from backend
  const removeItem = async (itemId) => {
    // optimistic update
    const prevItems = items;
    setItems((prev) => prev.filter((item) => item._id !== itemId));
    try {
      const res = await fetch(`https://luvo-backend.vercel.app/places/wishlist/${itemId}` , {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to remove item');
      }
      // optional: sync with server response
      const data = await res.json().catch(() => ({}));
      if (Array.isArray(data.wishlist) && data.wishlist.length && data.wishlist[0] && data.wishlist[0]._id) {
        setItems(data.wishlist);
      }
    } catch (err) {
      // rollback on error
      setItems(prevItems);
      setError(err.message || 'Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {[1,2,3].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl bg-white shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl skeleton" />
                  <div className="space-y-2">
                    <div className="h-4 w-40 skeleton rounded" />
                    <div className="h-3 w-24 skeleton rounded" />
                  </div>
                </div>
                <div className="h-4 w-16 skeleton rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {  
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-10">
          Your Wishlist
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-500 text-lg">
            Your list is calm… almost too calm.
          </p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between p-5 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={
                      (item.images && item.images.length > 0
                        ? item.images[0]
                        : item.image) ||
                      "/placeholder.png"
                    }
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Saved destination
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item._id)}
                  className="mt-4 md:mt-0 text-sm font-medium text-red-500 hover:text-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            to="/"
            className="inline-block text-sm tracking-wide text-gray-600 hover:text-black transition"
          >
            ← Continue Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
