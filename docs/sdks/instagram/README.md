# Scrapers.Instagram

## Overview

### Available Operations

* [getProfile](#getprofile) - Get Instagram profile
* [listPosts](#listposts) - List Instagram posts
* [getPost](#getpost) - Get Instagram post
* [listPostComments](#listpostcomments) - List Instagram post comments
* [listFollowers](#listfollowers) - List Instagram followers
* [listFollowing](#listfollowing) - List Instagram following

## getProfile

Fetch public profile details for an Instagram username.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getInstagramProfile" method="post" path="/api/v1/platform/scrapers/instagram/profile" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.scrapers.instagram.getProfile({
    username: "instagram",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { scrapersInstagramGetProfile } from "@the-hog/sdk/funcs/scrapers-instagram-get-profile.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await scrapersInstagramGetProfile(theHog, {
    username: "instagram",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("scrapersInstagramGetProfile failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PlatformInstagramUsernameDto](../../models/platform-instagram-username-dto.md)                                                                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetInstagramProfileResponseBody](../../models/operations/get-instagram-profile-response-body.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500, 502                      | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## listPosts

Fetch recent posts for an Instagram username.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listInstagramPosts" method="post" path="/api/v1/platform/scrapers/instagram/posts" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.scrapers.instagram.listPosts({
    username: "instagram",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { scrapersInstagramListPosts } from "@the-hog/sdk/funcs/scrapers-instagram-list-posts.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await scrapersInstagramListPosts(theHog, {
    username: "instagram",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("scrapersInstagramListPosts failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PlatformInstagramUsernameDto](../../models/platform-instagram-username-dto.md)                                                                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListInstagramPostsResponseBody](../../models/operations/list-instagram-posts-response-body.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500, 502                      | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## getPost

Fetch details for an Instagram post or reel URL.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getInstagramPost" method="post" path="/api/v1/platform/scrapers/instagram/post-details" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.scrapers.instagram.getPost({
    postUrl: "https://www.instagram.com/p/ABC123/",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { scrapersInstagramGetPost } from "@the-hog/sdk/funcs/scrapers-instagram-get-post.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await scrapersInstagramGetPost(theHog, {
    postUrl: "https://www.instagram.com/p/ABC123/",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("scrapersInstagramGetPost failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PlatformInstagramPostDetailsDto](../../models/platform-instagram-post-details-dto.md)                                                                                  | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetInstagramPostResponseBody](../../models/operations/get-instagram-post-response-body.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500, 502                      | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## listPostComments

Fetch comments for an Instagram post or reel URL.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listInstagramPostComments" method="post" path="/api/v1/platform/scrapers/instagram/post-comments" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.scrapers.instagram.listPostComments({
    postUrl: "https://www.instagram.com/p/ABC123/",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { scrapersInstagramListPostComments } from "@the-hog/sdk/funcs/scrapers-instagram-list-post-comments.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await scrapersInstagramListPostComments(theHog, {
    postUrl: "https://www.instagram.com/p/ABC123/",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("scrapersInstagramListPostComments failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PlatformInstagramPostCommentsDto](../../models/platform-instagram-post-comments-dto.md)                                                                                | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListInstagramPostCommentsResponseBody](../../models/operations/list-instagram-post-comments-response-body.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500, 502                      | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## listFollowers

Fetch followers for an Instagram username.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listInstagramFollowers" method="post" path="/api/v1/platform/scrapers/instagram/followers" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.scrapers.instagram.listFollowers({
    username: "instagram",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { scrapersInstagramListFollowers } from "@the-hog/sdk/funcs/scrapers-instagram-list-followers.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await scrapersInstagramListFollowers(theHog, {
    username: "instagram",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("scrapersInstagramListFollowers failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PlatformInstagramFollowersDto](../../models/platform-instagram-followers-dto.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListInstagramFollowersResponseBody](../../models/operations/list-instagram-followers-response-body.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500, 502                      | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |

## listFollowing

Fetch accounts followed by an Instagram username.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listInstagramFollowing" method="post" path="/api/v1/platform/scrapers/instagram/following" -->
```typescript
import { TheHog } from "@the-hog/sdk";

const theHog = new TheHog({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const result = await theHog.scrapers.instagram.listFollowing({
    username: "instagram",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { TheHogCore } from "@the-hog/sdk/core.js";
import { scrapersInstagramListFollowing } from "@the-hog/sdk/funcs/scrapers-instagram-list-following.js";

// Use `TheHogCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const theHog = new TheHogCore({
  security: {
    accessKey: process.env["THE_HOG_ACCESS_KEY"] ?? "",
    secretKey: process.env["THE_HOG_SECRET_KEY"] ?? "",
  },
});

async function run() {
  const res = await scrapersInstagramListFollowing(theHog, {
    username: "instagram",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("scrapersInstagramListFollowing failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PlatformInstagramFollowingDto](../../models/platform-instagram-following-dto.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListInstagramFollowingResponseBody](../../models/operations/list-instagram-following-response-body.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.PublicErrorResponseDto | 400, 401, 402                 | application/json              |
| errors.PublicErrorResponseDto | 500, 502                      | application/json              |
| errors.TheHogDefaultError     | 4XX, 5XX                      | \*/\*                         |