import type { CategoryId } from "@/spa/types";
export interface RecipeVideo {
  id: string;
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

export const recipeVideos: RecipeVideo[] = [
  {
    id: "rv-pickle-recipe",
    titleEn: "How do we make Mango Pickle?",
    titleTe: "మామిడి ఊరగాయ ఎలా చేస్తాము?",
    descEn:
      "Watch the traditional Andhra mango pickle-making process — from washing and cutting to sun-curing in groundnut oil with organic mirchi.",
    descTe: "సంప్రదాయ ఆంధ్ర మామిడి ఊరగాయ తయారీ ప్రక్రియ.",
    categoryId: "pickles",
    poster: "/videos/poster-2.png",
    videoUrl: "/videos/mango-pickle.mp4",
    durationLabel: "0:52",
    stepsEn: [
      "Wash raw mango and dry completely.",
      "Cut into uniform pieces with the skin on.",
      "Dry-roast mustard and fenugreek, grind to powder.",
      "Mix with red chilli powder, salt and spice powder.",
      "Add groundnut oil and toss until coated.",
      "Sun-cure in a jar for 2-3 days.",
      "Store in an airtight jar.",
    ],
    stepsTe: [
      "మామిడి కడిగి ఎండబెట్టండి.",
      "తొక్కతో ముక్కలు కోయండి.",
      "ఆవాలు వేయించి పొడి చేయండి.",
      "కారం, ఉప్పు కలపండి.",
      "నూనె కలపండి.",
      "జాడీలో 2-3 రోజులు ఎండలో ఉంచండి.",
      "గాలి చేరని జాడీలో ఉంచండి.",
    ],
  },
  {
    id: "rv-sweet-recipe",
    titleEn: "How do we make Festive Sweets?",
    titleTe: "పండుగ మిఠాయిలు ఎలా చేస్తాము?",
    descEn:
      "Watch the traditional Andhra sweet-making process — laddus, ariselu and more, made with jaggery, ghee and love.",
    descTe: "సంప్రదాయ ఆంధ్ర మిఠాయి తయారీ.",
    categoryId: "sweets",
    poster: "/videos/poster-1.png",
    videoUrl: "/videos/recipe.mp4",
    durationLabel: "0:17",
    stepsEn: [
      "Prepare the main ingredient.",
      "Melt jaggery with ghee to a soft-ball syrup.",
      "Add ingredient and mix off the flame.",
      "Shape into laddus while warm.",
      "Cool until firm.",
      "Store in an airtight container.",
    ],
    stepsTe: [
      "పదార్థాన్ని సిద్ధం చేయండి.",
      "బెల్లం పాక చేయండి.",
      "కలపండి — మంట ఆపి.",
      "ఉండలు చేయండి.",
      "గట్టిపడే వరకు చల్లారనివ్వండి.",
      "డబ్బాలో ఉంచండి.",
    ],
  },
  {
    id: "rv-chicken-pickle",
    titleEn: "How do we make Chicken Pickle?",
    titleTe: "చికెన్ ఊరగాయ ఎలా చేస్తాము?",
    descEn:
      "Watch the traditional Andhra chicken pickle-making process — marinating boneless chicken, cooking with spices, and preserving in groundnut oil. Made to order with a 2-3 day lead time.",
    descTe:
      "సంప్రదాయ ఆంధ్ర చికెన్ ఊరగాయ తయారీ ప్రక్రియ — మెరినేట్ చేయడం నుండి నూనెలో నిల్వ చేయడం వరకు.",
    categoryId: "pickles",
    poster: "/videos/chicken-pickle.png",
    videoUrl: "/videos/chicken-pickle.mp4",
    durationLabel: "0:52",
    stepsEn: [
      "Clean and wash boneless chicken thoroughly.",
      "Marinate with turmeric, salt and ginger-garlic paste for 30 minutes.",
      "Dry-roast mustard, fenugreek and garam masala spices, grind to powder.",
      "Shallow-fry the marinated chicken until golden, then set aside.",
      "In the same oil, temper mustard seeds and curry leaves.",
      "Add red chilli powder, the roasted spice powder and salt.",
      "Mix in the fried chicken and cook until oil separates.",
      "Cool completely and store in a clean, dry airtight jar. Refrigerate after opening.",
    ],
    stepsTe: [
      "చికెన్ శుభ్రంగా కడిగి ఎముకలు తీసివేయండి.",
      "పసుపు, ఉప్పు, అల్లం-వెల్లుల్లి పేస్ట్‌తో 30 నిమిషాలు మెరినేట్ చేయండి.",
      "ఆవాలు, మెంతులు, గరం మసాలా వేయించి పొడి చేయండి.",
      "మెరినేట్ చేసిన చికెన్ బంగారు రంగు వచ్చే వరకు వేయించండి.",
      "అదే నూనెలో ఆవాలు, కరివేపాకు వేయండి.",
      "ఎర్ర మిరప పొడి, మసాలా పొడి, ఉప్పు కలపండి.",
      "వేయించిన చికెన్ కలిపి నూనె విడిపోయే వరకు ఉడికించండి.",
      "పూర్తిగా చల్లారాక గాలి చేరని జాడీలో నిల్వ ఉంచండి.",
    ],
  },
  {
    id: "rv-amla-pickle",
    titleEn: "How do we make Amla Pickle?",
    titleTe: "ఉసిరికాయ ఊరగాయ ఎలా చేస్తాము?",
    descEn:
      "Watch the traditional Andhra amla pickle-making process — gooseberries packed with Vitamin C, cooked in a tangy mustard-red chilli base and aged until deep amber.",
    descTe: "విటమిన్ సి పుష్కలంగా ఉన్న ఉసిరికాయలతో చేసిన ఆంధ్ర ఊరగాయ తయారీ.",
    categoryId: "pickles",
    poster: "/videos/amla-pickle.png",
    videoUrl: "/videos/amla-pickle.mp4",
    durationLabel: "0:52",
    stepsEn: [
      "Wash amla (gooseberries) and steam for 5 minutes until slightly soft.",
      "Remove seeds and separate the segments.",
      "Dry-roast mustard and fenugreek seeds, grind to a fine powder.",
      "Mix amla segments with red chilli powder, salt and the spice powder.",
      "Add groundnut oil and toss until every piece is coated.",
      "Transfer to a clean ceramic jar and sun-cure for 2-3 days, stirring daily.",
      "Store in an airtight jar; refrigerate after opening.",
    ],
    stepsTe: [
      "ఉసిరికాయలు కడిగి 5 నిమిషాలు ఆవిరిలో ఉడికించండి.",
      "గింజలు తీసి ముక్కలు వేరు చేయండి.",
      "ఆవాలు, మెంతులు వేయించి పొడి చేయండి.",
      "ఎర్ర మిరప పొడి, ఉప్పు, మసాలా పొడి కలపండి.",
      "నూనె పోసి అన్ని ముక్కలకు పట్టేలా కలపండి.",
      "జాడీలో వేసి 2-3 రోజులు ఎండలో ఉంచండి, రోజూ కలపండి.",
      "గాలి చేరని జాడీలో నిల్వ ఉంచండి.",
    ],
  },
];
