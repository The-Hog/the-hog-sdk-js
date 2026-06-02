# @the-hog/sdk

Official TypeScript SDK and lightweight CLI for [The Hog](https://thehog.ai).

The Hog API helps you find companies and people, enrich known prospects, run
structured deep research, search public web/social sources, and monitor topics
over time. This package is the best fit when you want to call those workflows
from a Node.js, Bun, Deno, browser, or TypeScript application.

## Install

Current public install:

```bash
npm install github:The-Hog/the-hog-sdk-js
```

After the npm package is published, you can install from the registry instead:

```bash
npm install @the-hog/sdk
```

Run the packaged CLI:

```bash
npx the-hog --help
```

After npm publication, this also works without a project install:

```bash
npx @the-hog/sdk --help
```

## Authenticate

Create API credentials in The Hog, then set both environment variables:

```bash
export THE_HOG_ACCESS_KEY="<access-key>"
export THE_HOG_SECRET_KEY="<secret-key>"
```

The default API base URL is `https://developer.thehog.ai`. For staging or local
development, set:

```bash
export THE_HOG_SERVER_URL="https://developer.thehog.ai"
```

Check credentials:

```bash
npx the-hog auth status
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
  limit: 5,
});

const operation = await hog.operations.wait(queued.operationId, {
  timeoutMs: 120_000,
});

console.log(operation.result);
```

You can also use the generated `security` shape directly:

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
  limit: 5,
});

const operation = await hog.operations.wait(queued.operationId, {
  timeoutMs: 120_000,
});

console.log(operation.result);
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
          required: ["name", "reason"],
        },
      },
    },
    required: ["companies"],
  },
});

const operation = await hog.operations.wait(queued.operationId, {
  timeoutMs: 180_000,
});

console.log(operation.result);
```

### Enrichment

```ts
const queued = await hog.enrichments.submit({
  identifier: {
    linkedin_url: "https://www.linkedin.com/in/example",
  },
  fields: ["contact.email", "signals"],
});

const enrichment = await hog.enrichments.get(queued.id);
console.log(enrichment);
```

### Idempotent Requests

For async searches and write-like operations, pass an idempotency key as the
second argument so retries do not create duplicate work:

```ts
await hog.companies.search(
  { query: "cybersecurity startups in London", limit: 10 },
  "company-search-2026-06-02",
);
```

## CLI

The package includes a small `the-hog` CLI for scripts and quick checks:

```bash
the-hog auth status
the-hog companies search --query "B2B SaaS companies hiring engineers" --limit 5
the-hog people search --query "VP Engineering at fintech companies" --include-contacts
the-hog deep-research start --body '{"prompt":"Find AI voice agent companies","schema":{"type":"object"}}'
the-hog enrichments submit --body-file enrichment.json
the-hog operations get op_123
the-hog operations wait op_123 --interval-ms 2000 --timeout-ms 120000
```

For a fuller terminal and local-agent experience, use the standalone
[`thehog` CLI](https://github.com/The-Hog/the-hog-cli). The SDK package CLI is
intentionally small and focused on common API workflows.

## Runtime Support

- Node.js 18 or newer
- Bun 1 or newer
- Deno 1.39 or newer
- Modern browsers with `fetch`

See [Runtime Support](RUNTIMES.md) for details.

## Releases

Tagged releases publish `@the-hog/sdk` to npm with provenance.

```bash
npm ci
npm run check
npm pack --dry-run
git tag v0.1.0
git push origin v0.1.0
```

See [SDK and CLI Publishing](docs/publishing.md) for the maintainer release
flow. OpenAPI changes should open reviewed SDK generation PRs; publishing only
happens from version tags in this repo.

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
- [Standalone Functions](FUNCTIONS.md)
