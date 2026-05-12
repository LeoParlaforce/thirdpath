import { Metadata } from "next"
import TherapyClient from "./TherapyClient"

export const metadata: Metadata = {
  title: "Daily Therapy via Messaging | Third Path",
  description: "Individual messaging with a licensed clinical psychologist. Write when something comes up — not only when a time slot allows it. Human, no AI, cancel anytime.",
  alternates: { canonical: "https://thirdpath.cloud/therapy" },
  openGraph: {
    title: "Daily Therapy via Messaging | Third Path",
    description: "Individual messaging with a licensed clinical psychologist. For all practitioners in contact with humans.",
    url: "https://thirdpath.cloud/therapy",
    type: "website",
    images: [{ url: "https://thirdpath.cloud/humanist-approach.jpg", width: 1200, height: 630 }],
  },
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Daily therapy via individual messaging",
  "serviceType": "Clinical therapy",
  "description": "Individual messaging with a licensed clinical psychologist. For personal therapy at your own pace, in writing, without a fixed appointment.",
  "provider": { "@type": "Person", "name": "Leo Gayrard", "@id": "https://thirdpath.cloud/#author" },
  "areaServed": "Worldwide",
  "inLanguage": "en",
  "url": "https://thirdpath.cloud/therapy",
  "offers": [
    { "@type": "Offer", "name": "Reduced rate", "price": "80", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "80", "priceCurrency": "EUR", "unitCode": "MON" } },
    { "@type": "Offer", "name": "Full rate", "price": "150", "priceCurrency": "EUR", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "EUR", "unitCode": "MON" } },
  ],
}

export default function TherapyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <TherapyClient />
    </>
  )
}
