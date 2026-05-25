import { site } from '../../data/content'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="reading py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-sans text-[13px] text-dim">
        <p>
          © {year} Vinith Wade. Built with care, in Hyderabad.
        </p>
        <div className="flex items-center gap-6">
          <a href={`mailto:${site.email}`} className="link">
            Email
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="link">
            Github
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="link">
            Linkedin
          </a>
          <a href="#hero" className="link">
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  )
}
