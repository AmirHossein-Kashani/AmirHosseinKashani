/**
 * Build a URL for an asset stored under public/ from a leading-slash path
 * like "/projects/foo.png".
 *
 * Vite rewrites absolute `/`-paths inside index.html and module imports
 * based on the configured `base`, but it does NOT rewrite string literals
 * that live in data files and reach the DOM at runtime (e.g. an image URL
 * stored in src/data/projects.ts). When the site is deployed under a
 * sub-path on GitHub Pages — e.g. /AmirHosseinKashaniCV/ — those runtime
 * paths break unless we prepend `import.meta.env.BASE_URL` ourselves.
 *
 * Usage:
 *   <img src={asset(project.image)} />
 *
 * Inputs may start with "/" or not; the result always uses the configured
 * base. `BASE_URL` always ends with "/".
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}
