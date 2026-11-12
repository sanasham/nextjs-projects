import type { Category } from "@/spa/types";

export const categories: Category[] = [
  {
    id: "pickles",
    slug: "pickles",
    nameEn: "Pickles",
    nameTe: "ఊరగాయలు",
    taglineEn: "Veg & Non-Veg, sun-cured Andhra classics",
    taglineTe: "శాకాహార & మాంసాహార ఆంధ్ర వంటకాలు",
    image: "/products/cat-pickles.png",
  },
  {
    id: "spices",
    slug: "spices",
    nameEn: "Spice Powders",
    nameTe: "కారం పొడులు",
    taglineEn: "Stone-ground aromatic blends",
    taglineTe: "రోలుతో నూరిన సువాసన కలిగినవి",
    image: "/products/cat-spices.png",
  },
  {
    id: "snacks",
    slug: "snacks",
    nameEn: "Traditional Snacks",
    nameTe: "సంప్రదాయ స్నాక్స్",
    taglineEn: "Crunchy, savoury & freshly fried",
    taglineTe: "రుచికరమైన తాజా వంటకాలు",
    image: "/products/cat-snacks.png",
  },
];

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
