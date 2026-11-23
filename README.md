# HKALHL website

Static Traditional Chinese site built with Astro and deployed to Cloudflare Pages.

## Local development

- Node.js 22.12 or newer
- `npm install`
- `npm run dev`
- `npm run build`

Cloudflare Pages build settings: `npm run build`, output directory `dist`.

## Content and media

The site renders the updated root-level `facebook_image_posts.json` at build time. It sorts event cards by `eventDateISO` and displays `eventDate`; `postDate` is not used as the event label. News categories are `專科義診`, `醫診到會`, `社區關懷`, and `重大盛事`; `醫診到會` takes priority when a post contains that phrase. The legacy `src/data/facebook_data.json` is retained only for its album collection. The archive contains Facebook CDN image URLs; these are temporary signed URLs and must be migrated to the association's permanent media host (planned: Cloudflare R2 at `media.hkalhl.org`) before a production launch. Do not add R2 credentials to the repository.

### Pages CMS

The repository is configured for Pages CMS in `.pages.yml`. Open [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, install the Pages CMS GitHub App with access to `cafe-free/hkalhl_website`, and select the `dev` branch. The `活動紀錄` editor manages `facebook_image_posts.json`; newly uploaded images are stored in `public/event-images/`.

The GitHub Actions workflow builds and deploys CMS changes from `dev` or `main` to the existing Cloudflare Pages production branch. In the GitHub repository settings, add the `CLOUDFLARE_API_TOKEN` Actions secret with Cloudflare Pages edit permission and the `CLOUDFLARE_ACCOUNT_ID` Actions variable. The account ID is available in Cloudflare's dashboard. The workflow can also be started manually from the Actions tab.

Contact and membership actions currently use direct email links. They do not submit to a backend; configure and verify a privacy-appropriate form service before replacing them with online forms.
