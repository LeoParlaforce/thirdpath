export type FAQItem = {
  question: string
  answer: string
}

export type Product = {
  slug: string
  title: string
  priceEUR: string
  priceUSD: string
  image: string
  summary: string
  chapters: string[]
  faq: FAQItem[]
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
    faq: [
      { question: "Why is this guide free?", answer: "This introduction establishes the conceptual framework necessary to navigate all other protocols effectively." },
      { question: "Is this for professionals or patients?", answer: "It is designed for anyone who wants to take an active role in their own psychological restructuring." }
    ]
  },
  {
    slug: "estime-de-soi",
    title: "Self-esteem",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/estime.jpg",
    summary: "Leave narcissism to recover the tension of desire and decentering practices.",
    chapters: ["Introduction", "The mirage of the self", "Narcissism and false autonomy", "Recovering the tension of desire", "Practices that decenter", "Conclusion"],
    faq: [
      { question: "How does this differ from positive thinking?", answer: "Instead of repeating affirmations, this guide focuses on external actions and the tension of desire to build genuine self-worth." },
      { question: "Can I use these practices daily?", answer: "Yes, the guide provides specific decentering exercises meant to be integrated into your everyday routine." }
    ]
  },
  {
    slug: "depression",
    title: "Depression",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/depression.jpg",
    summary: "Read depression as protective withdrawal. Reopen the path through tiny beginnings and supports.",
    chapters: ["Introduction", "The slowed body", "Thinking that closes", "Isolation and connection", "Obscure desire and life that persists", "Small movements, tiny starts", "Supports and companionship", "Conclusion"],
    faq: [
      { question: "What is a 'tiny beginning'?", answer: "It is a micro-action that requires minimal energy but serves to break the cycle of total withdrawal." },
      { question: "Does this replace medical treatment?", answer: "No, this is a psychological protocol designed to work alongside medical or therapeutic support." }
    ]
  },
  {
    slug: "anxiete",
    title: "Anxiety",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/anxiete.jpg",
    summary: "From bodily signal to thought loops: receive the wave and regain room for action.",
    chapters: ["Introduction", "When the body speaks", "The circle of thoughts", "Giving worry a place", "Meeting others", "Desire, choice, the unexpected", "Concrete tracks", "Conclusion"],
    faq: [
      { question: "How can I stop overthinking?", answer: "The guide focuses on 'giving worry a place' rather than fighting it, which helps break the infinite loops of anxiety." },
      { question: "Are there immediate techniques included?", answer: "Yes, it provides concrete tracks to manage bodily signals and regain a margin of action." }
    ]
  },
  {
    slug: "relations-amoureuses",
    title: "Romantical relationships",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/relations.jpg",
    summary: "Desire as a living gap: speech, daily seduction, positions and freedom in the bond.",
    chapters: ["Desire and encounter", "The art of speech", "Everyday seduction", "Balance beyond 50/50", "Position games", "Freedom and bond", "The pitfalls of expectation", "A story in motion"],
    faq: [
      { question: "What does 'seduction' mean in a long-term bond?", answer: "It refers to maintaining the 'gap' and the tension of desire so the relationship doesn't collapse into dull habit." },
      { question: "How do position games work?", answer: "The guide explores how shifting roles and maintaining freedom within the bond can revitalize a relationship." }
    ]
  },
  {
    slug: "solitude",
    title: "Solitude",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/solitude.jpg",
    summary: "Understand solitude as a tension between blending in and transforming. Reopen encounter.",
    chapters: ["Introduction", "The misunderstanding of lack", "Blending in or transforming", "Shaping the world in one’s image", "Encountering otherness", "Creativity and new connections", "Concrete steps", "Conclusion"],
    faq: [
      { question: "Is solitude the same as loneliness?", answer: "No. This guide teaches how to transform the 'lack' of loneliness into a creative and productive state of solitude." },
      { question: "How can I start meeting people again?", answer: "It focuses on shaping your own world first, which naturally reopens the possibility of genuine encounters." }
    ]
  },
  {
    slug: "tdah",
    title: "ADHD",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tdah.jpg",
    summary: "A singular way of desire and time. Turn tension into creative drive.",
    chapters: ["Introduction", "A singular functioning", "When daily life speaks", "Markers to situate yourself", "Finding your own rhythm", "Turning tension into a motor", "Relationships and desire", "Next steps", "Conclusion?"],
    faq: [
      { question: "Is this guide about productivity hacks?", answer: "It goes deeper, exploring the unique relationship with time and desire that characterizes the ADHD experience." },
      { question: "How do I find my own rhythm?", answer: "The protocol provides markers to help you stop fighting against your nature and start using your tension as a motor." }
    ]
  },
  {
    slug: "tsa",
    title: "Autistic spectrum disorders",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tsa.jpg",
    summary: "Regain a hold on life: markers, dialogue, and invention of forms of bond and environment.",
    chapters: ["Regaining a hold on life", "Perceiving differently", "Creating your markers", "Learning to dialogue", "Transforming relationships", "Opening to the world", "Evolving your environment", "A singular and creative path"],
    faq: [
      { question: "How does this help with social interaction?", answer: "It emphasizes 'learning to dialogue' through your own unique markers rather than simply trying to mask or mimic." },
      { question: "Can I adapt my environment using this?", answer: "Yes, a full chapter is dedicated to evolving your surroundings to match your sensory and psychological needs." }
    ]
  },
  {
    slug: "tca",
    title: "Eating disorders",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/tca.jpg",
    summary: "Beyond food: struggle with the void, the body, and desire. Recover vital movement.",
    chapters: ["Introduction", "Eating the void or the overflow of the void", "Withdrawal and disinvestment from the world", "Refusal of the sexed body and fear of desire", "From the whole to the part: endless fixation", "The illusory power of “nothing”", "Recovering the movement of desire", "Paths of support and conclusion"],
    faq: [
      { question: "Why doesn't this focus solely on diet?", answer: "Eating disorders are often about a struggle with the void and desire; this guide addresses those root psychological tensions." },
      { question: "How can I recover 'vital movement'?", answer: "The protocol works on reinvesting in the world and the body to move past the fixation on 'nothingness'." }
    ]
  },
  {
    slug: "sommeil",
    title: "Sleep disorders",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/sommeil.jpg",
    summary: "Rhythms, stress, emotions, and environment: concrete paths toward a peaceful night.",
    chapters: ["Introduction", "Body, mind, and biological rhythms", "Stress, anxiety, and rumination", "Habits and environment", "Sleep and deep emotions", "Ways to regain your rhythm", "When sleep speaks", "Toward a peaceful relationship with the night"],
    faq: [
      { question: "I've tried everything for sleep, why is this different?", answer: "This guide looks at how 'sleep speaks' about our deep emotions and stress rhythms rather than just offering hygiene tips." },
      { question: "How do I stop ruminating at night?", answer: "It provides specific psychological paths to handle stress and emotions that keep the mind active." }
    ]
  },
  {
    slug: "procrastination-creativite",
    title: "Procrastination and creativity",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/procrastination.jpg",
    summary: "From avoidance to invention: starting as a creative act, valuing boredom and multiple beginnings.",
    chapters: ["Introduction", "The false excuse of certainty", "Starting is already creating", "Boredom as a passage", "Finding desire in the goal", "From avoidance to invention", "Concrete tracks", "Conclusion"],
    faq: [
      { question: "Why do I avoid important tasks?", answer: "The guide explores the 'false excuse of certainty' and fear of beginnings as the root causes of avoidance." },
      { question: "How can boredom help my creativity?", answer: "It teaches how to use boredom as a necessary passage toward invention rather than something to be fled." }
    ]
  },
  {
    slug: "hauts-potentiels",
    title: "High potentials",
    priceEUR: "9.50€",
    priceUSD: "$10.50",
    image: "/hpi.jpg",
    summary: "Beyond IQ: strengths, vulnerabilities, lifestyle and relationships to invent a singular path.",
    chapters: ["What HPI means today", "A fast and singular mind", "Living difference daily", "Strengths of HPI", "Frequent vulnerabilities", "Growing and thriving with HPI", "Finding lifestyle and relationships", "Inventing your own path"],
    faq: [
      { question: "Is this just about being 'smart'?", answer: "No, it addresses the 'fast and singular mind' and the specific emotional vulnerabilities that come with it." },
      { question: "How do I find a lifestyle that fits?", answer: "The protocol offers a roadmap for inventing a path that respects your unique intensity and needs." }
    ]
  },
  {
    slug: "pack-integral",
    title: "Full pack",
    priceEUR: "54.50€",
    priceUSD: "$59.50",
    image: "/pack.jpg",
    summary: "All 11 guides + the Introduction at a reduced price. Full access to work each theme.",
    chapters: ["Pack content:", "Introduction to the guides", "Self-esteem", "Depression", "Anxiety", "Romantical relationships", "Solitude", "ADHD", "Autistic spectrum disorders", "Eating disorders", "Sleep disorders", "Procrastination and creativity", "High potentials"],
    faq: [
      { question: "What format are the guides in?", answer: "All guides are delivered as high-quality PDF files, optimized for reading on any device." },
      { question: "Is there a discount for buying the pack?", answer: "Yes, the full pack offers a significant reduction compared to buying all 12 guides individually." }
    ]
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}