# Monitors

## Overview

### Available Operations

* [create](#create) - Create monitor
* [list](#list) - List monitors
* [update](#update) - Update monitor
* [delete](#delete) - Delete monitor
* [get](#get) - Get monitor
* [runNow](#runnow) - Run monitor now
* [listEvents](#listevents) - List monitor events

## create

Create a recurring monitor that runs on a schedule and stores matching events for later review.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createMonitor" method="post" path="/api/v1/monitors" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.monitors.create({
    name: "Competitor mentions",
    type: "site_search",
    config: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { monitorsCreate } from "@the-hog/sdk/funcs/monitors-create.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await monitorsCreate(theHog, {
    name: "Competitor mentions",
    type: "site_search",
    config: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("monitorsCreate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.CreateMonitorDto](../../models/create-monitor-dto.md)                                                                                                                  | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MonitorResponseDto](../../models/monitor-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 404                 | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## list

List monitors for your organization.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listMonitors" method="get" path="/api/v1/monitors" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.monitors.list();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { monitorsList } from "@the-hog/sdk/funcs/monitors-list.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await monitorsList(theHog);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("monitorsList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `status`                                                                                                                                                                       | *any*                                                                                                                                                                          | :heavy_minus_sign:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `limit`                                                                                                                                                                        | *number*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `cursor`                                                                                                                                                                       | *any*                                                                                                                                                                          | :heavy_minus_sign:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MonitorListResponseDto](../../models/monitor-list-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 401, 404                      | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## update

Update a monitor configuration, schedule, or status.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="updateMonitor" method="patch" path="/api/v1/monitors/{id}" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.monitors.update({}, "<id>");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { monitorsUpdate } from "@the-hog/sdk/funcs/monitors-update.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await monitorsUpdate(theHog, {}, "<id>");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("monitorsUpdate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Monitor ID.                                                                                                                                                                    |
| `body`                                                                                                                                                                         | [models.UpdateMonitorDto](../../models/update-monitor-dto.md)                                                                                                                  | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MonitorResponseDto](../../models/monitor-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 404                 | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## delete

Delete a monitor by ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteMonitor" method="delete" path="/api/v1/monitors/{id}" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  await theHog.monitors.delete("<id>");


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { monitorsDelete } from "@the-hog/sdk/funcs/monitors-delete.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await monitorsDelete(theHog, "<id>");
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("monitorsDelete failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Monitor ID.                                                                                                                                                                    |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 401, 404                      | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## get

Retrieve a monitor by ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getMonitor" method="get" path="/api/v1/monitors/{id}" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.monitors.get("<id>");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { monitorsGet } from "@the-hog/sdk/funcs/monitors-get.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await monitorsGet(theHog, "<id>");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("monitorsGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Monitor ID.                                                                                                                                                                    |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MonitorResponseDto](../../models/monitor-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 401, 404                      | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## runNow

Trigger a monitor run immediately instead of waiting for its next scheduled time.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="runMonitorNow" method="post" path="/api/v1/monitors/{id}/run-now" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.monitors.runNow("<id>");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { monitorsRunNow } from "@the-hog/sdk/funcs/monitors-run-now.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await monitorsRunNow(theHog, "<id>");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("monitorsRunNow failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Monitor ID.                                                                                                                                                                    |
| `body`                                                                                                                                                                         | [models.RunNowBodyDto](../../models/run-now-body-dto.md)                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MonitorResponseDto](../../models/monitor-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 404                 | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## listEvents

List events found by a monitor.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listMonitorEvents" method="get" path="/api/v1/monitors/{id}/events" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.monitors.listEvents("<id>");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { monitorsListEvents } from "@the-hog/sdk/funcs/monitors-list-events.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await monitorsListEvents(theHog, "<id>");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("monitorsListEvents failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Monitor ID.                                                                                                                                                                    |
| `since`                                                                                                                                                                        | *any*                                                                                                                                                                          | :heavy_minus_sign:                                                                                                                                                             | ISO timestamp — only return events detected after this time                                                                                                                    |
| `limit`                                                                                                                                                                        | *number*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `cursor`                                                                                                                                                                       | *any*                                                                                                                                                                          | :heavy_minus_sign:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MonitorEventListResponseDto](../../models/monitor-event-list-response-dto.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 401, 404                      | application/json              |
| errors.PublicErrorResponseDto | 500                           | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |