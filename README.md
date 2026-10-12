# Bathos design system

Canonical catalogue: https://design.bathos.org. The versioned package is the source of truth. It has no runtime dependency on the catalogue or Cloudflare.

## Consume a release

Install an exact release archive and commit the resulting lockfile:

```sh
npm install @bathos/design-system@https://github.com/sighmoan1/bathos-design-system/releases/download/v1.1.0/bathos-design-system-1.1.0.tgz
```

Import `styles/tokens.css`, `styles/base.css`, `styles/components.css` and `styles/palettes.css` once. Set `data-bathos-palette` on the document root to choose one of the three palettes: `deep-water-red`, `stone-vermilion` or `ink-teal`. Each app bundles its selected CSS locally. The catalogue previews all three palettes side by side.

For existing themes, import `styles/foundation.css` and `styles/palettes.css`. Tokens are namespaced `--bathos-*`; set the same document-root attribute, then map a deliberate subset into the service theme. Preserve service layouts and interaction behaviour.

## App deployment settings

`deployments.json` is the central map from each registered app to an exact package version and palette. Update one app without changing the others. Consumer update workflows read the app's entry, confirm the exact stable release archive exists, and prepare the app's build with that version and palette. Downgrades can be used for a deliberate rollback. No consumer loads a floating `latest` version or remote stylesheet at runtime.

`npm run validate:deployments` checks the manifest names, repositories, pinned versions and palette IDs. Register an app only after it has a build path for the shared package.

## Releases and deployment

`npm ci && npm test` builds the typed ESM package and catalogue. Commit generated `dist/` outputs when component exports change. CI verifies generated output matches source.

Use semantic versions. Patch releases fix defects; minor releases add compatible features; major releases require deliberate migration. The release workflow verifies version/tag agreement and attaches the package archive. Consumer apps verify and adopt their pinned version through their own build and deployment path.

The catalogue uses Git-connected Cloudflare Pages (`bathos-design-system`, build `npm test`, output `site-out`). A catalogue outage cannot affect apps because they bundle release files locally.

## Components and accessibility

React exports: Button, ButtonLink, Field, Panel and Notice. Buttons keep native disabled behaviour, links navigate, and fields expose help and error text. Pair colours with text, shape or placement. Test text at 4.5:1 and meaningful interface boundaries at 3:1. Focus uses a high-contrast two-tone outline. Controls have at least a 44px target.

Keep service-specific status vocabulary and page layouts in consuming apps. Use semantic tokens in new styles and preserve compatibility aliases while existing pages migrate.
