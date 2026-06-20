import { apiFetch } from "./api";

export const categories = async () => {
  const response = await apiFetch("/home");
  if (!response.ok) throw new Error("Failed to fetch categories");
  const items = await response.json();
  return items.categories;
};





