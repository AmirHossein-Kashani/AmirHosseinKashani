type NavLink = {
  label: string
  href: string
}

const links: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Galaxy', href: '#galaxy' },
  { label: 'Publications', href: '#publications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-neutral-200/70 bg-white/75 backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-950/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a
          href="#home"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[var(--color-ai)] to-[var(--color-software)] text-xs font-bold text-white">
            AK
          </span>
          <span className="hidden sm:inline">AmirHossein Kashani</span>
        </a>
        <ul className="flex flex-wrap items-center gap-0.5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-2.5 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-accent-soft hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
