# Enrichments

## Overview

### Available Operations

* [submit](#submit) - Submit enrichment
* [get](#get) - Get enrichment

## submit

Enrich one contact or a batch of contacts with requested fields such as verified email, phone, and signals. Small contact-only requests can complete immediately; larger requests return an operation to poll.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="submitEnrichment" method="post" path="/api/enrichments" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.enrichments.submit({
    fields: [
      "contact.email",
      "signals",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { enrichmentsSubmit } from "@the-hog/sdk/funcs/enrichments-submit.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await enrichmentsSubmit(theHog, {
    fields: [
      "contact.email",
      "signals",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("enrichmentsSubmit failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `body`                                                                                                                                                                         | [models.PostEnrichmentDto](../../models/post-enrichment-dto.md)                                                                                                                | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `idempotencyKey`                                                                                                                                                               | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | Prevents duplicate work if you retry the same request with the same key.                                                                                                       |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.SubmitEnrichmentResponse](../../models/operations/submit-enrichment-response.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## get

Check the status of an enrichment request and retrieve the result once it completes.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getEnrichment" method="get" path="/api/enrichments/{id}" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.enrichments.get("<id>");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { enrichmentsGet } from "@the-hog/sdk/funcs/enrichments-get.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await enrichmentsGet(theHog, "<id>");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("enrichmentsGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Enrichment operation ID.                                                                                                                                                       |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.OperationResponseDto](../../models/operation-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 401, 404, 429                 | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |