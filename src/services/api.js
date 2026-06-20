const BASE = "https://luvo-backend.vercel.app";

export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const opts = {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  };
  // Allow callers to override headers entirely
  if (options.headers) opts.headers = { ...opts.headers, ...options.headers };

  const res = await fetch(url, opts);
  return res;
}

export default apiFetch;
