# Personal Website

A personal CV / portfolio website, split across multiple pages. Currently a static
HTML/CSS/JS site; planned to grow into a full-stack app with a database-backed section
(e.g. a projects API or a contact form with persistence).

## Structure

```
index.html          Intro / home page
experience.html      Education + work, combined timeline
skills.html           Skills + certificates (rendered from JSON)
projects.html         Personal and family/friends projects (rendered from JSON)
travels.html          Natural wonders tracker: progress, status list, detail cards (rendered from JSON)

css/style.css        Shared styling for every page
js/script.js          Shared interactivity: nav toggle, footer year (every page)
js/skills.js           Fetches data/skills.json + data/certificates.json, renders skills.html
js/projects.js          Fetches data/projects.json, renders projects.html
js/travels.js           Fetches data/wonders.json, renders travels.html (progress bar, status list, cards)

data/skills.json       Skill categories + skills
data/certificates.json Certificates: name, issuer, date, credential link
data/projects.json     Projects: title, description, image, tags, category, GitHub link
data/wonders.json      Natural wonders: name, country, location, tag, images, intro, visited

assets/               Images, downloadable CV PDF, etc.
assets/projects/       Project thumbnail images (referenced from data/projects.json)
assets/wonders/        Wonder photos (referenced from data/wonders.json)
```

Every page shares the same header/nav and footer markup, copy-pasted into each `.html`
file — plain HTML has no built-in way to share an "include" across files. Each page sets
`class="active"` on its own nav link. If you add or rename a nav link, that change
currently has to be made by hand in all five `.html` files.

## Running locally

No build step needed. Either open `index.html` directly in a browser, or serve it so
relative paths behave the same as in production:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## TODO before publishing

- Replace all `[bracketed placeholder]` text across the `.html` files with real content.
- Fill in `data/skills.json`, `data/certificates.json`, `data/projects.json`, and
  `data/wonders.json` with real entries.
- Add a real `assets/profile.jpg` (used in the Intro page hero) and real images to
  `assets/projects/` and `assets/wonders/`, updating the `image`/`images` fields in the
  matching JSON files — they currently point at placeholders that don't exist, so those
  images will show broken until then.
- Add a real `assets/cv.pdf` or remove the download link.
- Update the contact links in every page's footer (email, LinkedIn, GitHub).

## Security notes

- **No secrets in this repo.** Any future API keys, database credentials, or tokens go
  in a local `.env` file, which is git-ignored (see `.gitignore`). Only commit an
  `.env.example` with placeholder values, never real ones.
- **Static content only, for now.** There is no server-side code or database yet, so
  there's no attack surface beyond standard static hosting.
- **When the backend is added later:**
  - Never trust client input — validate and sanitize on the server.
  - Use parameterized queries / an ORM to avoid SQL injection.
  - Store credentials/secrets in environment variables or a secrets manager, never in code.
  - Serve everything over HTTPS.
  - Keep dependencies up to date (`npm audit` / `pip list --outdated`).
  - Rate-limit and validate any public form (e.g. contact form) to prevent abuse.
