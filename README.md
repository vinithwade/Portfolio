# Vinith Wade — Portfolio

A personal portfolio for Vinith Wade: backend engineering, distributed systems,
and AI products, with a monochrome constellation theme.

## Development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run build
npm run lint
```

## Content

Edit `src/data/content.ts` for the profile, introduction, education, experience,
services, skills, projects, achievements, and current focus. The page and chatbot
both read from this shared source. UI and motion remain in `src/components`.

The original resume is served from `public/VinithWade_SDE1.pdf`. Replace that file
to refresh the download, or update `site.resume` and `site.resumeFilename`.
Download links appear in the introduction, Contact, and resume-only project details.

## Content sources and open details

The supplied SDE1 resume is the source for education, MindFlow and Zipp roles,
the Java transaction project, skills, publication, and achievements. Public GitHub
READMEs and repository descriptions supply featured project functionality and links.
The earlier Behooked and Digital Blinc internships are retained from the original
portfolio; Behooked's end date and current employment status are unconfirmed.
The Java transaction pipeline has no supplied public repository, so its details
link to the resume. The public sepsis repository demonstrates Random Forest on
synthetic data; the resume's GRU/LSTM + XGBoost research is described separately.

## Assistant

The chat falls back to local answers when the existing `/api/chat` endpoint is
unavailable. Live AI configuration remains server-side; it is not needed to
preview the portfolio or download the resume.

## Responsive layout

Desktop screens keep the portrait sidebar and section navigation. Phone and tablet
screens use a compact column, a portrait above the introduction, a persistent
header thumbnail, and native scrolling. The menu, project dialogs, and assistant
adapt to the available viewport; anchor scrolling accounts for the fixed header.
