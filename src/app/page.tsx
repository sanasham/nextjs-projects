import StoreClient from "./StoreClient";
import { products } from "@/spa/data/products";
import { categories } from "@/spa/data/categories";
import { recipeVideos } from "@/spa/data/recipes";
import { siteConfig } from "@/spa/config/site";

/**
 * SEO crawlable content.
 *
 * This app is a hash-routed SPA (#/products, #/recipes …), so search engines
 * cannot reliably crawl individual pages as separate URLs. The <noscript>
 * block below is server-rendered in the HTML source and is the primary
 * crawlable content for Google — it lists every product, category, recipe
 * video and FAQ so the full catalogue is indexable.
 *
 * Keep this in sync with the data files; it is generated dynamically.
 */
export default function Home() {
  return (
    <>
      <StoreClient />
      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
          <h1>Devi Pickles — Homemade Andhra Pickles, Spice Powders, Snacks &amp; Sweets</h1>
          <p>
            Devi Pickles offers homemade veg &amp; non-veg Andhra pickles, spice
            powders, traditional snacks and festive sweets — made in small
            batches with groundnut oil &amp; organic mirchi powder. No
            preservatives. FSSAI Reg. No: {siteConfig.fssaiRegNo}. Order online
            with pan-India delivery. Free shipping on orders above ₹999.
          </p>

          {/* ── Categories ─────────────────────────────────────── */}
          <h2>Shop by Category</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <strong>{c.nameEn}</strong> ({c.nameTe}) — {c.taglineEn}.{" "}
                {products.filter((p) => p.categoryId === c.id).length} products.
              </li>
            ))}
          </ul>

          {/* ── All products with prices ───────────────────────── */}
          {categories.map((c) => {
            const catProducts = products.filter((p) => p.categoryId === c.id);
            return (
              <section key={c.id}>
                <h2>{c.nameEn} — {c.nameTe} ({catProducts.length} items)</h2>
                <ul>
                  {catProducts.map((p) => {
                    const pricePerKg = p.variants.find((v) => v.grams === 1000)?.price ?? p.variants[0].price;
                    return (
                      <li key={p.id}>
                        {p.nameEn} ({p.nameTe}) — ₹{pricePerKg}/kg
                        {p.bestseller ? " [Bestseller]" : ""}
                        {p.isNew ? " [New]" : ""}. {p.descEn}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}

          {/* ── How do we make? recipe videos ──────────────────── */}
          <h2>How do we make? — Recipe Video Guides</h2>
          <p>
            Watch step-by-step video guides for making each pickle, spice
            powder, snack and sweet the traditional Andhra way. {recipeVideos.length}{" "}
            recipe videos available.
          </p>
          <ul>
            {recipeVideos.slice(0, 20).map((v) => (
              <li key={v.id}>
                {v.titleEn} — {v.durationLabel}. {v.descEn}
              </li>
            ))}
            <li>…and {Math.max(0, recipeVideos.length - 20)} more recipe videos.</li>
          </ul>

          {/* ── FAQ ───────────────────────────────────────────── */}
          <h2>Frequently Asked Questions</h2>
          <h3>Are Devi Pickles homemade?</h3>
          <p>
            Yes. All pickles, spice powders, snacks and sweets are homemade in
            small batches using traditional Telugu recipes, groundnut oil and
            organic mirchi powder. No preservatives are used.
          </p>
          <h3>Which types of pickles are available?</h3>
          <p>
            We offer {products.filter((p) => p.categoryId === "pickles").length} pickles
            including veg pickles (mango/avakaya, tomato, gongura, amla, ginger,
            lemon, coriander, cauliflower, drumstick, bitter gourd, tamarind,
            mixed veg) and non-veg pickles (chicken boneless, chicken with bone,
            gongura chicken, prawns, fish, mutton boneless, mutton with bone).
            Non-veg pickles are made to order with a 2-3 day lead time.
          </p>
          <h3>Do you deliver across India?</h3>
          <p>
            Yes, we ship pan-India. Free shipping on orders above ₹999; a flat
            ₹79 shipping fee applies below that. Estimated delivery is 3-6
            business days. You can also order via WhatsApp on{" "}
            {siteConfig.contactPhone}.
          </p>
          <h3>What is the FSSAI registration number?</h3>
          <p>
            Our FSSAI Reg. No. is {siteConfig.fssaiRegNo}. Proprietor:{" "}
            {siteConfig.proprietor}. We are located at KPHB Colony, 3rd Phase,
            Kukatpally, Hyderabad, Telangana - 500072.
          </p>
          <h3>Do you sell spice powders and snacks too?</h3>
          <p>
            Yes. We sell {products.filter((p) => p.categoryId === "spices").length} spice
            powders (sambar, garam masala, idli karam, rasam, curry leaf,
            groundnut, sesame, mint chilli, coriander chilli, drumstick leaves),{" "}
            {products.filter((p) => p.categoryId === "snacks").length} traditional
            snacks (mixture, murukulu, chakkilu, chegodilu, karapusa, borugula
            mixture, atukula mixture, kakarakaya vadiyalu), and{" "}
            {products.filter((p) => p.categoryId === "sweets").length} festive sweets
            (laddus, ariselu, kajjikayalu, kalakand and more).
          </p>

          {/* ── Contact ────────────────────────────────────────── */}
          <h2>Contact &amp; Address</h2>
          <p>
            Prop: {siteConfig.proprietor}<br />
            Phone / WhatsApp: {siteConfig.contactPhone}<br />
            Email: {siteConfig.contactEmail}<br />
            Address: {siteConfig.addressLine}<br />
            FSSAI Reg. No: {siteConfig.fssaiRegNo}<br />
            Business Hours: {siteConfig.businessHours}
          </p>
          <p>
            Free shipping on orders above ₹999. Pan-India delivery. Order online
            or via WhatsApp. Search for homemade Andhra pickles, avakaya pickle,
            gongura pickle, chicken pickle, mutton pickle, prawns pickle,
            idli karam powder, sambar powder, murukulu, Andhra mixture, ariselu,
            boondi laddu, kajjikayalu online in India.
          </p>
        </div>
      </noscript>
    </>
  );
}
