export type Wallpaper = {
  slug: string;
  title: string;
  collection: "City Lights" | "Romance" | "Solitude";
  price: number;
  blurb: string;
  story: string;
  palette: { name: string; hex: string }[];
};

export const wallpapers: Wallpaper[] = [
  {
    slug: "blue-hour",
    title: "Blue Hour",
    collection: "City Lights",
    price: 4,
    blurb: "A walk home under lamplight, long after the rain.",
    story:
      "The street empties, the lamps come on, and the pavement turns to glass. Painted for anyone who has ever taken the long way home on purpose.",
    palette: [
      { name: "Rain Navy", hex: "#152441" },
      { name: "Lamp Gold", hex: "#E0A55C" },
      { name: "Wet Slate", hex: "#42506A" },
      { name: "Fog", hex: "#8B97A8" },
    ],
  },
  {
    slug: "the-last-train",
    title: "The Last Train",
    collection: "Solitude",
    price: 4,
    blurb: "A vending machine hum, a paper cup, and the 1:42 to nowhere.",
    story:
      "The platform is empty except for the vending machine and one man who isn't ready to go home. Every light in this piece is a small act of company.",
    palette: [
      { name: "Platform Blue", hex: "#1B2C4A" },
      { name: "Vending Ice", hex: "#BFD4E8" },
      { name: "Sodium Light", hex: "#D99A4E" },
      { name: "Trench", hex: "#20242F" },
    ],
  },
  {
    slug: "candlelight-waltz",
    title: "Candlelight Waltz",
    collection: "Romance",
    price: 4,
    blurb: "Two figures, one umbrella, and a city lit like a birthday cake.",
    story:
      "The rain does not stop and neither do they. A love letter to the kind of evening that ruins your shoes and fixes your week.",
    palette: [
      { name: "Midnight Velvet", hex: "#1A2740" },
      { name: "Gaslight", hex: "#F0B25E" },
      { name: "Rust Scarf", hex: "#A84A34" },
      { name: "Cobblestone", hex: "#3C3B44" },
    ],
  },
  {
    slug: "the-last-waltz",
    title: "The Last Waltz",
    collection: "Romance",
    price: 4,
    blurb: "The party is ending. She is only just beginning.",
    story:
      "String lights overhead, a borrowed phone held high, and a red dress that refuses to sit this one out. Energy, captured mid-turn.",
    palette: [
      { name: "Dance Crimson", hex: "#A72E2A" },
      { name: "Ink Navy", hex: "#131C33" },
      { name: "Bulb Amber", hex: "#F5C06B" },
      { name: "Floor Rose", hex: "#D98A6E" },
    ],
  },
  {
    slug: "paper-moon",
    title: "Paper Moon",
    collection: "Solitude",
    price: 4,
    blurb: "A window seat, a sleeping city, and rain that won't commit.",
    story:
      "Somewhere between two stations, a girl watches the city smear into streaks of blue. This is the quietest piece in the collection.",
    palette: [
      { name: "Window Blue", hex: "#1C3550" },
      { name: "City Bokeh", hex: "#7FB2D6" },
      { name: "Carriage Wine", hex: "#752F33" },
      { name: "Skin Warmth", hex: "#C08A6E" },
    ],
  },
  {
    slug: "rooftop-reverie",
    title: "Rooftop Reverie",
    collection: "Solitude",
    price: 4,
    blurb: "The whole city asleep, and one girl wide awake above it.",
    story:
      "String lights, a crescent moon, and a thousand windows that all belong to someone else. A reminder that being alone can be beautiful.",
    palette: [
      { name: "Night Sky", hex: "#0E1730" },
      { name: "Wool Cream", hex: "#D9C9B4" },
      { name: "Crescent", hex: "#F4D79B" },
      { name: "Town Warmth", hex: "#B07A45" },
    ],
  },
  {
    slug: "neon-promenade",
    title: "Neon Promenade",
    collection: "City Lights",
    price: 4,
    blurb: "The old town dripping gold after a downpour.",
    story:
      "Spires, shop lights, wet stone, and two heads bent together beneath an umbrella. It is a postcard from a city that never quite existed.",
    palette: [
      { name: "Rain Indigo", hex: "#18243D" },
      { name: "Lantern Gold", hex: "#E9A94C" },
      { name: "Rose Stone", hex: "#8F3F44" },
      { name: "Wet Shale", hex: "#5A5E6B" },
    ],
  },
  {
    slug: "sunflowers-at-midnight",
    title: "Sunflowers at Midnight",
    collection: "Romance",
    price: 4,
    blurb: "A bouquet too bright for this hour, and a smile to match.",
    story:
      "He walked out of the flower shop after closing and decided the night was not over. The warmest piece we have made — literally.",
    palette: [
      { name: "Starry Navy", hex: "#111A33" },
      { name: "Marigold", hex: "#E8A63B" },
      { name: "Suit Black", hex: "#1D1B20" },
      { name: "Brick", hex: "#9A5B3F" },
    ],
  },
];

export const collections = ["All", "City Lights", "Romance", "Solitude"] as const;

export const collectionPrice = 19;
export const studioPrice = 59;

export function imagePath(slug: string, size: "full" | "card" | "thumb" = "card") {
  return `/img/wallpapers/${slug}-${size}.webp`;
}

export function money(value: number) {
  return `$${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}
