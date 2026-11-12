import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/spa/store/cartStore";

// The Zustand persist middleware reads from localStorage on store creation.
// Each test resets to a known empty state.
beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
});

describe("cart store — add", () => {
  it("adds a new item with the given quantity", () => {
    useCartStore.getState().add("p-mango-pickle", "v-500", 1);
    expect(useCartStore.getState().items).toEqual([
      { productId: "p-mango-pickle", variantId: "v-500", quantity: 1 },
    ]);
    // adding opens the cart drawer
    expect(useCartStore.getState().isOpen).toBe(true);
  });

  it("defaults quantity to 1 when omitted", () => {
    useCartStore.getState().add("p-mango-pickle", "v-500");
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it("merges quantity when the same product+variant is added again", () => {
    useCartStore.getState().add("p-mango-pickle", "v-500", 2);
    useCartStore.getState().add("p-mango-pickle", "v-500", 3);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("keeps separate line items for different variants of the same product", () => {
    useCartStore.getState().add("p-mango-pickle", "v-250", 1);
    useCartStore.getState().add("p-mango-pickle", "v-500", 1);
    expect(useCartStore.getState().items).toHaveLength(2);
  });
});

describe("cart store — remove", () => {
  it("removes the matching product+variant line", () => {
    useCartStore.getState().add("p-mango-pickle", "v-250", 1);
    useCartStore.getState().add("p-gongura-pickle", "v-500", 1);
    useCartStore.getState().remove("p-mango-pickle", "v-250");
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].productId).toBe("p-gongura-pickle");
  });

  it("leaves other lines untouched when removing one", () => {
    useCartStore.getState().add("p-mango-pickle", "v-250", 2);
    useCartStore.getState().add("p-mango-pickle", "v-500", 3);
    useCartStore.getState().remove("p-mango-pickle", "v-250");
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].variantId).toBe("v-500");
    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });

  it("is a no-op when the line does not exist", () => {
    useCartStore.getState().add("p-mango-pickle", "v-250", 1);
    useCartStore.getState().remove("nonexistent", "v-999");
    expect(useCartStore.getState().items).toHaveLength(1);
  });
});

describe("cart store — setQuantity", () => {
  it("updates the quantity of an existing line", () => {
    useCartStore.getState().add("p-mango-pickle", "v-500", 1);
    useCartStore.getState().setQuantity("p-mango-pickle", "v-500", 7);
    expect(useCartStore.getState().items[0].quantity).toBe(7);
  });

  it("removes the line when quantity is set to 0", () => {
    useCartStore.getState().add("p-mango-pickle", "v-500", 2);
    useCartStore.getState().setQuantity("p-mango-pickle", "v-500", 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("removes the line when quantity is set below 0", () => {
    useCartStore.getState().add("p-mango-pickle", "v-500", 2);
    useCartStore.getState().setQuantity("p-mango-pickle", "v-500", -3);
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

describe("cart store — clear / open / close", () => {
  it("clear removes all items", () => {
    useCartStore.getState().add("p-mango-pickle", "v-500", 1);
    useCartStore.getState().add("p-gongura-pickle", "v-500", 2);
    useCartStore.getState().clear();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("openCart / closeCart / toggleCart control the drawer state", () => {
    useCartStore.getState().closeCart();
    expect(useCartStore.getState().isOpen).toBe(false);
    useCartStore.getState().openCart();
    expect(useCartStore.getState().isOpen).toBe(true);
    useCartStore.getState().toggleCart();
    expect(useCartStore.getState().isOpen).toBe(false);
    useCartStore.getState().toggleCart();
    expect(useCartStore.getState().isOpen).toBe(true);
  });
});
