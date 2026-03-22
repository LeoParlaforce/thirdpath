// src/app/about-us/page.tsx
export const metadata = {
  title: "About Us — Third Path",
  description: "Meet Leo Gayrard, certified psychologist behind Third Path, and learn about our mission, editorial standards, and approach.",
}

export default function AboutUs() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 prose">
      <h1>About Third Path</h1>
      <p>Research-backed psychology guidance from a certified professional.</p>

      <h2>Our Mission</h2>
      <p>Third Path exists to provide reliable, evidence-based psychological resources, guides, and insights. Every article and guide is grounded in research, clinical experience, and ethical practice.</p>

      <h2>Who We Are</h2>
      <p>Third Path is operated by Leo Gayrard, licensed psychologist. Our guidance combines professional training, clinical experience, and evidence-based methods to ensure practical and reliable psychological insights.</p>

      <h2>Why Third Path</h2>
      <p>We aim to make psychological knowledge accessible, structured, and useful. Whether exploring self-esteem, anxiety, depression, or personal development, every guide is evidence-backed and clinically validated.</p>

      <h2>Our Editorial Process</h2>
      <ul>
        <li><strong>Research and drafting:</strong> Articles written by certified psychologist.</li>
        <li><strong>Fact-checking:</strong> Evidence and sources verified.</li>
        <li><strong>Clinical review:</strong> Review for accuracy and ethical compliance.</li>
        <li><strong>Regular updates:</strong> Content updated to reflect latest research.</li>
      </ul>

      <h2>What You Will Find Here</h2>
      <ul>
        <li>Complete Guides – practical, evidence-based articles and PDFs</li>
        <li>Benefits – psychological and personal growth insights</li>
        <li>Training Programs – structured approaches to improve well-being</li>
        <li>Resources – exercises, reflections, and techniques</li>
      </ul>

      <h2>Contact Us</h2>
      <p>Questions, feedback, or suggestions? Email: <a href="mailto:leo.gayrard@gmail.com">leo.gayrard@gmail.com</a>. We respond within 48 hours on business days.</p>
    </main>
  )
}