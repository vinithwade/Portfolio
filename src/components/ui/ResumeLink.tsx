import { site } from '../../data/content'

export function ResumeLink() {
  return (
    <a href={site.resume} download={site.resumeFilename} className="link touch-target py-1">
      Download resume <span className="ml-1 text-[10px] text-black/50">PDF ↓</span>
    </a>
  )
}
