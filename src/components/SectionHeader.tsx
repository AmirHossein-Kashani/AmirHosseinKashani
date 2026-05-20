type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl dark:text-neutral-100">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
