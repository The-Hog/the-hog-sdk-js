# Companies

## Overview

### Available Operations

* [search](#search) - Search companies

## search

Async company discovery. Returns operationId; poll GET /api/operations/:id.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="searchCompanies" method="post" path="/api/v1/companies/search" -->
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

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { companiesSearch } from "@the-hog/sdk/funcs/companies-search.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await companiesSearch(theHog, {
    query: "B2B SaaS companies in Austin hiring engineers",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("companiesSearch failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `body`                                                                                                                                                                         | [models.PostCompanySearchDto](../../models/post-company-search-dto.md)                                                                                                         | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `idempotencyKey`                                                                                                                                                               | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | Optional. Reusing the same key for the same organization returns the existing queued operation.                                                                                |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.EntitySearchAcceptedPublicDto](../../models/entity-search-accepted-public-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |