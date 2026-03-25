export type Product = {
  slug: string
  title: string
  priceEUR: string
  priceUSD: string
  image: string
  summary: string
  chapters: string[]
}

export const products: Product[] = [
  {
    slug: "introduction-aux-guides",
    title: "Introduction to the psychological guides",
    priceEUR: "0€",
    priceUSD: "$0",
    image: "/introduction.jpg",
    summary: "Foundations of the approach: therapy as training to become the healer of your world.",
    chapters: ["Foreword", "Introduction", "The practice of therapy", "What is the subject", "Therapy where you are the hero", "The fundamental limit"],
  },
  {
    slug: "estime-de-soi",
    title: "Self-esteem",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/estime.jpg",
    summary: "Leave narcissism to recover the tension of desire and decentering practices.",
    chapters: ["Introduction", "The mirage of the self", "Narcissism and false autonomy", "Recovering the tension of desire", "Practices that decenter", "Conclusion"],
  },
  {
    slug: "depression",
    title: "Depression",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/depression.jpg",
    summary: "Read depression as protective withdrawal. Reopen the path through tiny beginnings and supports.",
    chapters: ["Introduction", "The slowed body", "Thinking that closes", "Isolation and connection", "Obscure desire and life that persists", "Small movements, tiny starts", "Supports and companionship", "Conclusion"],
  },
  {
    slug: "anxiete",
    title: "Anxiety",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/anxiete.jpg",
    summary: "From bodily signal to thought loops: receive the wave and regain room for action.",
    chapters: ["Introduction", "When the body speaks", "The circle of thoughts", "Giving worry a place", "Meeting others", "Desire, choice, the unexpected", "Concrete tracks", "Conclusion"],
  },
  {
    slug: "relations-amoureuses",
    title: "Romantical relationships",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/relations.jpg",
    summary: "Desire as a living gap: speech, daily seduction, positions and freedom in the bond.",
    chapters: ["Desire and encounter", "The art of speech", "Everyday seduction", "Balance beyond 50/50", "Position games", "Freedom and bond", "The pitfalls of expectation", "A story in motion"],
  },
  {
    slug: "solitude",
    title: "Solitude",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/solitude.jpg",
    summary: "Understand solitude as a tension between blending in and transforming. Reopen encounter.",
    chapters: ["Introduction", "The misunderstanding of lack", "Blending in or transforming", "Shaping the world in one’s image", "Encountering otherness", "Creativity and new connections", "Concrete steps", "Conclusion"],
  },
  {
    slug: "tdah",
    title: "ADHD",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tdah.jpg",
    summary: "A singular way of desire and time. Turn tension into creative drive.",
    chapters: ["Introduction", "A singular functioning", "When daily life speaks", "Markers to situate yourself", "Finding your own rhythm", "Turning tension into a motor", "Relationships and desire", "Next steps", "Conclusion?"],
  },
  {
    slug: "tsa",
    title: "Autistic spectrum disorders",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tsa.jpg",
    summary: "Regain a hold on life: markers, dialogue, and invention of forms of bond and environment.",
    chapters: ["Regaining a hold on life", "Perceiving differently", "Creating your markers", "Learning to dialogue", "Transforming relationships", "Opening to the world", "Evolving your environment", "A singular and creative path"],
  },
  {
    slug: "tca",
    title: "Eating disorders",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tca.jpg",
    summary: "Beyond food: struggle with the void, the body, and desire. Recover vital movement.",
    chapters: ["Introduction", "Eating the void or the overflow of the void", "Withdrawal and disinvestment from the world", "Refusal of the sexed body and fear of desire", "From the whole to the part: endless fixation", "The illusory power of “nothing”", "Recovering the movement of desire", "Paths of support and conclusion"],
  },
  {
    slug: "sommeil",
    title: "Sleep disorders",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/sommeil.jpg",
    summary: "Rhythms, stress, emotions, and environment: concrete paths toward a peaceful night.",
    chapters: ["Introduction", "Body, mind, and biological rhythms", "Stress, anxiety, and rumination", "Habits and environment", "Sleep and deep emotions", "Ways to regain your rhythm", "When sleep speaks", "Toward a peaceful relationship with the night"],
  },
  {
    slug: "procrastination-creativite",
    title: "Procrastination and creativity",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/procrastination.jpg",
    summary: "From avoidance to invention: starting as a creative act, valuing boredom and multiple beginnings.",
    chapters: ["Introduction", "The false excuse of certainty", "Starting is already creating", "Boredom as a passage", "Finding desire in the goal", "From avoidance to invention", "Concrete tracks", "Conclusion"],
  },
  {
    slug: "hauts-potentiels",
    title: "High potentials",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/hpi.jpg",
    summary: "Beyond IQ: strengths, vulnerabilities, lifestyle and relationships to invent a singular path.",
    chapters: ["What HPI means today", "A fast and singular mind", "Living difference daily", "Strengths of HPI", "Frequent vulnerabilities", "Growing and thriving with HPI", "Finding lifestyle and relationships", "Inventing your own path"],
  },
  {
    slug: "pack-integral",
    title: "Full pack",
    priceEUR: "54.50€",
    priceUSD: "$59.50",
    image: "/pack.jpg",
    summary: "All 11 guides + the Introduction at a reduced price. Full access to work each theme.",
    chapters: ["Pack content:", "Introduction to the guides", "Self-esteem", "Depression", "Anxiety", "Romantical relationships", "Solitude", "ADHD", "Autistic spectrum disorders", "Eating disorders", "Sleep disorders", "Procrastination and creativity", "High potentials"],
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}