import { current, site } from '../../data/content'

export function Now() {
  return (
    <section id="now" className="section">
      <div className="meta mb-3">RIGHT NOW</div>
      <h2 className="heading mb-6">Where the work lives.</h2>

      <div className="max-w-[56ch] text-[14.5px] sm:text-[15px] leading-[1.75] space-y-1.5 sm:space-y-2">
        {current.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      <div className="mt-5 sm:mt-6 text-xs font-mono tracking-[0.1em] text-black/50">{site.location} · {current.updated}</div>
    </section>
  )
}
