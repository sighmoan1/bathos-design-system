# Bathos design system

Canonical catalogue: https://design.bathos.org. The versioned package is the source of truth for shared tokens, accessible components and palettes. It has no runtime dependency on the catalogue or Cloudflare.

## Consume a release

Install an exact release archive and commit the resulting lockfile:

```sh
npm install @bathos/design-system@https://github.com/sighmoan1/bathos-design-system/releases/download/v1.1.0/bathos-design-system-1.1.0.tgz
```

Import `styles/tokens.css`, `styles/base.css`, `styles/components.css` and `styles/palettes.css` once. Set `data-bathos-palette` on the document root to choose `deep-water-red`, `stone-vermilion` or `ink-teal`. Each app bundles its selected CSS locally.

For an existing theme, import `styles/foundation.css` and `styles/palettes.css`. Tokens are namespaced `--bathos-*`; set the same document-root attribute, then map a deliberate subset into the service theme. Preserve service layouts and interaction behaviour.

## Per-site settings

Each site owns its own `bathos-design-system.json` in that site's repository. The file pins both the package version and palette:

```json
{
  "version": "1.1.0",
  "palette": "deep-water-red"
}
```

Change the file in the site you want to update. The shared design-system repository does not hold a registry of consumer choices. The catalogue's selector previews a palette across the whole catalogue in your browser; it does not write settings or deploy a change.

An app's build reads the palette from its local file and sets `data-bathos-palette` on the document root. Its update workflow reads the local version, verifies the matching stable release archive, and prepares a pinned dependency update for that app. No site loads a floating `latest` version or a remote stylesheet at runtime.

## Releases and deployment

`npm ci && npm test` builds the typed ESM package and catalogue. Commit generated `dist/` outputs when component exports change. CI verifies generated output matches source.

Use semantic versions. Patch releases fix defects; minor releases add compatible features; major releases require deliberate migration. Consumer sites install their locally configured package version, run their own checks and deploy through their own release path.

Keep the previous package version and deployment available for rollback. A catalogue outage cannot affect apps because they bundle release files locally.

## Components and accessibility

React exports: Button, ButtonLink, Field, Panel and Notice. Buttons keep native disabled behaviour, links navigate, and fields expose help and error text. Pair colours with text, shape or placement. Test text at 4.5:1 and meaningful interface boundaries at 3:1. Focus uses a high-contrast two-tone outline. Controls have at least a 44px target.

Keep service-specific status vocabulary and page layouts in consuming apps. Use semantic tokens in new styles and preserve compatibility aliases while existing pages migrate.
