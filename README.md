# @the-hog/sdk

Official TypeScript SDK for The Hog API.

```bash
npm install @the-hog/sdk
```

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
