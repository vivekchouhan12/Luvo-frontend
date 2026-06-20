export const CATEGORIES = ["cafe", "tourist", "event", "mall"]; 
export const CATEGORY_LABELS = {
  cafe: "Cafe",
  tourist: "Tourist",
  event: "Event",
  mall: "Mall",
};

export const toCategoryLabel = (type) => CATEGORY_LABELS[type] || String(type);

// Editorial mood subtitles for section header
export const CATEGORY_SUBTITLES = {
  cafe: "Slow coffee, conversations, and cozy corners",
  event: "What's happening today — art, music, gatherings",
  tourist: "Quiet lakes, heritage walks, timeless Bhopal",
  mall: "Urban shopping and leisure spots",
};

export const toCategorySubtitle = (type) => CATEGORY_SUBTITLES[type] || "Curated with elegance";
