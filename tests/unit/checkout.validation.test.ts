import { describe, it, expect } from "vitest";
import { checkoutSchema, validCheckout } from "@/spa/features/checkout/schema";

/** Run the schema in safe mode and return success / a field->errors map. */
function validate(values: Record<string, unknown>) {
  const result = checkoutSchema.safeParse(values);
  if (result.success) return { ok: true, errors: {} };
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0] ?? "_");
    if (!errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}

describe("checkout schema — valid input", () => {
  it("accepts the baseline valid form", () => {
    const { ok } = validate(validCheckout);
    expect(ok).toBe(true);
  });

  it("accepts all three payment methods", () => {
    for (const method of ["cod", "upi-demo", "card-demo"] as const) {
      const { ok } = validate({ ...validCheckout, paymentMethod: method });
      expect(ok).toBe(true);
    }
  });

  it("accepts an optional empty notes field", () => {
    const { ok } = validate({ ...validCheckout, notes: undefined });
    expect(ok).toBe(true);
  });
});

describe("checkout schema — name validation", () => {
  it("rejects a name shorter than 3 characters", () => {
    const { ok, errors } = validate({ ...validCheckout, name: "ab" });
    expect(ok).toBe(false);
    expect(errors.name).toBeDefined();
  });

  it("rejects an empty name", () => {
    const { ok, errors } = validate({ ...validCheckout, name: "" });
    expect(ok).toBe(false);
    expect(errors.name).toBeDefined();
  });

  it("accepts a name with 3+ characters", () => {
    const { ok } = validate({ ...validCheckout, name: "Ram" });
    expect(ok).toBe(true);
  });
});

describe("checkout schema — mobile validation", () => {
  it("rejects fewer than 10 digits", () => {
    expect(validate({ ...validCheckout, mobile: "987654" }).ok).toBe(false);
  });

  it("rejects a mobile not starting with 6-9", () => {
    expect(validate({ ...validCheckout, mobile: "5876543210" }).ok).toBe(false);
    expect(validate({ ...validCheckout, mobile: "0876543210" }).ok).toBe(false);
  });

  it("accepts a valid 10-digit mobile starting with 6-9", () => {
    expect(validate({ ...validCheckout, mobile: "9876543210" }).ok).toBe(true);
    expect(validate({ ...validCheckout, mobile: "7989225946" }).ok).toBe(true);
  });
});

describe("checkout schema — email validation", () => {
  it("rejects a malformed email", () => {
    expect(validate({ ...validCheckout, email: "not-an-email" }).ok).toBe(false);
    expect(validate({ ...validCheckout, email: "a@b" }).ok).toBe(false);
  });

  it("accepts a valid email", () => {
    expect(
      validate({ ...validCheckout, email: "customer@devipickles.com" }).ok
    ).toBe(true);
  });
});

describe("checkout schema — address validation", () => {
  it("rejects an address shorter than 10 characters", () => {
    const { ok, errors } = validate({ ...validCheckout, address: "short" });
    expect(ok).toBe(false);
    expect(errors.address).toBeDefined();
  });

  it("accepts a full address", () => {
    expect(
      validate({ ...validCheckout, address: "2-14, Main Road, Hyderabad" }).ok
    ).toBe(true);
  });
});

describe("checkout schema — pincode validation", () => {
  it("rejects a pincode that is not 6 digits", () => {
    expect(validate({ ...validCheckout, pincode: "50001" }).ok).toBe(false);
    expect(validate({ ...validCheckout, pincode: "5000001" }).ok).toBe(false);
    expect(validate({ ...validCheckout, pincode: "ABCDEF" }).ok).toBe(false);
  });

  it("accepts a 6-digit pincode", () => {
    expect(validate({ ...validCheckout, pincode: "500001" }).ok).toBe(true);
  });
});

describe("checkout schema — state & city validation", () => {
  it("rejects an empty state", () => {
    expect(validate({ ...validCheckout, state: "" }).ok).toBe(false);
  });

  it("rejects an empty city", () => {
    expect(validate({ ...validCheckout, city: "" }).ok).toBe(false);
  });
});

describe("checkout schema — payment method", () => {
  it("rejects an unknown payment method", () => {
    expect(
      validate({ ...validCheckout, paymentMethod: "netbanking" }).ok
    ).toBe(false);
  });

  it("rejects a missing payment method", () => {
    const { paymentMethod, ...rest } = validCheckout;
    void paymentMethod;
    expect(validate(rest).ok).toBe(false);
  });
});
