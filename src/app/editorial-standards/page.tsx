// src/app/editorial-standards/page.tsx
export const metadata = {
  title: "Editorial Standards — Third Path",
  description: "How Third Path ensures accuracy, credibility, and independence in all psychological content and guides.",
}

export default function EditorialStandards() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 prose">
      <h1>Editorial Standards</h1>
      <p>How we ensure accuracy, credibility, and independence in every article.</p>

      <h2>Written by Certified Professionals</h2>
      <p>All content is produced by Leo Gayrard, a certified psychologist. Guidance and articles are based on professional training, evidence-based psychology research, and clinical experience.</p>

      <h2>Research-Backed Content</h2>
      <p>All claims are supported by peer-reviewed studies and established psychological principles. Preliminary or limited evidence is clearly indicated.</p>

      <h2>Review Process</h2>
      <ul>
        <li><strong>Draft:</strong> Initial article by certified psychologist.</li>
        <li><strong>Fact-check:</strong> Evidence and citations verified.</li>
        <li><strong>Expert review:</strong> Clinical review for accuracy and clarity.</li>
        <li><strong>Publish:</strong> Article published after validation.</li>
      </ul>

      <h2>Update Frequency</h2>
      <p>Content is reviewed regularly to ensure it reflects current research and professional standards.</p>

      <h2>Corrections Policy</h2>
      <p>Errors are corrected promptly. Readers can contact <a href="mailto:leo.gayrard@gmail.com">leo.gayrard@gmail.com</a> to report issues.</p>

      <h2>Editorial Independence</h2>
      <p>Articles are free from influence by advertisers, sponsors, or affiliate programs.</p>

      <h2>Our Commitment</h2>
      <p>Our mission is to provide reliable, evidence-based psychological guidance. Readers can trust that our content is accurate and professionally validated.</p>
    </main>
  )
}