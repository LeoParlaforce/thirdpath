import { Resend } from "resend"
import { readFileSync } from "fs"
import matter from "gray-matter"

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = process.env.RESEND_AUDIENCE_ID
const FROM = process.env.RESEND_FROM || "contact@troisiemechemin.fr"
const SITE_URL = "https://thirdpath.cloud"

function articleHtml(title, summary, slug) {
  const articleUrl = `${SITE_URL}/articles/${slug}`
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px">
    <div style="border-bottom:1px solid #222;padding-bottom:24px;margin-bottom:32px">
      <p style="color:#6b7280;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;margin:0;font-family:Arial,sans-serif">Third Path · Library</p>
    </div>
    <p style="color:#6b7280;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 12px;font-family:Arial,sans-serif">New reflection</p>
    <h1 style="color:#f9fafb;font-size:28px;font-weight:400;font-style:italic;margin:0 0 16px;line-height:1.35">${title}</h1>
    <p style="color:#9ca3af;font-size:16px;line-height:1.8;margin:0 0 32px;font-style:italic">${summary}</p>
    <a href="${articleUrl}" style="display:inline-block;background:#f9fafb;color:#0a0a0a;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;letter-spacing:0.05em">
      Read the article →
    </a>
    <div style="border-top:1px solid #222;padding-top:24px;margin-top:48px">
      <p style="color:#4b5563;font-size:12px;margin:0 0 4px;font-family:Arial,sans-serif">
        Leo Gayrard · Licensed Psychologist ·
        <a href="${SITE_URL}" style="color:#4b5563">thirdpath.cloud</a>
      </p>
      <p style="color:#374151;font-size:11px;margin:0;font-family:Arial,sans-serif">
        You're receiving this because you subscribed to the Library. No frequency promises.
      </p>
    </div>
  </div>
</body>
</html>`
}

async function main() {
  if (!audienceId) {
    console.error("Missing RESEND_AUDIENCE_ID — run setup-newsletter-audience.ts first.")
    process.exit(1)
  }

  const newFiles = (process.env.NEW_ARTICLE_FILES || "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean)

  if (newFiles.length === 0) {
    console.log("No new article files detected.")
    return
  }

  for (const filePath of newFiles) {
    let fileContent
    try {
      fileContent = readFileSync(filePath, "utf-8")
    } catch {
      console.warn(`Could not read ${filePath}, skipping.`)
      continue
    }

    const { data } = matter(fileContent)
    const title = data.title
    const summary = data.summary
    const slug = filePath.replace(/.*[/\\]/, "").replace(/\.md$/, "")

    if (!title || !summary) {
      console.warn(`Skipping ${filePath}: missing title or summary in frontmatter.`)
      continue
    }

    console.log(`Sending newsletter for: "${title}"`)

    const { data: broadcast, error: createError } = await resend.broadcasts.create({
      audienceId,
      from: FROM,
      name: `Newsletter: ${title}`,
      subject: title,
      html: articleHtml(title, summary, slug),
    })

    if (createError || !broadcast) {
      console.error(`Failed to create broadcast for "${title}":`, createError)
      continue
    }

    const { error: sendError } = await resend.broadcasts.send(broadcast.id)
    if (sendError) {
      console.error(`Failed to send broadcast ${broadcast.id}:`, sendError)
    } else {
      console.log(`✓ Newsletter sent: "${title}"`)
    }
  }
}

main()
