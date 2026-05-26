<!-- Start SDK Example Usage [usage] -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.companies.search({
    query: "B2B SaaS companies in Austin hiring engineers",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->