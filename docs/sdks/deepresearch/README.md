# DeepResearch

## Overview

### Available Operations

* [start](#start) - Start deep research

## start

Start a deep research job with a prompt and JSON Schema. The response includes an operation ID and poll URL for retrieving the structured result.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="startDeepResearch" method="post" path="/api/deep-research" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.deepResearch.start({
    prompt: "Research AI CRM competitors",
    schema: {
      "type": "object",
      "properties": {
        "competitors": {
          "type": "array",
        },
      },
    },
    inputAnchors: [
      {
        "input_anchor": {
          "candidate_index": 1,
        },
      },
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
import { deepResearchStart } from "@the-hog/sdk/funcs/deep-research-start.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await deepResearchStart(theHog, {
    prompt: "Research AI CRM competitors",
    schema: {
      "type": "object",
      "properties": {
        "competitors": {
          "type": "array",
        },
      },
    },
    inputAnchors: [
      {
        "input_anchor": {
          "candidate_index": 1,
        },
      },
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("deepResearchStart failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `body`                                                                                                                                                                         | [models.DeepResearchRequestDto](../../models/deep-research-request-dto.md)                                                                                                     | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `idempotencyKey`                                                                                                                                                               | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | Prevents duplicate work if you retry the same request with the same key.                                                                                                       |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.DeepResearchQueuedResponseDto](../../models/deep-research-queued-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |