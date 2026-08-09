# Wasla Operations Guide

A static, interactive cofounder guide synthesized from Wasla's canonical Phase 0 specifications.

## Run locally

From the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/operations-guide/`.

The guide also works by opening `index.html` directly. It has no runtime dependencies, API, database, analytics, or external assets.

## Validate

```bash
npm --prefix operations-guide run build
```

The build command validates the static bundle and copies publishable files to `operations-guide/dist/`.

## Fastest one-time share: Netlify Drop

1. Run `npm --prefix operations-guide run build` from the repository root.
2. Open `https://app.netlify.com/drop` and sign in.
3. Drag the generated `operations-guide/dist` folder onto the page.
4. Netlify returns a public `https://...netlify.app` URL. Rename the site in Netlify settings if desired.

Only the generated guide bundle is uploaded. No specification, workbook, repository history, or private project file is included.

## Repeatable publishing: Cloudflare Pages

1. Push the repository to a private or public Git provider supported by Cloudflare Pages.
2. In Cloudflare Pages choose **Create a project → Connect to Git**.
3. Set the root directory to `operations-guide`.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Deploy. Cloudflare returns a URL such as `https://wasla-operations-guide.pages.dev`.

Only the guide bundle is copied to `dist`; project specifications and repository files are not published.

## GitHub Pages

The repository includes `.github/workflows/operations-guide-pages.yml`. On a push affecting `operations-guide/`, GitHub Actions validates the guide and publishes only `operations-guide/dist`.

After the first push, open **Repository Settings → Pages** and set **Source** to **GitHub Actions**. Run the workflow manually if the initial push does not trigger it. The public URL will be shown in the workflow deployment and normally follows `https://USERNAME.github.io/REPOSITORY/`.
