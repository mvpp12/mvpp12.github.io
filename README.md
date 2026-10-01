# Mark Vincent Plaza — Portfolio

Personal portfolio at **https://mvpp12.github.io**.

Plain HTML, CSS and JavaScript with no frameworks or build step. GitHub Pages serves the repo root as-is.

## Structure

```
index.html          page markup + inline SVG icon set
styles.css          design tokens (dark + light themes), layout, components
script.js           theme toggle, mobile menu, scroll reveal, headline rotator, copy-email
assets/img/         optimized WebP images (portraits, project screenshots)
assets/favicon.svg
```

## Editing

- **Add a project:** copy one `<article class="project">` block in `index.html`, then put a 1200×750 screenshot in `assets/img/`.
- **Colors / fonts / spacing:** change the tokens at the top of `styles.css`. The dark and light themes each have their own block.
- **Headline words:** edit the `.rotator__word` spans in the hero.

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.
