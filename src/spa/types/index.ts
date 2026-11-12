export type Locale = "en" | "te";

export type CategoryId =
  | "pickles"
  | "snacks"
  | "spices"
  | "sweets";

export interface Category {
  id: CategoryId;
  slug: string;
  nameEn: string;
  nameTe: string;
  taglineEn: string;
  taglineTe: string;
  image: string;
}

export interface WeightVariant {
  id: string;
  label: string; // e.g. "250 g"
  grams: number;
  price: number; // INR
  mrp: number; // INR
}

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameTe: string;
  descEn: string;
  descTe: string;
  categoryId: CategoryId;
  image: string;
  gallery: string[];
  variants: WeightVariant[];
  defaultVariantId: string;
  ingredientsEn: string[];
  ingredientsTe: string[];
  allergenEn: string;
  allergenTe: string;
  shelfLifeEn: string;
  shelfLifeTe: string;
  storageEn: string;
  storageTe: string;
  inStock: boolean;
  stockQty: number;
  bestseller: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CheckoutForm {
  name: string;
  mobile: string;
  email: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  paymentMethod: "cod" | "upi-demo" | "card-demo";
  notes?: string;
}
