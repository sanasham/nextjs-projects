import { products } from "@/spa/data/products";
import type { CategoryId, Product } from "@/spa/types";

export interface RecipeVideo {
  id: string;
  productSlug: string;
  titleEn: string;
  titleTe: string;
  descEn: string;
  descTe: string;
  categoryId: CategoryId;
  poster: string;
  videoUrl: string;
  durationLabel: string;
  stepsEn: string[];
  stepsTe: string[];
}

// Placeholder sample clips (Google's public test bucket). Swap each
// videoUrl for a real recipe recording when available.
const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBubbles.mp4",
];

const DURATIONS = ["3:42", "4:18", "5:03", "3:27", "6:15", "4:51", "5:36", "3:58", "4:44", "5:20"];

// Generic recipe steps per category. The product name in the video title
// already tells the viewer what's being made, so the steps stay focused on
// technique and can apply to any product in that category.
const STEP_TEMPLATES: Record<CategoryId, { en: string[]; te: string[] }> = {
  pickles: {
    en: [
      "Wash the main ingredient thoroughly and dry completely — any moisture will spoil the pickle.",
      "Cut into uniform pieces; for mango pickles, cube with the skin on.",
      "Dry-roast mustard and fenugreek seeds, then grind to a fine powder.",
      "Mix with red chilli powder, salt and the roasted spice powder in a wide basin.",
      "Add cold-pressed groundnut oil and toss until every piece is coated.",
      "Transfer to a clean, dry ceramic jar and sun-cure for 2–3 days, stirring daily.",
      "Store in an airtight jar; use a dry spoon and refrigerate after opening.",
    ],
    te: [
      "ప్రధాన పదార్థాన్ని శుభ్రంగా కడిగి పూర్తిగా ఎండబెట్టండి — తేమ ఊరగాయను పాడుచేస్తుంది.",
      "సమాన ముక్కలుగా కోయండి; మామిడి ఊరగాయకు తొక్కతో సహా గజియండి.",
      "ఆవాలు, మెంతులు వేయించి నూరి పొడి చేయండి.",
      "ఎర్ర మిరప పొడి, ఉప్పు, వేయించిన పొడితో కలపండి.",
      "నూనె పోసి అన్ని ముక్కలకు పట్టేలా కలపండి.",
      "శుభ్రమైన జాడీలో వేసి 2-3 రోజులు ఎండలో ఉంచండి, రోజూ కలపండి.",
      "గాలి చేరని జాడీలో నిల్వ ఉంచండి; పొడి చెంచా వాడండి.",
    ],
  },
  spices: {
    en: [
      "Sun-dry or lightly warm the main ingredient to remove moisture.",
      "Dry-roast each ingredient separately on low flame until fragrant — do not burn.",
      "Let the roasted ingredients cool completely to room temperature.",
      "Grind in batches in a blender, or on a stone mortar (rolu) for authentic texture.",
      "Sieve for a finer powder if desired; mix in salt and asafoetida at the end.",
      "Store in a clean, dry, airtight jar away from sunlight.",
    ],
    te: [
      "ప్రధాన పదార్థాన్ని ఎండలో లేదా తక్కువ మంటపై వేడి చేసి తేమ తీయండి.",
      "ప్రతి పదార్థాన్ని వేరేవేరుగా సువాసన వచ్చే వరకు వేయించండి.",
      "గింజలు పూర్తిగా చల్లారే వరకు ఆగండి.",
      "మిక్సీలో లేదా రోలులో నూరి పొడి చేయండి.",
      "అవసరమైతే జల్లెడించండి; చివరలో ఉప్పు, ఇంగువ కలపండి.",
      "శుభ్రమైన పొడి డబ్బాలో సూర్యరశ్మి లేని చోట నిల్వ ఉంచండి.",
    ],
  },
  snacks: {
    en: [
      "Mix rice flour and gram flour in a wide bowl with salt and spices.",
      "Add curry leaves, sesame or cumin as the recipe calls for.",
      "Knead into a soft, pliable dough using warm water and a little oil.",
      "Heat groundnut oil in a deep kadai to medium-high.",
      "Press the dough through a muruku press or sev maker directly into the oil.",
      "Deep-fry until golden and crisp, turning once; drain on paper.",
      "Cool completely and store in an airtight container to keep the crunch.",
    ],
    te: [
      "బియ్యం పిండి, శనగపిండి, ఉప్పు, మసాలాలతో కలపండి.",
      "కరివేపాకు, నువ్వులు లేదా జీలకర్ర కలపండి.",
      "వేడి నీళ్లు, కొద్ది నూనెతో మెత్తని ముద్ద చేయండి.",
      "కడాయిలో నూనె మధ్యమ-ఎక్కువ వేడిపై పెట్టండి.",
      "మురుకు ప్రెస్ లేదా సేవ్ యంత్రంతో నూనెలోకి నొక్కండి.",
      "బంగారు రంగు వచ్చే వరకు వేయించి, కాగితంపై నూనె విడదీయండి.",
      "పూర్తిగా చల్లారాక గాలి చేరని డబ్బాలో ఉంచండి.",
    ],
  },
  sweets: {
    en: [
      "Prepare the main ingredient — roast, grate or soak as the recipe requires.",
      "In a heavy-bottomed pan, melt jaggery or sugar with a little ghee to a soft-ball syrup.",
      "Add the main ingredient to the syrup and mix vigorously off the flame.",
      "Grease your palms with ghee and shape into laddus while still warm.",
      "Cool on a greased plate until firm; do not refrigerate while warm.",
      "Store in an airtight container; use a dry spoon.",
    ],
    te: [
      "ప్రధాన పదార్థాన్ని సిద్ధం చేయండి — వేయించండి లేదా రుబ్బండి.",
      "మందపాతపై కడాయిలో బెల్లం లేదా చక్కెర, నెయ్యి వేసి పాక చేయండి.",
      "ప్రధాన పదార్థాన్ని పాకంలో కలపండి — మంట ఆపి.",
      "వేడిగా ఉన్నప్పుడే నెయ్యి పట్టిన చేతులతో ఉండలు చేయండి.",
      "నెయ్యి పూసిన పళ్ళెంలో గట్టిపడే వరకు చల్లారనివ్వండి.",
      "గాలి చేరని డబ్బాలో నిల్వ ఉంచండి.",
    ],
  },
};

export const recipeVideos: RecipeVideo[] = products.map((p: Product, i) => ({
  id: `rv-${p.slug}`,
  productSlug: p.slug,
  titleEn: `How do we make ${p.nameEn}?`,
  titleTe: `${p.nameTe} ఎలా చేస్తాము?`,
  descEn: `Step-by-step video guide to making ${p.nameEn} at home — the traditional Andhra way.`,
  descTe: `${p.nameTe} ఇంట్లో చేయడానికి దశల వారీ వీడియో గైడ్ — సంప్రదాయ ఆంధ్ర పద్ధతి.`,
  categoryId: p.categoryId,
  poster: p.image,
  videoUrl: SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length],
  durationLabel: DURATIONS[i % DURATIONS.length],
  stepsEn: STEP_TEMPLATES[p.categoryId].en,
  stepsTe: STEP_TEMPLATES[p.categoryId].te,
}));
