# Personal Website

A personal CV / portfolio website. Currently a static HTML/CSS/JS site; planned to grow
into a full-stack app with a database-backed section (e.g. a projects API or a contact
form with persistence).

## Structure

```
index.html      Main page (CV content — edit the [placeholder] text)
css/style.css   Styling
js/script.js    Small bits of interactivity (nav toggle, footer year)
assets/         Images, downloadable CV PDF, etc.
```

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

- Replace all `[bracketed placeholder]` text in `index.html` with real content.
- Add a real `assets/cv.pdf` or remove the download link.
- Update the contact links (email, LinkedIn, GitHub).

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
