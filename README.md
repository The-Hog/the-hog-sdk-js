# @the-hog/sdk

Developer-friendly & type-safe Typescript SDK specifically catered to leverage *@the-hog/sdk* API.

[![Built by Speakeasy](https://img.shields.io/badge/Built_by-SPEAKEASY-374151?style=for-the-badge&labelColor=f3f4f6)](https://www.speakeasy.com/?utm_source=@the-hog/sdk&utm_campaign=typescript)
[![License: MIT](https://img.shields.io/badge/LICENSE_//_MIT-3b5bdb?style=for-the-badge&labelColor=eff6ff)](https://opensource.org/licenses/MIT)


<br /><br />
> [!IMPORTANT]
> This SDK is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/the-hog/the-hog). Delete this section before > publishing to a package manager.

<!-- Start Summary [summary] -->
## Summary

The Hog API: Public API reference for The Hog.
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [@the-hog/sdk](#the-hogsdk)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

> [!TIP]
> To finish publishing your SDK to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).


The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add <UNSET>
```

### PNPM

```bash
pnpm add <UNSET>
```

### Bun

```bash
bun add <UNSET>
```

### Yarn

```bash
yarn add <UNSET>
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

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

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security schemes globally:

| Name        | Type   | Scheme  | Environment Variable |
| ----------- | ------ | ------- | -------------------- |
| `accessKey` | apiKey | API key | `THE_HOG_ACCESS_KEY` |
| `secretKey` | apiKey | API key | `THE_HOG_SECRET_KEY` |

You can set the security parameters through the `security` optional parameter when initializing the SDK client instance. The selected scheme will be used by default to authenticate with the API for all operations that support it. For example:
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
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [Companies](docs/sdks/companies/README.md)

* [search](docs/sdks/companies/README.md#search) - Search companies

### [DeepResearch](docs/sdks/deepresearch/README.md)

* [start](docs/sdks/deepresearch/README.md#start) - Start deep research

### [Enrichments](docs/sdks/enrichments/README.md)

* [submit](docs/sdks/enrichments/README.md#submit) - Submit enrichment
* [get](docs/sdks/enrichments/README.md#get) - Get enrichment

### [Monitors](docs/sdks/monitors/README.md)

* [create](docs/sdks/monitors/README.md#create) - Create monitor
* [list](docs/sdks/monitors/README.md#list) - List monitors
* [update](docs/sdks/monitors/README.md#update) - Update monitor
* [delete](docs/sdks/monitors/README.md#delete) - Delete monitor
* [get](docs/sdks/monitors/README.md#get) - Get monitor
* [runNow](docs/sdks/monitors/README.md#runnow) - Run monitor now
* [listEvents](docs/sdks/monitors/README.md#listevents) - List monitor events

### [Operations](docs/sdks/operations/README.md)

* [get](docs/sdks/operations/README.md#get) - Get operation

### [People](docs/sdks/people/README.md)

* [search](docs/sdks/people/README.md#search) - Search people

### [Scrapers.Instagram](docs/sdks/instagram/README.md)

* [getProfile](docs/sdks/instagram/README.md#getprofile) - Get Instagram profile
* [listPosts](docs/sdks/instagram/README.md#listposts) - List Instagram posts
* [getPost](docs/sdks/instagram/README.md#getpost) - Get Instagram post
* [listPostComments](docs/sdks/instagram/README.md#listpostcomments) - List Instagram post comments
* [listFollowers](docs/sdks/instagram/README.md#listfollowers) - List Instagram followers
* [listFollowing](docs/sdks/instagram/README.md#listfollowing) - List Instagram following

### [Scrapers.Linkedin](docs/sdks/linkedin/README.md)

* [findCompanies](docs/sdks/linkedin/README.md#findcompanies) - Find LinkedIn companies
* [getProfile](docs/sdks/linkedin/README.md#getprofile) - Get LinkedIn profile
* [getCompany](docs/sdks/linkedin/README.md#getcompany) - Get LinkedIn company
* [listCompanyPosts](docs/sdks/linkedin/README.md#listcompanyposts) - List LinkedIn company posts
* [listProfilePosts](docs/sdks/linkedin/README.md#listprofileposts) - List LinkedIn profile posts
* [searchKeywordPosts](docs/sdks/linkedin/README.md#searchkeywordposts) - Search LinkedIn posts
* [listPostReactions](docs/sdks/linkedin/README.md#listpostreactions) - List LinkedIn post reactions
* [listPostComments](docs/sdks/linkedin/README.md#listpostcomments) - List LinkedIn post comments
* [listProfileReactions](docs/sdks/linkedin/README.md#listprofilereactions) - List LinkedIn profile reactions
* [listProfileComments](docs/sdks/linkedin/README.md#listprofilecomments) - List LinkedIn profile comments

### [Scrapers.Tiktok](docs/sdks/tiktok/README.md)

* [getProfile](docs/sdks/tiktok/README.md#getprofile) - Get TikTok profile

### [Scrapers.Web](docs/sdks/web/README.md)

* [search](docs/sdks/web/README.md#search) - Search web
* [crawl](docs/sdks/web/README.md#crawl) - Crawl website
* [scrape](docs/sdks/web/README.md#scrape) - Scrape web page

### [Search](docs/sdks/search/README.md)

* [submit](docs/sdks/search/README.md#submit) - Submit search
* [list](docs/sdks/search/README.md#list) - List searches
* [getResult](docs/sdks/search/README.md#getresult) - Get search result

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`companiesSearch`](docs/sdks/companies/README.md#search) - Search companies
- [`deepResearchStart`](docs/sdks/deepresearch/README.md#start) - Start deep research
- [`enrichmentsGet`](docs/sdks/enrichments/README.md#get) - Get enrichment
- [`enrichmentsSubmit`](docs/sdks/enrichments/README.md#submit) - Submit enrichment
- [`monitorsCreate`](docs/sdks/monitors/README.md#create) - Create monitor
- [`monitorsDelete`](docs/sdks/monitors/README.md#delete) - Delete monitor
- [`monitorsGet`](docs/sdks/monitors/README.md#get) - Get monitor
- [`monitorsList`](docs/sdks/monitors/README.md#list) - List monitors
- [`monitorsListEvents`](docs/sdks/monitors/README.md#listevents) - List monitor events
- [`monitorsRunNow`](docs/sdks/monitors/README.md#runnow) - Run monitor now
- [`monitorsUpdate`](docs/sdks/monitors/README.md#update) - Update monitor
- [`operationsGet`](docs/sdks/operations/README.md#get) - Get operation
- [`peopleSearch`](docs/sdks/people/README.md#search) - Search people
- [`scrapersInstagramGetPost`](docs/sdks/instagram/README.md#getpost) - Get Instagram post
- [`scrapersInstagramGetProfile`](docs/sdks/instagram/README.md#getprofile) - Get Instagram profile
- [`scrapersInstagramListFollowers`](docs/sdks/instagram/README.md#listfollowers) - List Instagram followers
- [`scrapersInstagramListFollowing`](docs/sdks/instagram/README.md#listfollowing) - List Instagram following
- [`scrapersInstagramListPostComments`](docs/sdks/instagram/README.md#listpostcomments) - List Instagram post comments
- [`scrapersInstagramListPosts`](docs/sdks/instagram/README.md#listposts) - List Instagram posts
- [`scrapersLinkedinFindCompanies`](docs/sdks/linkedin/README.md#findcompanies) - Find LinkedIn companies
- [`scrapersLinkedinGetCompany`](docs/sdks/linkedin/README.md#getcompany) - Get LinkedIn company
- [`scrapersLinkedinGetProfile`](docs/sdks/linkedin/README.md#getprofile) - Get LinkedIn profile
- [`scrapersLinkedinListCompanyPosts`](docs/sdks/linkedin/README.md#listcompanyposts) - List LinkedIn company posts
- [`scrapersLinkedinListPostComments`](docs/sdks/linkedin/README.md#listpostcomments) - List LinkedIn post comments
- [`scrapersLinkedinListPostReactions`](docs/sdks/linkedin/README.md#listpostreactions) - List LinkedIn post reactions
- [`scrapersLinkedinListProfileComments`](docs/sdks/linkedin/README.md#listprofilecomments) - List LinkedIn profile comments
- [`scrapersLinkedinListProfilePosts`](docs/sdks/linkedin/README.md#listprofileposts) - List LinkedIn profile posts
- [`scrapersLinkedinListProfileReactions`](docs/sdks/linkedin/README.md#listprofilereactions) - List LinkedIn profile reactions
- [`scrapersLinkedinSearchKeywordPosts`](docs/sdks/linkedin/README.md#searchkeywordposts) - Search LinkedIn posts
- [`scrapersTiktokGetProfile`](docs/sdks/tiktok/README.md#getprofile) - Get TikTok profile
- [`scrapersWebCrawl`](docs/sdks/web/README.md#crawl) - Crawl website
- [`scrapersWebScrape`](docs/sdks/web/README.md#scrape) - Scrape web page
- [`scrapersWebSearch`](docs/sdks/web/README.md#search) - Search web
- [`searchGetResult`](docs/sdks/search/README.md#getresult) - Get search result
- [`searchList`](docs/sdks/search/README.md#list) - List searches
- [`searchSubmit`](docs/sdks/search/README.md#submit) - Submit search

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.companies.search(
    {
      query: "B2B SaaS companies in Austin hiring engineers",
    },
    undefined,
    {
      retries: {
        strategy: "backoff",
        backoff: {
          initialInterval: 1,
          maxInterval: 50,
          exponent: 1.1,
          maxElapsedTime: 100,
        },
        retryConnectionErrors: false,
      },
    },
  );

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
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
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`TheHogError`](./src/models/errors/the-hog-error.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { TheHog } from "@the-hog/sdk";
import * as errors from "@the-hog/sdk/models/errors";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  try {
    const result = await theHog.companies.search({
      query: "B2B SaaS companies in Austin hiring engineers",
    });

    console.log(result);
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.TheHogError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.PublicErrorResponseDto) {
        console.log(error.data$.statusCode); // number
        console.log(error.data$.error); // string
        console.log(error.data$.message); // string
        console.log(error.data$.path); // string
        console.log(error.data$.requestId); // string
      }
    }
  }
}

run();

```

### Error Classes
**Primary errors:**
* [`TheHogError`](./src/models/errors/the-hog-error.ts): The base class for HTTP error responses.
  * [`PublicErrorResponseDto`](./src/models/errors/public-error-response-dto.ts): Generic error.

<details><summary>Less common errors (6)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/http-client-errors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/http-client-errors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/http-client-errors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/http-client-errors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/http-client-errors.ts): Unrecognised or unexpected error.


**Inherit from [`TheHogError`](./src/models/errors/the-hog-error.ts)**:
* [`ResponseValidationError`](./src/models/errors/response-validation-error.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Override Server URL Per-Client

The default server can be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  serverURL: "https://developer.thehog.ai",
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
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to:
- route requests through a proxy server using [undici](https://www.npmjs.com/package/undici)'s ProxyAgent
- use the `"beforeRequest"` hook to add a custom header and a timeout to requests
- use the `"requestError"` hook to log errors

```typescript
import { TheHog } from "@the-hog/sdk";
import { ProxyAgent } from "undici";
import { HTTPClient } from "@the-hog/sdk/lib/http";

const dispatcher = new ProxyAgent("http://proxy.example.com:8080");

const httpClient = new HTTPClient({
  // 'fetcher' takes a function that has the same signature as native 'fetch'.
  fetcher: (input, init) =>
    // 'dispatcher' is specific to undici and not part of the standard Fetch API.
    fetch(input, { ...init, dispatcher } as RequestInit),
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new TheHog({ httpClient: httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { TheHog } from "@the-hog/sdk";

const sdk = new TheHog({ debugLogger: console });
```

You can also enable a default debug logger by setting an environment variable `THE_HOG_DEBUG` to true.
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=@the-hog/sdk&utm_campaign=typescript)
