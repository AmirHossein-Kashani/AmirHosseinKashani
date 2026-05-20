import { profile } from '../data/profile'

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-neutral-200/60 dark:border-neutral-800/60"
    >
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--color-ai-soft)] blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[var(--color-software-soft)] blur-3xl animate-blob [animation-delay:-7s]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </span>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-neutral-900 md:text-7xl dark:text-neutral-50">
            {profile.name}
          </h1>

          <p className="mt-4 max-w-2xl text-xl text-neutral-600 md:text-2xl dark:text-neutral-400">
            <span className="bg-gradient-to-r from-[var(--color-ai)] to-[var(--color-software)] bg-clip-text font-medium text-transparent">
              AI Researcher
            </span>
            {'  ·  '}
            <span className="bg-gradient-to-r from-[var(--color-software)] to-[var(--color-ai)] bg-clip-text font-medium text-transparent">
              Software Engineer
            </span>
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-400">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              View projects →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/50 px-5 py-2.5 text-sm font-medium text-neutral-800 backdrop-blur transition-colors hover:border-neutral-400 hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              Get in touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/50 px-5 py-2.5 text-sm font-medium text-neutral-800 backdrop-blur transition-colors hover:border-neutral-400 hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              GitHub
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-neutral-200/70 pt-6 sm:grid-cols-4 dark:border-neutral-800/70">
            <Stat label="ACM TWEB" value="1 paper" />
            <Stat label="GPA (MSc)" value="3.88 / 4" />
            <Stat label="IELTS" value="7.0" />
            <Stat label="Now at" value="SFU" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
      <p className="text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
        {label}
      </p>
    </div>
  )
}

export default Hero
