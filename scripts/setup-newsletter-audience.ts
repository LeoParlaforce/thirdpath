import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve } from "path"
import { Resend } from "resend"

const envPath = resolve(process.cwd(), ".env.local")

function parseEnv(content: string): Record<string, string> {
  const env: Record<string, string> = {}
  for (const line of content.split("\n")) {
    const match = line.match(/^([^#=\s][^=]*)=(.*)$/)
    if (match) env[match[1].trim()] = match[2].trim()
  }
  return env
}

async function main() {
  if (!existsSync(envPath)) {
    console.error("No .env.local found at project root.")
    process.exit(1)
  }

  const envContent = readFileSync(envPath, "utf-8")
  const env = parseEnv(envContent)

  const apiKey = env.RESEND_API_KEY
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY in .env.local")
    process.exit(1)
  }

  const resend = new Resend(apiKey)

  console.log("Creating Resend audience: Third Path Newsletter …")
  const { data, error } = await resend.audiences.create({ name: "Third Path Newsletter" })

  if (error || !data) {
    console.error("Error creating audience:", error)
    process.exit(1)
  }

  const audienceId = (data as any).id as string
  console.log(`Audience created: ${audienceId}`)

  let updated = envContent
  if (/^RESEND_AUDIENCE_ID=/m.test(updated)) {
    updated = updated.replace(/^RESEND_AUDIENCE_ID=.*/m, `RESEND_AUDIENCE_ID=${audienceId}`)
  } else {
    updated = updated.trimEnd() + `\nRESEND_AUDIENCE_ID=${audienceId}\n`
  }

  writeFileSync(envPath, updated, "utf-8")
  console.log(`✓ RESEND_AUDIENCE_ID=${audienceId} written to .env.local`)
  console.log("")
  console.log("Next step: add RESEND_AUDIENCE_ID to your GitHub repo secrets.")
}

main()
