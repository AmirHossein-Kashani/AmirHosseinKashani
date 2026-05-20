import { profile } from '../data/profile'

function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-neutral-200/70 bg-gradient-to-b from-transparent to-neutral-50 py-20 md:py-28 dark:to-neutral-900/40 dark:border-neutral-800/70"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
          Let's build something{' '}
          <span className="bg-gradient-to-r from-[var(--color-ai)] to-[var(--color-software)] bg-clip-text text-transparent">
            ambitious
          </span>
          .
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          I'm open to research collaborations, full-time engineering roles, and
          internships — particularly in machine learning, simulation, and HCI.
          Based at SFU in Vancouver, BC.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-200"
          >
            github.com/amkkashani
          </a>
        </div>

        <p className="mt-10 text-xs text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} {profile.name}. Built with React,
          TypeScript & Tailwind.
        </p>
      </div>
    </section>
  )
}

export default Contact
