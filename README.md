# @the-hog/sdk

Official TypeScript SDK for The Hog API.

## Install

```bash
npm install @the-hog/sdk
```

The package also includes the v1 CLI:

```bash
npx @the-hog/sdk --help
```

## Quickstart

```ts
import { TheHog } from "@the-hog/sdk";

const hog = new TheHog({
  accessKey: process.env.THE_HOG_ACCESS_KEY,
  secretKey: process.env.THE_HOG_SECRET_KEY,
});

const queued = await hog.companies.search({
  query: "B2B SaaS companies in Austin hiring engineers",
});

const operation = await hog.operations.wait(queued.operationId);
console.log(operation.result);
```

You can also use the generated auth shape directly:

```ts
const hog = new TheHog({
  security: {
    accessKey: process.env.THE_HOG_ACCESS_KEY,
    secretKey: process.env.THE_HOG_SECRET_KEY,
  },
});
```

## Common Workflows

### People Search

```ts
const queued = await hog.people.search({
  query: "VP Engineering at fintech companies in New York",
  includeContacts: true,
});

const operation = await hog.operations.wait(queued.operationId);
```

### Deep Research

```ts
const queued = await hog.deepResearch.start({
  prompt: "Find companies building AI voice agents for healthcare.",
  schema: {
    type: "object",
    properties: {
      companies: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            website: { type: "string" },
            reason: { type: "string" },
          },
        },
      },
    },
  },
});

const operation = await hog.operations.wait(queued.operationId);
```

### Idempotent Writes

```ts
await hog.companies.search(
  { query: "cybersecurity startups in London" },
  "company-search-2026-05-27",
);
```

## CLI

Set credentials with environment variables:

```bash
export THE_HOG_ACCESS_KEY=...
export THE_HOG_SECRET_KEY=...
```

Run core workflows:

```bash
the-hog auth status
the-hog companies search --query "B2B SaaS companies hiring engineers"
the-hog people search --query "VP Engineering at fintech companies" --include-contacts
the-hog deep-research start --body '{"prompt":"Find AI voice agent companies","schema":{"type":"object"}}'
the-hog enrichments submit --body-file enrichment.json
the-hog operations get op_123
the-hog operations wait op_123 --interval-ms 2000 --timeout-ms 120000
```

For local or staging API testing, set `THE_HOG_SERVER_URL` or pass `--server-url`.

## Releases

SDK generation and publishing are separate. OpenAPI changes should open reviewed SDK PRs; publishing only happens from version tags in this repo.

```bash
npm ci
npm run check
npm pack --dry-run
git tag v0.2.0
git push origin v0.2.0
```

Tagged releases publish `@the-hog/sdk` to npm. The CLI is distributed from the same package for v1 through the `the-hog` bin.

Mintlify API docs are published from `the-hog-core-api/mintlify`; this README links to the generated SDK references below.

See [SDK and CLI Publishing](docs/publishing.md) for the release flow across TypeScript, CLI, Python, and Mintlify docs.

## API Reference

- [Companies](docs/sdks/companies/README.md)
- [People](docs/sdks/people/README.md)
- [Deep Research](docs/sdks/deep-research/README.md)
- [Operations](docs/sdks/operations/README.md)
- [Enrichments](docs/sdks/enrichments/README.md)
- [Search](docs/sdks/search/README.md)
- [Monitors](docs/sdks/monitors/README.md)
- [Instagram Scrapers](docs/sdks/instagram/README.md)
- [LinkedIn Scrapers](docs/sdks/linkedin/README.md)
- [TikTok Scrapers](docs/sdks/tiktok/README.md)
- [Web Scrapers](docs/sdks/web/README.md)
- [Runtime Support](RUNTIMES.md)
- [Standalone Functions](FUNCTIONS.md)
