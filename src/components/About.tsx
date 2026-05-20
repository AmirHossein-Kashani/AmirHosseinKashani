import SectionHeader from './SectionHeader'
import { researchInterests } from '../data/interests'

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <SectionHeader
        eyebrow="About"
        title="Researcher with an engineer's hands."
        subtitle="I'm a PhD candidate in Computer Science at Simon Fraser University (started May 2026), with an MSc in Software Engineering from Amirkabir University of Technology — ranked 3rd in the program. My work spans two interlocking tracks: machine learning research, and the production systems that make it real."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-[var(--color-ai)]/60 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--color-ai-soft)] blur-2xl transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ai-soft)] px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ai)]" />
              AI / Research Track
            </span>
            <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Agentic LLMs, GNNs, and HCI
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Currently focused on agentic LLMs
              </span>{' '}
              — reasoning, tool use, and multi-agent coordination. Published in
              ACM Transactions on the Web on Graph Neural Networks
              (over-smoothing, multi-agent path planning), with prior work on
              reinforcement learning and ocular models of human attention at
              the intersection of HCI and ML.
            </p>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-[var(--color-software)]/60 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--color-software-soft)] blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-software-soft)] px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-software)]" />
              Software / Engineering Track
            </span>
            <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Real-time 3D, Simulation, and Backend Systems
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Six years of Unity development across games, simulators, and
              digital twins — including an Autoware-compatible autonomous
              driving simulator built with the University of Tokyo. Comfortable
              across Go, Java, Python, React, and Three.js with the databases
              and infra to back them.
            </p>
          </div>
        </article>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-500">
          Research interests
        </h3>
        <ul className="flex flex-wrap gap-2">
          {researchInterests.map((interest) => (
            <li
              key={interest}
              className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300"
            >
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
