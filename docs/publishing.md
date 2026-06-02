# SDK and CLI Publishing

Generation and publishing are separate.

OpenAPI changes in `the-hog-core-api` should dispatch SDK generation into this repo. The generated diff is reviewed and merged like any other SDK change. Publishing only happens from version tags in this repo.

## TypeScript and CLI

- Package: `@the-hog/sdk`
- Registry: npm
- CLI bin: `the-hog`
- Install: `npm install @the-hog/sdk`
- CLI use: `npx @the-hog/sdk --help`

Release tags are the publishing trigger. Use normal semver tags for npm
releases:

```bash
npm ci
npm run check
npm pack --dry-run
git tag v0.1.0
git push origin v0.1.0
```

The GitHub release workflow builds, tests, runs a pack dry-run, verifies `the-hog --help`, and publishes to npm with provenance. Prefer npm Trusted Publishing for the `npm` environment; keep `NPM_TOKEN` only as a fallback.

## Python

Python should live in a separate repo and publish `the-hog` to PyPI. It should follow the same split:

- OpenAPI change opens a Python SDK generation PR.
- Maintainer reviews and merges.
- Version tag builds, tests, packages, and publishes.
- Prefer PyPI Trusted Publishing/OIDC.

## Docs

Mintlify docs publish from `the-hog-core-api/mintlify`, not from this SDK repo. SDK docs should link to the public API reference and include language-specific examples here.
