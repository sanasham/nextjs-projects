import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, useRouter, routeToHash, type Route } from "@/spa/router";

/** Harness that renders the current route name + params + a link to click. */
function RouteProbe() {
  const { route, navigate } = useRouter();
  return (
    <div>
      <span data-testid="route-name">{route.name}</span>
      <span data-testid="route-slug">{route.params.slug ?? ""}</span>
      <span data-testid="route-cat">{route.params.cat ?? ""}</span>
      <span data-testid="route-q">{route.params.q ?? ""}</span>
      <button data-testid="go-product" onClick={() => navigate("/product/andhra-mango-pickle")}>
        product
      </button>
      <button data-testid="go-catalog-cat" onClick={() => navigate("/products?cat=pickles&q=mango")}>
        catalog-filter
      </button>
      <button data-testid="go-home" onClick={() => navigate("/")}>
        home
      </button>
    </div>
  );
}

function renderWithRouter() {
  return render(
    <RouterProvider>
      <RouteProbe />
    </RouterProvider>
  );
}

beforeEach(() => {
  window.history.replaceState(null, "", "#/");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
});

describe("router — routeToHash", () => {
  it("maps routes to the expected hash fragments", () => {
    expect(routeToHash({ name: "home" })).toBe("#/");
    expect(routeToHash({ name: "catalog" })).toBe("#/products");
    expect(routeToHash({ name: "cart" })).toBe("#/cart");
    expect(routeToHash({ name: "checkout" })).toBe("#/checkout");
    expect(routeToHash({ name: "about" })).toBe("#/about");
    expect(routeToHash({ name: "contact" })).toBe("#/contact");
    expect(routeToHash({ name: "admin" })).toBe("#/admin");
    expect(routeToHash({ name: "product", params: { slug: "foo" } })).toBe(
      "#/product/foo"
    );
    expect(
      routeToHash({ name: "confirmation", params: { orderNo: "JAF-1" } })
    ).toBe("#/confirmation?orderNo=JAF-1");
  });
});

describe("router — initial route", () => {
  it("starts at home when the hash is empty", () => {
    window.history.replaceState(null, "", "#/");
    renderWithRouter();
    expect(screen.getByTestId("route-name")).toHaveTextContent("home");
  });

  it("parses a product route from the URL on load", () => {
    window.history.replaceState(null, "", "#/product/gongura-pickle");
    renderWithRouter();
    expect(screen.getByTestId("route-name")).toHaveTextContent("product");
    expect(screen.getByTestId("route-slug")).toHaveTextContent("gongura-pickle");
  });

  it("parses catalog query params (cat, q) on load", () => {
    window.history.replaceState(null, "", "#/products?cat=pickles&q=mango");
    renderWithRouter();
    expect(screen.getByTestId("route-name")).toHaveTextContent("catalog");
    expect(screen.getByTestId("route-cat")).toHaveTextContent("pickles");
    expect(screen.getByTestId("route-q")).toHaveTextContent("mango");
  });
});

describe("router — navigation", () => {
  it("updates the route name on navigate()", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.click(screen.getByTestId("go-product"));
    expect(screen.getByTestId("route-name")).toHaveTextContent("product");
    expect(screen.getByTestId("route-slug")).toHaveTextContent(
      "andhra-mango-pickle"
    );
  });

  it("updates the URL hash on navigate()", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.click(screen.getByTestId("go-product"));
    expect(window.location.hash).toBe("#/product/andhra-mango-pickle");
  });

  it("parses catalog filter params after navigation", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.click(screen.getByTestId("go-catalog-cat"));
    expect(screen.getByTestId("route-name")).toHaveTextContent("catalog");
    expect(screen.getByTestId("route-cat")).toHaveTextContent("pickles");
    expect(screen.getByTestId("route-q")).toHaveTextContent("mango");
  });

  it("navigates back to home", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.click(screen.getByTestId("go-product"));
    await user.click(screen.getByTestId("go-home"));
    expect(screen.getByTestId("route-name")).toHaveTextContent("home");
  });
});

describe("router — type coverage for Route", () => {
  it("Route type accepts all known view names", () => {
    const r: Route = { name: "home", params: {} };
    expect(r.name).toBe("home");
  });
});
