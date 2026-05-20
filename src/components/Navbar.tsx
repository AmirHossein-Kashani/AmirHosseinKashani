type NavLink = {
  label: string
  href: string
}

const links: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white/80 px-8 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
      <a
        href="#home"
        className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
      >
        My<span className="text-accent">Portfolio</span>
      </a>
      <ul className="flex gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-accent-soft hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
