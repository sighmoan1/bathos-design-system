# Bathos design system

Canonical catalogue: https://design.bathos.org. Source extracted from Cultivate's deployed design system. This package has no runtime dependency on the catalogue or Cloudflare.

## Consume a release

Install the release archive as `@bathos/design-system` and commit the resulting lockfile:

```sh
npm install @bathos/design-system@https://github.com/sighmoan1/bathos-design-system/releases/download/v1.0.0/bathos-design-system-1.0.0.tgz
```

Import `styles/tokens.css`, `styles/base.css` and `styles/components.css` once for the complete light system. React exports: Button, ButtonLink (a native anchor), Field, Panel, Notice. Framework-specific navigation adapters remain in the consumer.

For existing themes, use `styles/foundation.css`: every token is namespaced `--bathos-*`, avoiding Tailwind and GOV.UK token collisions. Map a deliberate subset into the existing service theme. Preserve service-specific layouts, focus rules and interaction behaviour. Cultivate continues to own its evidence status vocabulary, maps and page layout.

## Releases and deployment

`npm ci && npm test` builds the typed ESM package and catalogue. Commit the generated `dist/` outputs so package archives and source tags are directly installable. CI verifies generated output matches source.

Use semantic versions. Change package.json, rebuild dist, open a PR and run checks. On approved main, create an immutable `vX.Y.Z` GitHub release. The release workflow verifies version/tag agreement, attaches the package archive and deploys the catalogue. Roll back consumers by reverting their version/lockfile PR; roll back the catalogue by deploying the prior release.

The deploy workflow requires repository secret `CLOUDFLARE_API_TOKEN` (Workers Scripts Edit and Zone Read for the Bathos account/zone) and variable `CLOUDFLARE_ACCOUNT_ID`. Initial custom-domain attachment can be managed through the connected Cloudflare API; deployment need not modify other Bathos DNS records.

Consumer update workflows check stable releases on a schedule and on demand. They open one update PR per branch, run consumer verification before requesting adoption, and rebuild/deploy after merge. Update PR creation needs an authorised repository token in `DESIGN_SYSTEM_UPDATE_TOKEN` if repository settings disallow GITHUB_TOKEN-created PRs. A dedicated token also allows downstream PR checks to run: GitHub suppresses most new workflow events created using GITHUB_TOKEN. Never automatically merge a major upgrade. No runtime remote stylesheet or floating `latest` dependency is used.

## Inventory and limits

- bathos.org and www: sighmoan1/bathos; Cloudflare Pages, initially manual upload.
- cultivate.bathos.org: sighmoan1/cultivate; Cloudflare Pages, Git-connected main and preview deployments.
- about-demo, delegate-demo, hmrc-demo, login-demo, whenisbins-demo: sighmoan1/govuk-delegate-starter; five loopback services behind one local Cloudflare Tunnel. These require the local operator to rebuild/restart services; a GitHub merge alone is not a deployment.
- pdcanon.bathos.org: separate Cloudflare Tunnel; source/operator not yet identified.
- gas.bathos.org: Tailscale-only dashboard; source/operator not yet identified.

New properties must adopt a pinned package, verification and update/deployment workflow. A DNS record alone cannot cause design changes to propagate to an unrelated application.
