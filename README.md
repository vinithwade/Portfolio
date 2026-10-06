# Vinith Wade — Portfolio

A personal portfolio for Vinith Wade: backend engineering, machine learning,
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

The page and both navigation menus follow the same order: Overview, Projects,
Experience, Skills, Expertise, About & Education, Achievements, Current Focus,
and Contact. Projects and experience appear first to show evidence of the work
before the supporting background.

The updated resume is served from `public/VinithWade_SDE.pdf`. Replace that file
to refresh the download, or update `site.resume` and `site.resumeFilename`.
Download links appear in the introduction and Contact. The previous SDE1 URL also
serves the updated PDF for visitors with an older link.

## Content sources and open details

The supplied `VinithWade_SDE.pdf` resume is the source for education and CGPA,
MindFlow and Zipp founder roles, the Corizo data science internship, OneSearch,
Dekho, CipherMail, skills, publication, and achievements. Experience and skills
now follow this resume; the older resume-only transaction pipeline is no longer
featured. Additional public GitHub projects remain available on the page.
Public GitHub READMEs and repository descriptions supply their functionality
and links. The public sepsis repository demonstrates Random Forest on synthetic
data; the resume's GRU/LSTM + XGBoost research and reported results are described
separately in project details. No listed role is presented as current employment.

## Assistant

The chat falls back to local answers when the existing `/api/chat` endpoint is
unavailable. Live AI configuration remains server-side; it is not needed to
preview the portfolio or download the resume.

## Responsive layout

Desktop screens keep the portrait sidebar and section navigation. Phone and tablet
screens use a compact column, a portrait above the introduction, a persistent
header thumbnail, and native scrolling. The menu, project dialogs, and assistant
adapt to the available viewport; anchor scrolling accounts for the fixed header.

## Themes

The site follows `prefers-color-scheme` by default, including system changes during
a visit. The light/dark toggle sits beside Menu on smaller screens and in the
desktop sidebar. A manual choice is saved in local storage and takes priority
over the system preference. Theme colors cover the page, menus, project dialogs,
skill cards, and assistant. An early head script sets the theme before first paint.
