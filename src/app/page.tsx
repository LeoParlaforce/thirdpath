import Image from "next/image";

export default function Home() {
  return (
<<<<<<< HEAD
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
=======
    <main className="min-h-screen text-foreground">
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              Psychology: embody life, discover your world
            </h1>
            <p className="mt-5 text-xl/8 opacity-80">
              Psychological support and practical guides. E-books and online group sessions.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <NextLink
                href="/boutique"
                className="rounded-md bg-accent px-6 py-3 text-white text-base font-medium
                           transition transform-gpu hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Browse guides
              </NextLink>
              <NextLink
                href="/therapies-groupe"
                className="rounded-md border px-6 py-3 text-base font-medium
                           transition transform-gpu hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-md
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Themed online group sessions
              </NextLink>
            </div>
          </div>
>>>>>>> fb8bff2 (thirdpath: EN site, Stripe/Resend, emails)

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
<<<<<<< HEAD
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
=======
              src="/hero.jpg"
              alt="Third Path — a clear gaze"
              fill
              className="object-cover object-[50%_20%] transition transform-gpu hover:scale-[1.03]"
              priority
              sizes="(min-width:768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 3 key points */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold">What you will find here</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Card 1 — Guides */}
          <NextLink
            href="/boutique"
            aria-label="See the complete guides"
            className="group block rounded-xl border overflow-hidden transition
                       hover:-translate-y-1 hover:shadow-xl hover:border-accent transform-gpu"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src="/guide.jpg"
                alt="Complete guides"
                fill
                className="object-cover transition transform-gpu group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold transition group-hover:text-accent">
                Complete guides
              </h3>
              <p className="mt-2 text-base opacity-80">
                PDF e-books: Self-esteem, Depression, Anxiety, Relationships, Loneliness,
                Sleep issues, Autism spectrum, Eating disorders, ADHD,
                Procrastination and creativity, High potential.
              </p>
            </div>
          </NextLink>

          {/* Card 2 — Groups */}
          <NextLink
            href="/therapies-groupe"
            aria-label="See the group sessions"
            className="group block rounded-xl border overflow-hidden transition
                       hover:-translate-y-1 hover:shadow-xl hover:border-accent transform-gpu"
          >
            <div className="relative aspect-[3/2]">
              <Image
                src="/group.jpg"
                alt="Group sessions"
                fill
                className="object-cover transition transform-gpu group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold transition group-hover:text-accent">
                Group sessions
              </h3>
              <p className="mt-2 text-base opacity-80">
                Twice-monthly themed sessions on video, led by a licensed psychologist.
              </p>
            </div>
          </NextLink>

          {/* Card 3 — non clickable */}
          <article className="rounded-xl border p-6 transition hover:shadow-md hover:border-accent/50">
            <h3 className="text-lg font-semibold">Humanist approach</h3>
            <p className="mt-2 text-base opacity-80">
              Work without judgment, with logic and feeling. Become the healer of your own world.
            </p>
          </article>
>>>>>>> fb8bff2 (thirdpath: EN site, Stripe/Resend, emails)
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
