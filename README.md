# @the-hog/sdk

Official TypeScript SDK for The Hog API.

## Install

```bash
npm install @the-hog/sdk
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

## API Reference

- [Companies](docs/sdks/companies/README.md)
- [People](docs/sdks/people/README.md)
- [Deep Research](docs/sdks/deepresearch/README.md)
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
