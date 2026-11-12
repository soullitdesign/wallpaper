export type Wallpaper = {
  slug: string;
  title: string;
  subtitle: string;
  collection: "Crimson Hour" | "Midnight Streets" | "Quiet Rooms";
  tags: string[];
  /** Base price in USD cents for the personal licence. */
  price: number;
  compareAt?: number;
  featured?: boolean;
  /** Human readable story shown in the detail drawer. */
  story: string;
  /** Dominant colours, sampled from the artwork itself. */
  palette: string[];
  accent: string;
};

export const wallpapers: Wallpaper[] = [
  {
    slug: "the-last-waltz",
    title: "The Last Waltz",
    subtitle: "A room full of strangers, one pair of eyes",
    collection: "Crimson Hour",
    tags: ["Romance", "Night", "Figure"],
    price: 600,
    compareAt: 900,
    story:
      "The floor tilts, the string lights blur, and for one frame the whole party belongs to her. Paint the night you wish you had stayed out for.",
    palette: ["#070B1C", "#1C274B", "#882A27", "#D99C75"],
    accent: "#882A27",
  },
  {
    slug: "sunflowers-at-midnight",
    title: "Sunflowers at Midnight",
    subtitle: "He waited past the last lamp going out",
    collection: "Crimson Hour",
    tags: ["Romance", "Hope", "Figure"],
    price: 600,
    compareAt: 900,
    story:
      "A coat too thin for the cold, a bouquet too bright for the hour. One small act of ridiculous, unashamed hope.",
    palette: ["#0A0D1F", "#151D43", "#986E4F", "#F0C86A"],
    accent: "#D99C75",
  },
  {
    slug: "neon-promenade",
    title: "Neon Promenade",
    subtitle: "One umbrella, two shadows",
    collection: "Midnight Streets",
    tags: ["Couple", "Rain", "City"],
    price: 600,
    story:
      "Rain turns every street into a mirror and every mirror into a slow, glowing walk home.",
    palette: ["#0D142F", "#1C274B", "#D99C75", "#8B5E60"],
    accent: "#D99C75",
  },
  {
    slug: "rooftop-reverie",
    title: "Rooftop Reverie",
    subtitle: "The city, keeping you company",
    collection: "Quiet Rooms",
    tags: ["Solitude", "City", "Night"],
    price: 600,
    compareAt: 900,
    featured: true,
    story:
      "Half a million windows lit and not one of them yours yet. Somehow that is the comforting part.",
    palette: ["#070B1C", "#1C274B", "#D99C75", "#583E54"],
    accent: "#D99C75",
  },
  {
    slug: "the-last-train",
    title: "The Last Train",
    subtitle: "Nobody left on the platform but you",
    collection: "Midnight Streets",
    tags: ["Solitude", "Travel", "Noir"],
    price: 600,
    story:
      "Vending machine light, cold coffee, and the particular peace of a station at 1 a.m. when the city has finally stopped talking.",
    palette: ["#0A0D1F", "#1C274B", "#3D5A8C", "#D99C75"],
    accent: "#3D5A8C",
  },
  {
    slug: "candlelight-waltz",
    title: "Candlelight Waltz",
    subtitle: "Crimson silk in an empty hall",
    collection: "Crimson Hour",
    tags: ["Romance", "Dance", "Candlelight"],
    price: 600,
    compareAt: 900,
    story:
      "Moonlight through arched glass, a single candle left burning, and a dance no one else was invited to watch.",
    palette: ["#070B1C", "#1C274B", "#882A27", "#D99C75"],
    accent: "#882A27",
  },
  {
    slug: "blue-hour",
    title: "Blue Hour",
    subtitle: "The last honest light of the day",
    collection: "Midnight Streets",
    tags: ["Solitude", "Rain", "City"],
    price: 600,
    story:
      "That narrow window after sunset when the streetlights are not quite winning and the sky is still deciding.",
    palette: ["#070818", "#151D43", "#1C274B", "#D99C75"],
    accent: "#151D43",
  },
  {
    slug: "paper-moon",
    title: "Paper Moon",
    subtitle: "A window, a book, a city going by",
    collection: "Quiet Rooms",
    tags: ["Solitude", "Travel", "Rain"],
    price: 600,
    story:
      "Streaking lights on wet glass, a scarf that smells like someone else, and a chapter you have read three times.",
    palette: ["#0A0D1F", "#1C274B", "#882A27", "#D99C75"],
    accent: "#D99C75",
  },
];

export const collections = ["All", "Crimson Hour", "Midnight Streets", "Quiet Rooms"] as const;

/** Bundle: any 3 wallpapers for this price (cents). */
export const bundlePrice = 1200;

export type Licence = {
  id: "personal" | "extended";
  name: string;
  priceMultiplier: number;
  blurb: string;
  perks: string[];
  maxSeats: string;
};

export const licences: Licence[] = [
  {
    id: "personal",
    name: "Personal",
    priceMultiplier: 1,
    blurb: "For your own phone, tablet, desktop and lock screen.",
    perks: [
      "5K files for phone, tablet & desktop",
      "All crops: 9:16, 16:10, 4:3, iPad",
      "Printable poster size included",
      "Personal use, non-commercial",
    ],
    maxSeats: "1 device household",
  },
  {
    id: "extended",
    name: "Extended",
    priceMultiplier: 2.4,
    blurb: "For creators, studios and brands who want to use the art commercially.",
    perks: [
      "Everything in Personal",
      "Commercial use in your own projects",
      "Social media, print, video & merchandise",
      "Signed licence certificate PDF",
    ],
    maxSeats: "Unlimited within your studio",
  },
];

export function getWallpaper(slug: string) {
  return wallpapers.find((w) => w.slug === slug);
}

export function money(cents: number) {
  const whole = Number.isInteger(cents / 100);
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    // "$6" for round prices, "$14.40" whenever there are cents to show.
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  });
}

/** Cents → clean label like "$6" or "$14.40". */
export function priceLabel(cents: number) {
  return money(cents);
}
