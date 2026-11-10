"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";

/** Route shape: { name, params } */
export interface Route {
  name:
    | "home"
    | "catalog"
    | "product"
    | "cart"
    | "checkout"
    | "about"
    | "contact"
    | "admin"
    | "confirmation";
  params: Record<string, string>;
}

interface RouterContextValue {
  route: Route;
  navigate: (path: string) => void;
  back: () => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "").trim();
  if (!clean) return { name: "home", params: {} };
  const [path, query = ""] = clean.split("?");
  const segments = path.split("/").filter(Boolean);
  const params: Record<string, string> = {};
  if (query) {
    new URLSearchParams(query).forEach((v, k) => (params[k] = v));
  }

  if (segments.length === 0) return { name: "home", params };

  switch (segments[0]) {
    case "products":
      return { name: "catalog", params };
    case "product":
      return {
        name: "product",
        params: { slug: segments[1] ?? "" },
      };
    case "cart":
      return { name: "cart", params };
    case "checkout":
      return { name: "checkout", params };
    case "about":
      return { name: "about", params };
    case "contact":
      return { name: "contact", params };
    case "admin":
      return { name: "admin", params };
    case "confirmation":
      return {
        name: "confirmation",
        params: { orderNo: params.orderNo ?? "" },
      };
    default:
      return { name: "home", params };
  }
}

export function routeToHash(route: Partial<Route>): string {
  switch (route.name) {
    case "catalog":
      return "#/products";
    case "product":
      return `#/product/${route.params?.slug ?? ""}`;
    case "cart":
      return "#/cart";
    case "checkout":
      return "#/checkout";
    case "about":
      return "#/about";
    case "contact":
      return "#/contact";
    case "admin":
      return "#/admin";
    case "confirmation":
      return `#/confirmation?orderNo=${route.params?.orderNo ?? ""}`;
    default:
      return "#/";
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== "undefined"
      ? parseHash(window.location.hash)
      : { name: "home", params: {} }
  );

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/");
    }
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((path: string) => {
    const target = path.startsWith("#") ? path : `#${path}`;
    if (window.location.hash === target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = target;
  }, []);

  const back = useCallback(() => window.history.back(), []);

  const value = useMemo(
    () => ({ route, navigate, back }),
    [route, navigate, back]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
}

/** Hash-based link that integrates with our SPA router. */
export function Link({ to, children, className, onClick, ariaLabel, title }: LinkProps) {
  const { navigate } = useRouter();
  const href = to.startsWith("#") ? to : `#${to}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    onClick?.();
    navigate(to);
  };

  return (
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel} title={title}>
      {children}
    </a>
  );
}
