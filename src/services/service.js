export const categories = async () => {
  const response = await fetch("https://luvo-backend.vercel.app/home");
  const items = await response.json();
  return items.categories;
};





