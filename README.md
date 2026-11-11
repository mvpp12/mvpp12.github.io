# Mark Vincent Plaza — Portfolio

Personal portfolio at **https://mvpp12.github.io**.

Plain HTML, CSS and JavaScript with no frameworks or build step. GitHub Pages serves the repo root as-is.

## Structure

```
index.html          page markup + inline SVG icon set
styles.css          design tokens (dark + light themes), layout, components
script.js           theme toggle, mobile menu, scroll reveal, headline rotator, copy-email,
                    photo viewer, contact form, live GitHub stat, analytics switch
assets/img/         optimized WebP images (portraits, project screenshots)
assets/fonts/       self-hosted variable fonts (Bricolage Grotesque, Geist, Geist Mono)
assets/favicon.svg
robots.txt, sitemap.xml
```

## Things that talk to other services

- **Contact form:** posts to [FormSubmit](https://formsubmit.co) (`data-endpoint` on `#contact-form`), which forwards
  the message to the email in that URL. The first message ever sent triggers a one-time activation email.
- **GitHub stat in the hero:** read from `data.json` in the `mvpp12/mvpp12` profile repo, which a daily workflow refreshes.
- **Analytics:** off by default. Set `GOATCOUNTER_CODE` in `script.js` to a [GoatCounter](https://www.goatcounter.com) site code to turn it on.

## Editing

- **Add a project:** copy one `<article class="project">` block in `index.html`, then put a 1200×750 screenshot in `assets/img/`
  plus an 800×500 copy named `<name>-800.webp` for phones.
- **Add a zoomable photo:** wrap the image in `<a class="zoom" href="full-size.webp" data-zoom data-caption="…">`.
- **Colors / fonts / spacing:** change the tokens at the top of `styles.css`. The dark and light themes each have their own block.
- **Headline words:** edit the `.rotator__word` spans in the hero.

## Run locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.
