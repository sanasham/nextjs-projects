import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email(),
  address: z.string().min(10),
  state: z.string().min(2),
  city: z.string().min(2),
  pincode: z.string().regex(/^\d{6}$/),
  paymentMethod: z.enum(["cod", "upi-demo", "card-demo"]),
  notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const validCheckout: CheckoutFormValues = {
  name: "Test User",
  mobile: "9876543210",
  email: "test@example.com",
  address: "12 Sample Road, near temple",
  state: "Telangana",
  city: "Hyderabad",
  pincode: "500001",
  paymentMethod: "cod",
  notes: "",
};
