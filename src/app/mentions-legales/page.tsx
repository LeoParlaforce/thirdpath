// src/app/mentions-legales/page.tsx
export const metadata = {
  title: "Legal Notice — Third Path",
  description: "Third Path legal information: company address, contact details, and regulatory information for international users.",
}

export default function LegalNotice() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 prose">
      <h1>Legal Notice</h1>

      <h2>Site Operator</h2>
      <p>Third Path</p>
      <p>1184 route de la Maurette, 83520 Roquebrune-sur-Argens, France</p>

      <h2>Contact</h2>
      <p>Email: <a href="mailto:leo.gayrard@gmail.com">leo.gayrard@gmail.com</a></p>

      <h2>Purpose</h2>
      <p>This site provides educational and evidence-based psychological resources and guides. It is intended for informational purposes only and does not replace professional consultation when needed.</p>

      <h2>Intellectual Property</h2>
      <p>All content, guides, images, and text are © Third Path. Unauthorized reproduction is prohibited.</p>

      <h2>International Compliance</h2>
      <p>The site complies with French law (Code de la propriété intellectuelle, consumer rights) and general EU guidelines for website operators targeting international audiences.</p>
    </main>
  )
}