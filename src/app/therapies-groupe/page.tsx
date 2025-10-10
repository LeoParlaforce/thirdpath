"use client"
export const dynamic = "force-dynamic"

import { useEffect, useMemo, useState } from "react"
import SubscribeButton from "@/app/therapies-groupe/SubscribeButton"
import InfoForm from "@/app/therapies-groupe/InfoForm"
import { products } from "@/app/boutique/data"
import type { TrackId as AllTrackId } from "@/app/therapies-groupe/SubscribeButton"

type LocalTrackId = Extract<AllTrackId, "t1-en" | "t2-en">

type Track = {
  id: LocalTrackId
  publicKey: "anxiety" | "relationships"
  title: string
  week: "A" | "B"
  dayTime: string
  desc: string
  start: string
  imgPool: string[]
}

type Availability = Record<LocalTrackId, { count: number; spotsLeft: number; full: boolean }>

function priceText() { return "$24 every 2 weeks" }

function GroupCard({ t, avail }: { t: Track; avail: Availability[LocalTrackId] }) {
  const [bg, setBg] = useState<string>("")
  return (
    <article
      id={t.publicKey}
      onMouseEnter={() => { if (t.imgPool.length) setBg(t.imgPool[Math.floor(Math.random()*t.imgPool.length)]!) }}
      onMouseLeave={() => setBg("")}
      className="relative overflow-hidden rounded-xl border p-5 transition hover:shadow-md hover:border-accent/50"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 transition-opacity duration-200"
           style={{ backgroundImage: bg ? `url(${bg})` : undefined, backgroundSize:"cover", backgroundPosition:"center", opacity: bg ? 0.18 : 0 }} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.title}</h2>
          <span className={`text-xs px-2 py-1 rounded border ${avail.full ? "border-red-300 text-red-700" : ""}`}>
            EN · Week {t.week}{avail.full ? " · Full" : ""}
          </span>
        </div>

        <p className="mt-2 text-sm opacity-80">{t.dayTime}</p>
        <p className="mt-1 text-sm">
          <span className="font-medium">{t.start}</span>
          <span className="opacity-70"> · then one session every two weeks</span>
        </p>
        <p className="mt-3 text-sm opacity-80">{t.desc}</p>
        <ul className="mt-4 text-sm space-y-1">
          <li>• Max. 10 people</li>
          <li>• Video conference</li>
          <li>• {priceText()}</li>
          {/* capacity count intentionally hidden */}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          {avail.full ? (
            <a href={`#inscription-${t.publicKey}`} className="cursor-pointer rounded-md border px-4 py-2 text-sm transition hover:scale-[1.02] hover:border-accent hover:text-accent">
              Join the waitlist
            </a>
          ) : (
            <SubscribeButton track={t.id} label="Join (every 2 weeks)" />
          )}
          {!avail.full && (
            <a href={`#inscription-${t.publicKey}`} className="cursor-pointer rounded-md border px-4 py-2 text-sm transition hover:scale-[1.02] hover:border-accent hover:text-accent">
              Request info
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Groups() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const tracks = useMemo<Track[]>(() => {
    const t1Imgs = products.filter(p => p.group === "t1" && p.image).map(p => p.image)
    const t2Imgs = products.filter(p => p.group === "t2" && p.image).map(p => p.image)
    const slotUS = "1:00 PM ET · 12:00 PM CT · 11:00 AM MT · 10:00 AM PT"
    const slotEU = "(19:00 Europe/Paris)"
    return [
      {
        id: "t1-en",
        publicKey: "anxiety",
        title: "Theme 1 — Anxiety & regulation",
        week: "A",
        dayTime: `${slotUS} ${slotEU}`,
        desc: "Tolerance to uncertainty, exposures, regulation tools.",
        start: "Starts: Saturday 10 Jan 2026",
        imgPool: t1Imgs,
      },
      {
        id: "t2-en",
        publicKey: "relationships",
        title: "Theme 2 — Relationships & self-esteem",
        week: "B",
        dayTime: `${slotUS} ${slotEU}`,
        desc: "Clear speech, positions, acts of value and limits.",
        start: "Starts: Saturday 17 Jan 2026",
        imgPool: t2Imgs,
      },
    ]
  }, [])

  const [avail, setAvail] = useState<Availability>({
    "t1-en": { count: 0, spotsLeft: 10, full: false },
    "t2-en": { count: 0, spotsLeft: 10, full: false },
  })

  useEffect(() => {
    let ok = true
    ;(async () => {
      const res = await fetch("/api/tracks/availability", { cache: "no-store" })
      if (!res.ok) return
      const data = (await res.json()) as Partial<Record<LocalTrackId, Availability[LocalTrackId]>>
      if (ok) {
        setAvail(a => ({
          ...a,
          ...(data["t1-en"] ? { "t1-en": data["t1-en"]! } : {}),
          ...(data["t2-en"] ? { "t2-en": data["t2-en"]! } : {}),
        }))
      }
    })()
    return () => { ok = false }
  }, [])

  if (!mounted) return null

  return (
    <main suppressHydrationWarning className="min-h-screen text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold">Themed group sessions</h1>
        <p className="mt-3 text-lg opacity-80">
          Starting <strong>January 2026</strong>. 90-minute session, one video call every 2 weeks.
          Same slot each time: <strong>1:00 PM ET · 12:00 PM CT · 11:00 AM MT · 10:00 AM PT</strong>{" "}
          <span className="opacity-70">(19:00 Europe/Paris)</span>. Week A = Theme 1, Week B = Theme 2.
        </p>
        <p className="mt-2 text-sm opacity-80">
          You only speak if you want to. Some attend to listen, others also to participate. You decide.
        </p>
        <p className="mt-2 text-sm opacity-70">
          Member pricing on e-books: guides <strong>$5.50</strong> (instead of $9.50) · full bundle <strong>$31.50</strong> (instead of $54.50).
        </p>
      </section>

      <section id="slots" className="mx-auto max-w-6xl px-6 pb-20 grid gap-6 md:grid-cols-2">
        {tracks.map(t => <GroupCard key={t.id} t={t} avail={avail[t.id]} />)}
      </section>

      <section id="inscription" className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-2xl font-semibold">Request information</h2>
        <div id="inscription-anxiety" />
        <div id="inscription-relationships" />
        <InfoForm />
      </section>
    </main>
  )
}
