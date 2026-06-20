import { useMemo, useState } from "react";
import { CATEGORIES, toCategoryLabel } from "../constants/categories";

const AddPlace = () => {
  const initialState = {
    name: "",
    category: "cafe",
    description: "",
    images: [""],
    address: "",
    rating: 0,
    tags: "",
    isTrending: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [categoryOptions] = useState(CATEGORIES);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateField = (name, value) => {
    if (name === "name") {
      if (!value || value.trim().length < 2) return "Name must be at least 2 characters.";
    }
    if (name === "description") {
      if (value && value.length > 280) return "Description should be under 280 characters.";
    }
    if (name === "address") {
      if (!value || value.trim().length < 5) return "Please provide a valid address.";
    }
    if (name === "rating") {
      const n = Number(value);
      if (Number.isNaN(n) || n < 0 || n > 5) return "Rating must be between 0 and 5.";
    }
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated.length ? updated : [""] });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMsg("");
  setErrorMsg("");

  // validate all relevant fields
  const nextErrors = {
    name: validateField("name", formData.name),
    description: validateField("description", formData.description),
    address: validateField("address", formData.address),
    rating: validateField("rating", formData.rating),
  };
  setErrors(nextErrors);
  const hasError = Object.values(nextErrors).some((m) => m);
  if (hasError) return;

  const payload = {
    ...formData,
    tags: formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    images: formData.images.filter(Boolean),
  };

  try {
    setIsSubmitting(true);
    const res = await fetch("https://luvo-backend.vercel.app/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to add place");

    const data = await res.json();
    console.log("Place added:", data);

    setSuccessMsg("Place added successfully.");
    // reset the form to initial empty state
    setFormData(initialState);
  } catch (err) {
    console.error(err);
    setErrorMsg("Error adding place. Please try again.");
  } finally {
    setIsSubmitting(false);
    // auto-clear success after a short delay
    setTimeout(() => setSuccessMsg(""), 2500);
  }
};


  const tagChips = useMemo(() =>
    formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  [formData.tags]);

  const RatingStars = ({ value, onChange }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          type="button"
          key={i}
          onClick={() => onChange(i)}
          className={`text-xl transition ${i <= Math.round(value) ? "text-yellow-500" : "text-gray-300"}`}
          aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4 pt-12 pb-14">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl hover-elevate"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-light text-gray-900">Add New Place</h2>
            <p className="mt-1 text-xs text-gray-500">Curated entries keep quality high</p>
          </div>
          {isSubmitting && (
            <span className="text-xs text-gray-500">Saving…</span>
          )}
        </div>

        {successMsg && (
          <div className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Place Name</label>
            <input
              name="name"
              placeholder="e.g. Blue Tokai Coffee"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 focus:border-gray-400 focus:bg-white focus:outline-none"
              required
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 focus:border-gray-400 focus:bg-white focus:outline-none"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {toCategoryLabel(c)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-700">Rating</label>
            <div className="mt-2 flex items-center gap-3">
              <RatingStars
                value={formData.rating}
                onChange={(v) => setFormData((p) => ({ ...p, rating: v }))}
              />
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-20 rounded-lg border border-gray-200 bg-gray-50 p-2 text-xs focus:border-gray-400 focus:bg-white focus:outline-none"
              />
            </div>
            {errors.rating && (
              <p className="mt-1 text-xs text-red-600">{errors.rating}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Short Description</label>
            <textarea
              name="description"
              placeholder="What makes this place special?"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 focus:border-gray-400 focus:bg-white focus:outline-none"
              rows={3}
            />
            <div className="flex items-center justify-between">
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">{formData.description.length}/280</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Images</label>
            <div className="mt-2 space-y-2">
              {formData.images.map((img, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    placeholder="Image URL"
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-2 focus:border-gray-400 focus:bg-white focus:outline-none"
                  />
                  {img && img.startsWith("http") && (
                    <img
                      src={img}
                      alt="preview"
                      className="h-10 w-10 rounded-lg object-cover border"
                    />
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="rounded-lg border px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                + Add another image
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Address</label>
            <input
              name="address"
              placeholder="Full address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 focus:border-gray-400 focus:bg-white focus:outline.none"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-600">{errors.address}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Tags</label>
            <input
              name="tags"
              placeholder="Type and separate with commas"
              value={formData.tags}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 focus:border-gray-400 focus:bg-white focus:outline-none"
            />
            {!!tagChips.length && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tagChips.map((t, i) => (
                  <span key={`${t}-${i}`} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Trending</label>
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, isTrending: !p.isTrending }))}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition border ${formData.isTrending ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"}`}
              aria-pressed={formData.isTrending}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${formData.isTrending ? "translate-x-5" : "translate-x-1"}`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-gray-900 px-5 py-2 text-white text-sm transition hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding…" : "Add Place"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlace;
